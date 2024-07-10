export const Moves: {[k: string]: ModdedMoveData} = {
	ragingbull: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Tauros-Paldea-Combat':
				move.type = 'Fighting';
				break;
			case 'Tauros-Paldea-Blaze':
			case 'Golisoros-Paldea-Blaze':
				move.type = 'Fire';
				break;
			case 'Tauros-Paldea-Aqua':
				move.type = 'Water';
				break;
			}
		},
	},
	dive: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			if (attacker.hasAbility('prehistorichunter') && attacker.species.name === 'Scream Cormorant' && !attacker.transformed) {
				const forme = attacker.hp <= attacker.maxhp / 2 ? 'screamcormorantgorging' : 'screamcormorantgulping';
				attacker.formeChange(forme, move);
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	darkvoid: {
		inherit: true,
		onTry(source, target, move) {
			if (source.species.name === 'Icekrai' || move.hasBounced) {
				return;
			}
			this.add('-fail', source, 'move: Dark Void');
			this.hint("Only a Pokemon whose form is Darkrai or a fusion thereof can use this move.");
			return null;
		},
	},
	
	aromatherapy: {
		inherit: true,
		onHit(target, source, move) {
			this.add('-activate', source, 'move: Aromatherapy');
			let success = false;
			const allies = [...target.side.pokemon, ...target.side.allySide?.pokemon || []];
			for (const ally of allies) {
				if ((ally === source || !(ally.hasAbility(['sapsipper','pondweed','lawnmowerofruin','firedrinker']) ||
						(ally.volatiles['substitute'] && !move.infiltrates))) && ally.cureStatus() ) {
					success = true;
				}
			}
			return !!success;
		},
	},
	autotomize: {
		inherit: true,
		onTryHit(pokemon) {
			if (pokemon.boosts.spe === (pokemon.hasAbility(['contrary','unfiltered']) ? -6 : 6)) {
				return false;
			}
		},
	},
	partingshot: {
		inherit: true,
		onHit(target, source, move) {
			const success = this.boost({atk: -1, spa: -1}, target, source);
			if (!success && !target.hasAbility(['mirrorarmor','hourglass'])) {
				delete move.selfSwitch;
			}
		},
	},
	smackdown: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = !(!(pokemon.hasType('Flying') || pokemon.hasAbility(['levitate','airbornearmor','aircontrol','holygrail','risingtension','freeflight','hellkite','honeymoon','aircontrol','magnetize','unidentifiedflyingobject']))
										|| pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] || this.field.getPseudoWeather('gravity'));
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				if (pokemon.volatiles['telekinesis']) {
					applies = true;
					delete pokemon.volatiles['telekinesis'];
				}
				else if (!applies) return false;
				this.add('-start', pokemon, 'Smack Down');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
					this.add('-start', pokemon, 'Smack Down');
				}
			},
		},
	},
	switcheroo: {
		inherit: true,
		onTryImmunity(target) {
			return !target.hasAbility(['stickyhold','armourlock']);
		},
	},
	trick: {
		inherit: true,
		onTryImmunity(target) {
			return !target.hasAbility(['stickyhold','armourlock']);
		},
	},
	disable: {
		inherit: true,
		condition: {
			duration: 5,
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				// The target hasn't taken its turn, or Cursed Body activated and the move was not used through Dancer or Instruct
				if (
					this.queue.willMove(pokemon) ||
					(pokemon === this.activePokemon && this.activeMove && !this.activeMove.isExternal)
				) {
					this.effectState.duration--;
				}
				if (!pokemon.lastMove) {
					this.debug(`Pokemon hasn't moved yet`);
					return false;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === pokemon.lastMove.id && !moveSlot.pp) {
						this.debug('Move out of PP');
						return false;
					}
				}
				if (effect.effectType === 'Ability') {
					this.add('-start', pokemon, 'Disable', pokemon.lastMove.name, '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Disable', pokemon.lastMove.name);
				}
				this.effectState.move = pokemon.lastMove.id;
			},
			onResidualOrder: 17,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Disable');
			},
			onBeforeMovePriority: 7,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && move.id === this.effectState.move) {
					this.add('cant', attacker, 'Disable', move);
					return false;
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	rest: {
		inherit: true,
		onTry(source) {
			if (source.status === 'slp' || source.hasAbility('comatose')) return false;

			if (source.hp === source.maxhp) {
				this.add('-fail', source, 'heal');
				return null;
			}
			if (source.hasAbility(['insomnia', 'vitalspirit', 'unvital', 'vitalmetalbody'])) {
				this.add('-fail', source, '[from] ability: ' + source.getAbility().name, '[of] ' + source);
				return null;
			}
		},
	},
	boltbeak: {
		inherit: true,
		isNonstandard: null,
	},
	oblivionwing: {
		inherit: true,
		isNonstandard: null,
	},
	headcharge: {
		inherit: true,
		isNonstandard: null,
	},
	trickortreat: {
		inherit: true,
		isNonstandard: null,
	},
	plasmafists: {
		inherit: true,
		isNonstandard: null,
	},
	anchorshot: {
		inherit: true,
		isNonstandard: null,
	},
	purify: {
		inherit: true,
		isNonstandard: null,
	},
	spectralthief: {
		inherit: true,
		isNonstandard: null,
	},
	naturesmadness: {
		inherit: true,
		isNonstandard: null,
	},
	fishiousrend: {
		inherit: true,
		isNonstandard: null,
	},
	kingsshield: {
		inherit: true,
		isNonstandard: null,
	},
	ivycudgel: {
		num: 904,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Ivy Cudgel",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		critRatio: 2,
		onPrepareHit(target, source, move) {
			if (move.type !== "Grass") {
				this.attrLastMove('[anim] Ivy Cudgel ' + move.type);
			}
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Ogerpon-Wellspring': case 'Ogerpon-Wellspring-Tera': case 'Hattepon-Wellspring': case 'Hattepon-Wellspring-Tera':
				move.type = 'Water';
				break;
			case 'Ogerpon-Hearthflame': case 'Ogerpon-Hearthflame-Tera': case 'Hattepon-Hearthflame': case 'Hattepon-Hearthflame-Tera':
				move.type = 'Fire';
				break;
			case 'Ogerpon-Cornerstone': case 'Ogerpon-Cornerstone-Tera': case 'Hattepon-Cornerstone': case 'Hattepon-Cornerstone-Tera':
				move.type = 'Rock';
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
};
