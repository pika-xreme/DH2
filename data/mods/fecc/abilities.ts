import {Pokemon} from '../../../sim/pokemon';
import {FS} from '../../../lib';
import {toID} from '../../../sim/dex-data';
const usergroups: {[userid: string]: string} = {};
const usergroupData = FS('config/usergroups.csv').readIfExistsSync().split('\n');
for (const row of usergroupData) {
	if (!toID(row)) continue;

	const cells = row.split(',');
	if (cells.length > 3) throw new Error(`Invalid entry when parsing usergroups.csv`);
	usergroups[toID(cells[0])] = cells[1].trim() || ' ';
}

export function getName(name: string): string {
	const userid = toID(name);
	if (!userid) throw new Error('No/Invalid name passed to getSymbol');

	const group = usergroups[userid] || ' ';
	return group + name;
}

export const Abilities: {[k: string]: ModdedAbilityData} = {
	aimforthehorn: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Aim For The Horn');
		},
		onTryMove(attacker, defender, move) {
			if(move.id !== 'struggle') return null;
		},
		flags: {},
		name: "Aim For The Horn",
		//shortDesc: "This Pokemon's moves and their effects have no effect.",
	},
	bongcloud: {
		onStart(pokemon) {
			if (pokemon.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Bongcloud');
				const fallen = Math.min(pokemon.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
				if(pokemon.leveled) return;
				pokemon.level += 20 * fallen;
				pokemon.set.level += 20 * fallen;
				pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
				const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details, '[silent]');
				this.add('-message', `${pokemon.name} gained EXP from the fallen and is now at level ${pokemon.level}!`);
				pokemon.leveled = true;
			}
		},
		onModifyAtk(atk, pokemon) {
			return Math.trunc(Math.trunc(2 * pokemon.baseSpecies.baseStats['atk'] + pokemon.set.ivs['atk'] + Math.trunc(pokemon.set.evs['atk'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onModifyDef(def, pokemon) {
			return Math.trunc(Math.trunc(2 * pokemon.baseSpecies.baseStats['def'] + pokemon.set.ivs['def'] + Math.trunc(pokemon.set.evs['def'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onModifySpA(spa, pokemon) {
			return Math.trunc(Math.trunc(2 * pokemon.baseSpecies.baseStats['spa'] + pokemon.set.ivs['spa'] + Math.trunc(pokemon.set.evs['spa'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onModifySpD(spd, pokemon) {
			return Math.trunc(Math.trunc(2 * pokemon.baseSpecies.baseStats['spd'] + pokemon.set.ivs['spd'] + Math.trunc(pokemon.set.evs['spd'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onModifySpe(spe, pokemon) {
			return Math.trunc(Math.trunc(2 * pokemon.baseSpecies.baseStats['spe'] + pokemon.set.ivs['spe'] + Math.trunc(pokemon.set.evs['spe'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		flags: {},
		name: "Bongcloud",
		//shortDesc: "This Pokemon gains 20 levels for each fainted ally, up to 5.",
	},
	jankster: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Jankster', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					target.addVolatile("jankster");
					this.add('-message', `${target.name} was slowed down!`);
				}
			}
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Jankster', '[silent]');
			},
			onModifyPriority(priority, pokemon, target, move) {
				return priority - 1;
			},
		},
		flags: {},
		name: "Jankster",
		//shortDesc: "On switch-in, this Pokemon lowers opposing Pokemon's priority by 1.",
	},
	baseballed: {
		onTryHit(target, source, move) {
			if (source.hasType(move.type) && target !== source) {
				this.add(`raw|<img src="https://i.imgur.com/7KKaKgO.png" height="400" width="400">`);
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Baseballed!",
		//shortDesc: "This Pokemon is non-grounded, and is immune to its own and the opponent's STABs.",
	},
	goondrive: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status && !pokemon.volatiles['goondrive']) {
				this.add('-activate', pokemon, 'ability: Goon Drive');
				this.add('-message', `${pokemon.name} is gooning!`);
				pokemon.addVolatile('goondrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['goondrive'];
			this.add('-end', pokemon, 'Goon Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.add('-activate', pokemon, 'ability: Goon Drive');
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'goondrive' + this.effectState.bestStat, '[silent]');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Goon Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Goon Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Goon Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Goon Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('seriousshowdown')) {
						this.debug('Serious Showdown negating spe boost');
						return;
					}
				}
				this.debug('Goon Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Goon Drive",
		//shortDesc: "If this Pokemon is statused, its Attack is 1.5x and highest stat is 1.3x, or 1.5x if Speed; ignores burn halving physical damage.",
	},
	perfectfreeze: {
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance) move.self.chance *= 2;
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather(['hail', 'snow'])) {
				this.debug('Perfect Freeze - decreasing accuracy');
				return this.chainModify([2731, 4096]);
			}
		},
		flags: {breakable: 1},
		name: "Perfect Freeze",
		//shortDesc: "This Pokemon's moves have their secondary effect chance doubled.  If Snow is active, this Pokemon's evasiveness is 1.5x.",
	},
	imtosper: {
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			// Imposter does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			if (!this.effectState.switchingIn) return;
			// copies across in doubles/triples
			// (also copies across in multibattle and diagonally in free-for-all,
			// but side.foe already takes care of those)
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				target.transformInto(pokemon, this.dex.abilities.get('imtosper'));
			}
			this.effectState.switchingIn = false;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
		name: "Imtosper",
		//shortDesc: "On switchin, the opponent transforms into this Pokemon.",
	},
	trepidsword: {
		onStart(pokemon) {
			if (!this.canSwitch(pokemon.side) || pokemon.forceSwitchFlag || pokemon.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			pokemon.switchFlag = true;
			this.add('-activate', pokemon, 'ability: Trepid Sword');
			this.add('-message', "Oak's words echoed... There's a time and place for everything, but not now.");
		},
		flags: {},
		name: "Trepid Sword",
		//shortDesc: "On switchin, this Pokemon switches out.",
	},
	magicmissile: {
		/*
		Need to test:
		- any Berry
		- Toxic Orb, Flame Orb or Light Ball (just one they're the same code)
		- White Herb
		- Mental Herb
		- um, I guess making sure Razor Claw or Razor Fang (just one they're the same code) doesn't immediately crash,
		but it would be basically impossible for them to cause a flinch in a singles context
		(how does this behave with Instruct? maybe you could test with that if you're doing the doubles format Aquatic mentioned)
		*/
		name: "Magic Missile",
		//shortDesc: "If hit by a contact move while holding an item: lose item, apply item Fling effects, attacker loses 1/4 max HP. If hitting a foe with a contact move while not holding an item: steals the foe's item.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Magic Missile', '[of] ' + target);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.isSemiInvulnerable()) return;
			if (target.ignoringItem()) return false;
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return false;
			if (item.id && !item.megaStone) {
				this.damage(source.baseMaxhp / 4, source, target);
				target.addVolatile('fling');
				if (item.is
				) {
					if (this.singleEvent('Eat', item, null, source, null, null)) {
						this.runEvent('EatItem', source, null, null, item);
						if (item.id === 'leppaberry') source.staleness = 'external';
					}
					if (item.onEat) source.ateBerry = true;
				} else if (item.id === 'mentalherb') {
					const conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock'];
					for (const firstCondition of conditions) {
						if (source.volatiles[firstCondition]) {
							for (const secondCondition of conditions) {
								source.removeVolatile(secondCondition);
								if (firstCondition === 'attract' && secondCondition === 'attract') {
									this.add('-end', source, 'move: Attract', '[from] item: Mental Herb');
								}
							}
							return;
						}
					}
				} else if (item.id === 'whiteherb') {
					let activate = false;
					const boosts: SparseBoostsTable = {};
					let i: BoostName;
					for (i in source.boosts) {
						if (source.boosts[i] < 0) {
							activate = true;
							boosts[i] = 0;
						}
					}
					if (activate) {
						source.setBoost(boosts);
						this.add('-clearnegativeboost', source, '[silent]');
					}
				} else {
					if (item.fling && item.fling.status) {
						source.trySetStatus(item.fling.status, target);
					} else if (item.fling && item.fling.volatileStatus) {
						source.addVolatile(item.fling.volatileStatus, target);
					}
				}
			}
		},
	},
	stinkyveil: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Toxic Chain's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;

			if (this.randomChance(3, 10)) {
				target.trySetStatus('tox', source);
			}
			if (this.randomChance(3, 10)) {
				target.addVolatile('attract', this.effectState.target);
			}
			if (this.randomChance(3, 10)) {
				target.addVolatile('disable', this.effectState.target);
			}
			if (this.randomChance(3, 10)) {
				target.addVolatile('encore', this.effectState.target);
			}
			if (this.randomChance(3, 10)) {
				target.addVolatile('healblock', this.effectState.target);
			}
			if (this.randomChance(3, 10)) {
				target.addVolatile('taunt', this.effectState.target);
			}
			if (this.randomChance(3, 10)) {
				target.addVolatile('torment', this.effectState.target);
			}
		},
		flags: {},
		name: "Stinky Veil",
		//shortDesc: "This Pokemon's moves have a 30% chance of causing Toxic, Attract, Disable, Encore, Heal Block, Taunt, and Torment.",
	},
	secondphase: {
		onDamagePriority: -40,
		onDamage(damage, target, source, effect) {
			if (damage >= target.hp && target.species.id == 'zygarb') {
				this.add('-activate', target, 'ability: Second Phase');
				this.add('-message', `But ${target.name} refused.`);
				this.effectState.secondPhase = true;
				return 0;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.species.id == 'zygarb' && this.effectState.secondPhase) {
				this.add('-message', `${pokemon.name} recycled itself to save the environment!`);
				pokemon.formeChange('Zygarb-Recycled', this.effect, true);
				pokemon.addVolatile('fakedynamax');
				this.heal(pokemon.baseMaxhp, pokemon);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, notransform: 1},
		name: "Second Phase",
		//shortDesc: "Changes to Zygarb-Reclyced at 0 or less HP and fully heals user.",
	},
	asonesex: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One (Sex)');
			this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName('anaconja')}|What the hell? Parasex?`);
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.add(`raw|<img src="https://i.imgur.com/3QF9UUi.jpeg" height="538" width="720">`);
				this.boost({atk: length}, source);
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (!source.status && source.runStatusImmunity('powder')) {
				const r = this.random(100);
				if (r < 11) {
					source.setStatus('slp', target);
				} else if (r < 21) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('psn', target);
				}
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp && !source.status && source.runStatusImmunity('powder')) {
				this.add(`raw|<img src="https://i.imgur.com/COMfOZm.jpeg" height="538" width="720">`);
				const r = this.random(30);
				if (r < 11) {
					source.setStatus('slp', target);
				} else if (r < 21) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('psn', target);
				}
			} else if (!target.status && target.runStatusImmunity('powder')){
				const r = this.random(100);
				if (r < 11) {
					source.setStatus('slp', target);
				} else if (r < 21) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('psn', target);
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "As One (Sex)",
		//shortDesc: "Chilling Neigh effects. This Pokemon's and the opponent's attacks have a 30% chance to Poison/Paralyze/Sleep the target(s). When the user is killed by an attack, the attacker is inflicted with Poison/Paralysis/Sleep.",
	},
	corruptcouncil: {
		onStart(pokemon) {
			const dark = Math.min(pokemon.side.pokemon.filter(x => x.types.includes('Dark')).length, 5);
			if (dark > 0) {
				this.add('-activate', pokemon, 'ability: Corrupt Council');
				this.add('-message', `${pokemon.name} gained votes from the council!`);
				this.add('-start', pokemon, `council: ${dark}`, '[silent]');
				this.effectState.dark = dark;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `dark${this.effectState.dark}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.dark) {
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Supreme Overlord boost: ${powMod[this.effectState.dark]}/4096`);
				return this.chainModify([powMod[this.effectState.dark], 4096]);
			}
		},
		flags: {},
		name: "Corrupt Council",
		//shortDesc: "This Pokemon's moves have 10% more power for each Dark-type ally, up to 5 allies.",
	},
	platedarmor: {
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') {
					this.heal(target.baseMaxhp / 16);
					return null;
				}
			}
		},
		flags: {},
		name: "Plated Armor",
		//shortDesc: "This Pokemon heals 1/16 max HP instead of taking recoil damage besides Struggle/Life Orb/crash damage.",
	},
	vaporgrowth: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				if (attacker.hp <= attacker.maxhp / 3) {
					this.debug('Vapor Growth boost');
					return this.chainModify(1.5);
				} else return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				if (attacker.hp <= attacker.maxhp / 3) {
					this.debug('Vapor Growth boost');
					return this.chainModify(1.5);
				} else return this.chainModify(1.3);
			}
		},
		flags: {},
		name: "Vapor Growth",
		//shortDesc: "This Pokemon's Grass-type moves have x1.3 power and x1.5 power below 1/3 max HP.",
	},
	airheaded: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Airheaded');
		},
		onAnyModifyBoost(boosts, pokemon) {
			boosts['atk'] = 0;
			boosts['def'] = 0;
			boosts['spa'] = 0;
			boosts['spd'] = 0;
			boosts['spe'] = 0;
			boosts['accuracy'] = 0;
			boosts['evasion'] = 0;
		},
		flags: {},
		name: "Airheaded",
		//shortDesc: "While this Pokemon is active, the effects of all stat changes are ignored.",
	},
	bigassmagnets: {
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.isAdjacent(this.effectState.target)) return;
			if (!pokemon.types.includes("Electric")) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.types.includes("Electric")) {
				pokemon.maybeTrapped = true;
			}
		},
		onStart(source) {
			this.field.setTerrain('bigassmagnetterrain');
		},
		flags: {},
		name: "Big Ass Magnets",
		//shortDesc: "Traps opposing Pokemon that aren't Electric-type. On switchin, summons Big Ass Magnet Terrain for 5 turns, which prevent non-Electric Pokemon on the field from switching out.",
	},
	loosefuse: {
		onSourceDamagingHit(damage, target, source, move) {
			if (move.id == 'explosion') return;
			if (this.randomChance(1, 10)) {
				this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(source.name)}|Muck this world.`);
				this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(source.name)}|That is my final message`);
				this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(source.name)}|Good bye.`);
				const explosion = this.dex.getActiveMove('explosion');
				this.actions.useMove(explosion, source, target);
			}
		},
		flags: {},
		name: "Loose Fuse",
		//shortDesc: "This Pokemon's attacks without a chance to make the user explode gain a 10% chance to make the user explode.",
	},
	swaloseedlol: {
		onTakeItem(item, pokemon, source) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Swaloseed-Lol');
				return false;
			}
		},
		onEatItem(item, pokemon) {
			if(pokemon.ate) return;
			if (item.isBerry) {
				if (this.singleEvent('Eat', item, null, pokemon, null, null)) {
					pokemon.ate = true;
					this.add('-message', `${pokemon.name} swallowed!`);
					this.runEvent('EatItem', pokemon, null, null, item);
					console.log(pokemon.item);
					pokemon.setItem(pokemon.item);
					this.add('-item', pokemon, pokemon.item);
					pokemon.lastItem = '';
				}
			}
		},
		onResidual(pokemon) {
			pokemon.ate = false;
		},
		flags: {},
		name: "Swaloseed-Lol",
		//shortDesc: "Sticky Hold effects. When the user eats a Berry, it is used twice and not consumed.",
	},
	randomdanceparty: {
		onResidual(pokemon) {
			const dances = ["aquastep", "clangoroussoul", "dragondance", "featherdance", "fierydance", "lunardance", "petaldance", "quiverdance", "revelationdance", "swordsdance", "teeterdance", "victorydance"];
			let target = pokemon;
			const dance = this.dex.getActiveMove(this.sample(dances));
			if (dance.target != "self") {
				if(pokemon.adjacentFoes().length == 0) return;
				target = this.sample(pokemon.adjacentFoes());
			}
			this.add('-message', "!!!RANDOM DANCE PARTY!!!");
			this.actions.useMove(dance, pokemon, target);
		},
		flags: {},
		name: "RANDOM DANCE PARTY!",
		//shortDesc: "This Pokemon uses a random dance move at the end of each turn.",
	},
	larping: {
		onStart(pokemon) {
			const abilities = this.dex.abilities.all();
			const newAbility = this.sample(abilities);
			if (pokemon.setAbility(newAbility.id)) {
				this.add('-message', `${pokemon.name} is getting into character!`);
				this.add('-activate', pokemon, `ability: ${newAbility.name}`, '[of] ' + pokemon);
				this.add('-message', `${pokemon.name}'s ability is now ${newAbility.name}!`);
			}
		},
		flags: {},
		name: "LARPing",
		//shortDesc: "On switch-in, this Pokemon gains a random ability.",
	},
	dotheroar: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (!activated) this.add('-ability', pokemon, 'Do The Roar');
				activated = true;
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in target.storedStats) {
					if (target.storedStats[s] > bestStat) {
						statName = s;
						bestStat = target.storedStats[s];
					}
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.add('-message', `${pokemon.name} roared!`);
					switch(statName) {
						case 'atk':
							this.boost({atk: -1}, target, pokemon, null, true);
							break;
						case 'def':
							this.boost({def: -1}, target, pokemon, null, true);
							break;
						case 'spa':
							this.boost({spa: -1}, target, pokemon, null, true);
							break;
						case 'spd':
							this.boost({spd: -1}, target, pokemon, null, true);
							break;
						case 'spe':
							this.boost({spe: -1}, target, pokemon, null, true);
							break;
					}
				}
			}
		},
		flags: {},
		name: "Do The Roar",
		//shortDesc: "On switchin, this Pokemon lowers the highest stat of adjacent opponents by 1.",
	},
	coldsleep: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp') {
					this.add('-activate', pokemon, 'ability: Coldsleep');
					this.add('-message', `${target.name} is frozen in fear!`);
					target.setStatus('frz');
				}
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Coldsleep');
				pokemon.cureStatus();
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'frz') return false;
		},
		flags: {},
		name: "Coldsleep",
		//shortDesc: "Causes sleeping foes to be frozen at the end of each turn. The user cannot be frozen or put to sleep.",
	},
	toxicspores: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const toxicSpores = side.sideConditions['toxicspores'];
			if (move.category === 'Physical' && !toxicSpores) {
				this.add('-activate', target, 'ability: Toxic Spores');
				side.addSideCondition('toxicspores', target);
			}
		},
		flags: {},
		name: "Toxic Spores",
		//shortDesc: "If this Pokemon is hit by a physical attack, Dire Spores are set on the opposing side.",
	},
	giantenemyspider: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Giant Enemy Spider');
			this.add('-message', `Run.`);
			pokemon.addVolatile('fakedynamax');
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender) {
			if (!defender.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender) {
			if (!defender.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Giant Enemy Spider",
		//shortDesc: "Pressure + Stakeout",
	},
	goodvibes: {
		onStart(pokemon) {
			pokemon.side.addSideCondition('goodvibe');
		},
		onModifyAtkPriority: 6,
		onModifyAtk(atk, pokemon) {
			if (pokemon.side.getSideCondition('badvibe')) return this.chainModify(1.5);
		},
		flags: {},
		name: "Good Vibes",
		//shortDesc: "On switch-in, sets Good Vibes for 5 turns. This Pokemon has 1.5x Atk in Bad Vibes.",
	},
	badvibes: {
		onStart(pokemon) {
			pokemon.side.addSideCondition('badvibe');
		},
		onModifySpAPriority: 6,
		onModifySpA(spa, pokemon) {
			if (pokemon.side.getSideCondition('goodvibe')) return this.chainModify(1.5);
		},
		flags: {},
		name: "Bad Vibes",
		//shortDesc: "On switch-in, sets Bad Vibes for 5 turns. This Pokemon has 1.5x SpA in Good Vibes.",
	},
	riptides: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Zyggizaggi' || pokemon.level < 20 || pokemon.transformed || !pokemon.hp) return;
			this.add('-message', "Math is my middle name(it isn't really)");
			this.add(`raw|<img src="https://i.imgur.com/kKT2wU0.png" height="1332" width="859">`);
			
			let changeHP = false;
			let previousFormeHP = pokemon.species.baseStats.hp;
			
			switch(pokemon.species.forme) {
				case "Solo-10%":
					if(pokemon.hp > pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-School-10%', this.effect, true);
					}
					break;
				case "Solo-50%":
					if(pokemon.hp > pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-School-50%', this.effect, true);
					}
					break;
				case "School-10%":
					if(pokemon.hp < pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Solo-10%', this.effect, true);
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Solo-Complete', this.effect, true);
					}
					else if(pokemon.hp < pokemon.maxhp / 2) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-School-Complete', this.effect, true);
					}
					break;
				case "School-50%":
					if(pokemon.hp < pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Solo-50%', this.effect, true);
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Solo-Complete', this.effect, true);
					}
					else if(pokemon.hp < pokemon.maxhp / 2) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-School-Complete', this.effect, true);
					}
					break;
				case "School-Complete":
					if(pokemon.hp < pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Solo-Complete', this.effect, true);
					}
					break;
				case "Solo-Complete":
					if(pokemon.hp > pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-School-Complete', this.effect, true);
					}
					break;
				case "Complete-School":
					if(pokemon.hp < pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Complete-Solo', this.effect, true);
					}
					break;
				case "Complete-Solo":
					if(pokemon.hp > pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Complete-School', this.effect, true);
					}
					break;
			}

			if(pokemon.species.baseStats.hp > previousFormeHP) changeHP = true;
			
			if (changeHP) {
				pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Zyggizaggi' || pokemon.level < 20 || pokemon.transformed || !pokemon.hp) return;
			
			let changeHP = false;
			let previousFormeHP = pokemon.species.baseStats.hp;
			
			switch(pokemon.species.forme) {
				case "Solo-10%":
					if(pokemon.hp > pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-School-10%', this.effect, true);
					}
					break;
				case "Solo-50%":
					if(pokemon.hp > pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-School-50%', this.effect, true);
					}
					break;
				case "School-10%":
					if(pokemon.hp < pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Solo-10%', this.effect, true);
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Solo-Complete', this.effect, true);
					}
					else if(pokemon.hp < pokemon.maxhp / 2) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-School-Complete', this.effect, true);
					}
					break;
				case "School-50%":
					if(pokemon.hp < pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Solo-50%', this.effect, true);
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Solo-Complete', this.effect, true);
					}
					else if(pokemon.hp < pokemon.maxhp / 2) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-School-Complete', this.effect, true);
					}
					break;
				case "School-Complete":
					if(pokemon.hp < pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Solo-Complete', this.effect, true);
					}
					break;
				case "Solo-Complete":
					if(pokemon.hp > pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-School-Complete', this.effect, true);
					}
					break;
				case "Complete-School":
					if(pokemon.hp < pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Complete-Solo', this.effect, true);
					}
					break;
				case "Complete-Solo":
					if(pokemon.hp > pokemon.maxhp / 4) {
						this.add('-activate', pokemon, 'ability: Riptides');
						pokemon.formeChange('Zyggizaggi-Complete-School', this.effect, true);
					}
					break;
			}

			if(pokemon.species.baseStats.hp > previousFormeHP) changeHP = true;
			
			if (changeHP) {
				pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Riptides",
		//shortDesc: "If 50% or 10%: At full HP, its form is School-50% or School-10%. If its HP falls below 1/2 but above 1/4, becomes School-Complete. If HP falls below 1/4, becomes Solo-Complete. If the form is School-Complete, turns into Complete-Solo at below 1/4 max HP. If the form is Solo-Complete, turns into Complete-School at above 1/4 max HP",
	},
	pillage: {
		name: "Pillage",
		//shortDesc: "On switch-in, swaps ability with the opponent.",
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			if (pokemon.foes().some(
				foeActive => foeActive && foeActive.isAdjacent(pokemon) && foeActive.ability === 'noability'
			) || pokemon.species.id !== 'hatterune') {
				this.effectState.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp || !this.effectState.switchingIn) return;
			const possibleTargets = pokemon.foes().filter(foeActive => foeActive && !foeActive.getAbility().flags['notrace']
				&& !foeActive.getAbility().flags['failskillswap'] && foeActive.isAdjacent(pokemon));
			if (!possibleTargets.length) return;
			const rand = (possibleTargets.length > 1) ? this.random(possibleTargets.length) : 0;
			const target = possibleTargets[rand];
			const pillageAbil = pokemon.getAbility();
			const ability = target.getAbility();
			if (!this.runEvent('SetAbility', target, pokemon, this.effect, pillageAbil)
			   || !this.runEvent('SetAbility', pokemon, pokemon, this.effect, ability)) return;
			this.add('-ability', pokemon, 'Pillage');
			this.add('-activate', pokemon, 'move: Skill Swap', ability, pillageAbil, '[of] ' + target);
			this.singleEvent('End', pillageAbil, pillageAbil.abilityState, pokemon);
			this.singleEvent('End', ability, ability.abilityState, target);
			pokemon.ability = ability.id
			pokemon.abilityState = {id: this.toID(pokemon.ability), target: pokemon};
			target.ability = pillageAbil.id;
			target.abilityState = {id: this.toID(pillageAbil.id), target: target};
			this.singleEvent('Start', ability, pokemon.abilityState, pokemon);
			this.singleEvent('Start', pillageAbil, target.abilityState, target);
			
		},
		flags: {failroleplay: 1, noentrain: 1, notrace: 1},
		rating: 5,
	},
	gorillomorphosis: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			target.addVolatile('gorilla');
		},
		flags: {},
		name: "Gorillomorphosis",
		//shortDesc: "When this Pokemon is damaged by an attack, its next physical move has 1.5x power.",
	},
	eatpaint: {
		onAfterMoveSecondary(target, source, move) {
			if (target && source !== target) {
				if (target.addVolatile('eatpaint')) {
					target.volatiles['eatpaint'].move = this.dex.getActiveMove(move.id);
				}
			}
		},
		condition: {
			noCopy: true,
			duration: 2,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onEnd(pokemon) {
				if (pokemon.hp) {
					const newMove = this.effectState.move;
					if(pokemon.adjacentFoes().length == 0) return;
					const target = this.sample(pokemon.adjacentFoes());
					this.add('-activate', pokemon, 'ability: Eat Paint');
					this.actions.useMove(newMove, pokemon, target);
				}
			},
		},
		flags: {breakable: 1},
		name: "Eat Paint",
		//shortDesc: "When this Pokemon is hit by a move, it uses that move at the end of the next turn.",
	},
	muckedup: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.add('-message', `${target.name} is mucked up!`);
				this.boost({spe: 1});
			}
		},
		flags: {},
		name: "Mucked Up",
		//shortDesc: "When this Pokemon is hit with a contact move, its Speed is raised by 1.",
	},
	weatherwar: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			const formes = ["Morform", "Morform-Rainy", "Morform-Sunny", "Morform-Snowy"];
			if (pokemon.species.baseSpecies !== 'Morform' || pokemon.terastallized) return;
			const targetForme = formes[(formes.indexOf(pokemon.species.name) + 1) % 4];
			this.add('-message', `${pokemon.name} has more formes!`);
			pokemon.formeChange(targetForme);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Weather War",
		//shortDesc: "Changes form and the type of Aura Wheel at the end of every turn.",
	},
	asoneou: {
		onStart(pokemon) {
			//proto
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
			
			//intim
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'As One (OU)', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('asoneou');
			} else if (!pokemon.volatiles['asoneou']?.fromBooster && this.field.weather !== 'sunnyday') {
				// Protosynthesis will not deactivite if Sun is suppressed, hence the direct ID check (isWeather respects supression)
				pokemon.removeVolatile('asoneou');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['asoneou'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: As One (OU)', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: As One (OU)');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'asoneou' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('As One (OU) atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('As One (OU) def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('As One (OU) spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('As One (OU) spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('seriousshowdown')) {
						this.debug('Serious Showdown negating spe boost');
						return;
					}
				}
				this.debug('As One (OU) spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'As One (OU)');
			},
		},
		flags: {},
		name: "As One (OU)",
		//shortDesc: "Intimidate + Protosynthesis",
	},
	horrendousskin: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Horrendous Skin');
		},
		onFoeTryMove(target, source, move) {
			if (move.category == "Status") {
				const pokemon = this.sample(target.adjacentFoes());
				this.attrLastMove('[still]');
				this.add('-message', `${pokemon.name} is abhorrent! ${target.name} wants to damage it ASAP so it dies and goes away!`);
				this.add('cant', pokemon, 'ability: Horrendous Skin', move, '[of] ' + source, '[silent]');
				return false;
			}
		},
		flags: {},
		name: "Horrendous Skin",
		//shortDesc: "While this Pokemon is active, foes cannot use status moves.",
	},
	reprise: {
		onAfterMove(target, source, move) {
            if (target.addVolatile('reprise')) {
				target.volatiles['reprise'].move = this.dex.getActiveMove(move.id);
			}
        },
		condition: {
			noCopy: true,
			duration: 2,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onEnd(pokemon) {
				if (pokemon.hp) {
					const newMove = this.effectState.move;
					if(pokemon.adjacentFoes().length == 0) return;
					const target = this.sample(pokemon.adjacentFoes());
					this.add('-activate', pokemon, 'ability: Reprise');
					this.add('-message', `${pokemon.name} does it again!`);
					this.actions.useMove(newMove, pokemon, target);
				}
			},
		},
		flags: {breakable: 1},
		name: "Reprise",
		//shortDesc: "When this Pokemon uses a move, it uses that move again at the end of the next turn.",
	},
	poweroffriendship: {
		onBeforeSwitchIn(pokemon) {
			pokemon.friend = null;
			// yes, you can Illusion an active pokemon but only if it's to your right
			for (let i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				const possibleTarget = pokemon.side.pokemon[i];
				if (!possibleTarget.fainted) {
					// If Ogerpon is in the last slot while the Illusion Pokemon is Terastallized
					// Illusion will not disguise as anything
					if (!pokemon.terastallized || possibleTarget.species.baseSpecies !== 'Ogerpon') {
						pokemon.friend = possibleTarget.species;
					}
					break;
				}
			}
		},
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon, target, move) {
			move.pp --;
			const illusionmove = this.dex.getActiveMove(move.id);
			illusionmove.name = pokemon.friend;
			this.actions.useMove(illusionmove, pokemon, target);
			return null;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Power of Friendship",
		//shortDesc: "This Pokemon's moves are disguised as the last Pokemon in its party.",
	},
	hugescaling: {
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Huge Scaling');
			pokemon.maxhp = Math.floor(pokemon.maxhp * 2);
			pokemon.hp = Math.floor(pokemon.hp * 2);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		onSwitchOut(pokemon) {
			pokemon.maxhp = Math.floor(pokemon.maxhp / 2);
			pokemon.hp = Math.floor(pokemon.hp / 2);
		},
		flags: {},
		name: "Huge Scaling",
		//shortDesc: "This Pokemon's HP is doubled.",
	},
	fishificationbeam: {
		onAnyAfterSetStatus(status, target, source, effect) {
			//if (source.baseSpecies.name !== "Pechagiri") return;
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'psn' || status.id === 'tox') {
				target.addVolatile('fishificationbeam');
				this.add("-message", "Make this bozo become a dozo!");
			}
		},
		condition: {
			onStart(pokemon) {
				pokemon.formeChange('Dondozo');
			},
			onEnd(pokemon) {
				if (['Dondozo'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Fishification Beam",
		//shortDesc: "If this Pokemon poisons a target, the target also becomes Dondozo.",
	},
	blownaway: {
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({atk: 1}, pokemon, pokemon);
				pokemon.switchFlag = true;
				this.add('-activate', pokemon, 'ability: Blown Away');
				this.add('-message', `${pokemon.name} was blown away!`);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({atk: 1}, target, target)) {
					this.add('-immune', target, '[from] ability: Blown Away');
				}
				target.switchFlag = true;
				this.add('-activate', target, 'ability: Blown Away');
				this.add('-message', `${target.name} was blown away!`);
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({atk: 1}, pokemon, pokemon);
				target.switchFlag = true;
				this.add('-activate', target, 'ability: Blown Away');
				this.add('-message', `${target.name} was blown away!`);
			}
		},
		flags: {breakable: 1},
		name: "Blown Away",
		//shortDesc: "This Pokemon's Attack is raised by 1 and it switches out when hit by a Wind move; immune to Wind moves.",
	},
	specialsauce: {
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = [];
				move.secondaries.push(
				//tox
				{
					chance: 10,
					status: 'tox',
				}, 
				//boost all stats
				{
					chance: 10,
					self: {
						boosts: {
							atk: 1,
							def: 1,
							spa: 1,
							spd: 1,
							spe: 1,
						},
					},
				},
				//boost atk
				{
					chance: 10,
					self: {
						boosts: {
							atk: 1,
						},
					},
				},
				//boost def
				{
					chance: 10,
					self: {
						boosts: {
							def: 1,
						},
					},
				},
				//boost def x2
				{
					chance: 10,
					self: {
						boosts: {
							def: 2,
						},
					},
				},
				//boost spa
				{
					chance: 10,
					self: {
						boosts: {
							spa: 1,
						},
					},
				},
				//boost spe
				{
					chance: 10,
					self: {
						boosts: {
							spe: 1,
						},
					},
				},
				//burn
				{
					chance: 10,
					status: 'brn',
				},
				//confusion
				{
					chance: 10,
					volatileStatus: 'confusion',
				},
				//cure burn
				{
					chance: 10,
					volatileStatus: 'sparklingaria',
				},
				//eerie spell
				{
					chance: 10,
					onHit(target) {
						if (!target.hp) return;
						let move: Move | ActiveMove | null = target.lastMove;
						if (!move || move.isZ) return;
						if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);

						const ppDeducted = target.deductPP(move.id, 3);
						if (!ppDeducted) return;
						this.add('-activate', target, 'move: Eerie Spell', move.name, ppDeducted);
					},
				},
				//flinch
				{
					chance: 10,
					volatileStatus: 'flinch',
				},
				//freeze
				{
					chance: 10,
					status: 'frz',
				},
				//lower acc
				{
					chance: 10,
					boosts: {
						accuracy: -1,
					},
				},
				//lower atk
				{
					chance: 10,
					boosts: {
						atk: -1,
					},
				},
				//lower def
				{
					chance: 10,
					boosts: {
						def: -1,
					},
				},
				//lower spa
				{
					chance: 10,
					boosts: {
						spa: -1,
					},
				},
				//lower spd
				{
					chance: 10,
					boosts: {
						spd: -1,
					},
				},
				//lower spd x2
				{
					chance: 10,
					boosts: {
						spd: -2,
					},
				},
				//lower spe
				{
					chance: 10,
					boosts: {
						spe: -1,
					},
				},
				//paralysis
				{
					chance: 10,
					status: 'par',
				},
				//psn
				{
					chance: 10,
					status: 'psn',
				},
				//psychicnoise
				{
					chance: 10,
					volatileStatus: 'healblock',
				},
				//psychicterrain
				{
					chance: 10,
					self: {
						onHit() {
							this.field.setTerrain('psychicterrain');
						},
					},
				},
				//set rocks
				{
					chance: 10,
					onAfterHit(target, source, move) {
						if (!move.hasSheerForce && source.hp) {
							for (const side of source.side.foeSidesWithConditions()) {
								side.addSideCondition('stealthrock');
							}
						}
					},
					onAfterSubDamage(damage, target, source, move) {
						if (!move.hasSheerForce && source.hp) {
							for (const side of source.side.foeSidesWithConditions()) {
								side.addSideCondition('stealthrock');
							}
						}
					},
				},
				//set spikes
				{
					chance: 10,
					onAfterHit(target, source, move) {
						if (!move.hasSheerForce && source.hp) {
							for (const side of source.side.foeSidesWithConditions()) {
								side.addSideCondition('spikes');
							}
						}
					},
					onAfterSubDamage(damage, target, source, move) {
						if (!move.hasSheerForce && source.hp) {
							for (const side of source.side.foeSidesWithConditions()) {
								side.addSideCondition('spikes');
							}
						}
					},
				},
				//slp
				{
					chance: 10,
					status: 'slp',
				},
				//syrup
				{
					chance: 10,
					volatileStatus: 'syrupbomb',
				},
				//throatchop
				{
					chance: 10,
					onHit(target) {
						target.addVolatile('throatchop');
					},
				},
				//trapped
				{
					chance: 10,
					onHit(target, source, move) {
						if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
					},
				});
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Special Sauce",
		//shortDesc: "Sheer Force effects. This Pokemon's attacks gain a 10% chance to inflict each secondary effect that Sheer Force can remove.",
	},
	selfish: {
		onModifyMove(move) {
			if (move.category == "Status") move.target = "self";
		},
		onFoeTryMove(target, source, move) {
			if(move.category == "Status" && move.target == "self" && !move.hasBounced) {
				this.attrLastMove('[still]');
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				const newTarget = this.sample(target.adjacentFoes());
				this.add('-message', `${source.name} becomes the center of attention!`);
				this.actions.useMove(newMove, newTarget, newTarget);
				return null;
			}
		},
		flags: {},
		name: "Selfish",
		//shortDesc: "This Pokemon redirects all status moves toward itself; its own have their priority increased by 1.",
	},
	musicaljungal: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound']) {
				move.type = 'Grass';
				this.add('-message', "Walcome to the jungal, we got fun and games");
				this.field.setTerrain('grassyterrain');
			}
		},
		flags: {},
		name: "Musical Jungal",
		//shortDesc: "This Pokemon's sound moves become Grass type and summon Grassy Terrain.",
	},
	shockandballtorture: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Electric';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target)) return;

			let announced = false;
			for (const pokemon of [target, source]) {
				if (pokemon.volatiles['curseofshocking']) continue;
				if (!announced) {
					this.add('-ability', target, 'Shock and Ball Torture');
					this.add('-message', `${pokemon.name} got shocked!`);
					announced = true;
				}
				pokemon.addVolatile('curseofshocking');
			}
		},
		flags: {},
		name: "Shock and Ball Torture",
		//shortDesc: "Galvanize + contact with this Pokemon inflicts both this Pokemon and the attacker with Curse of Shocking.",
	},
	becomeaverage: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Become Average', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					if(!target.setType('Normal')) return;
					this.add('-start', target, 'typechange', 'Normal', '[from] ability: Become Average');
					this.add('-message', `${target.name} became a normie!`);
				}
			}
		},
		flags: {},
		name: "Become Average",
		//shortDesc: "On switch-in, this Pokemon turns adjacent opponents into Normal-types.",
	},
	quickstart: {
		//shortDesc: "On switch-in, this Pokemon's Attack and Speed are doubled for 5 turns.",
		onStart(pokemon) {
			pokemon.addVolatile('quickstart');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quickstart'];
			this.add('-end', pokemon, 'Quickstart', '[silent]');
		},
		condition: {
			duration: 5,
			onStart(target) {
				this.add(`c:|${Math.floor(Date.now() / 1000)}|${target.name}|Faster than fast, Quicker than quick. I am lightning.\nSpeed. I am speed.`);
				this.add('-start', target, 'ability: Quickstart', '[silent]');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd(target) {
				this.add('-end', target, 'Quickstart');
			},
		},
		flags: {},
		name: "Quickstart",
    },
	beewitch: {
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target || !target.hp || source.switchFlag === true) return;
			if (target !== source && move.category !== 'Status') {
				const item = target.takeItem();
				if(!item) return;
				const honey = this.dex.items.get('Honey');
				this.add('-enditem', target, item.name, '[from] ability: Beewitch', '[of] ' + source, "[silent]");
				this.add('-item', target, honey, '[from] ability: Beewitch', '[of] ' + target, "[silent]");
				target.setItem(honey);
				this.add("-message", `${source.name} pollinized ${target.name}'s ${item}!`);
			}
		},
		flags: {},
		name: "Beewitch",
		//shortDesc: "If this Pokemon hits a Pokemon that is holding a removable item, that item is replaced with Honey.",
	},
	royalpass: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.add('-start', target, 'ability: Royal Pass');
				this.add('-message', "The Monarch silences thee.");
				source.addVolatile("royalpass");
			}
		},
		condition: {
			onStart(pokemon) {
				const index = pokemon.moves.indexOf(pokemon.lastMove.id);
				const kingsshield = {
					move: "King's Shield",
					id: "kingsshield",
					pp: 16,
					maxpp: 16,
					target: "self",
					disabled: false,
					used: false,
					virtual: true,
				};
				pokemon.moveSlots[index] = kingsshield;
			},
		},
		flags: {},
		name: "Royal Pass",
		//shortDesc: "If a Pokemon makes contact with this Pokemon, their move is replaced with King's Shield until they switch out.",
	},
	metamorphic: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Miniluna' || pokemon.transformed) return;
			if (!pokemon.baseSpecies.forme) pokemon.formeChange('Miniluna-Bloodstone');
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Metamorphic", "[of] " + target);
				}
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move, attacker) {
			move.ignoreEvasion = true;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onAfterMove(target, source, move) {
			if (target.species.baseSpecies !== 'Miniluna' || target.transformed) return;
			if (move.category === 'Status' || !['Normal', 'Fighting'].includes(move.type)) return;
			const targetForme = target.species.name === 'Miniluna' ? 'Miniluna-Bloodstone' : 'Miniluna';
			target.formeChange(targetForme);
		},
		flags: {breakable: 1},
		name: "Metamorphic",
		//shortDesc: "Mind's Eye + when this Pokemon uses a Fighting or Normal move, it changes forms.",
	},
	dauntingshield: {
		onStart(pokemon) {
			if (pokemon.ppsuck) return;
			pokemon.ppsuck = true;
			let ppsuck = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!ppsuck) {
					this.add('-ability', pokemon, 'Daunting Shield', 'boost');
					ppsuck = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					for (const move of target.moveSlots) {
						move.pp /= 2;
					}
					this.add('-message', `${pokemon.name} is imposing! ${target.name}'s PP shrunk by half!`);
				}
			}
		},
		flags: {},
		name: "Daunting Shield",
		//shortDesc: "On switchin, this Pokemon halves the PP of adjacent foes. Once per battle.",
	},
	codebreaker: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Code Breaker');
			this.add('-message', `${pokemon.name.toLowerCase()} dont caare`);
		},
		onModifyMove(move) {
			if (move.category === 'Status') return;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			move.ignoreImmunity[move.type] = true;
			move.onEffectiveness = function(typeMod, target, type) {
				return 0;
			};
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Code Breaker",
		//shortDesc: "This Pokemon's moves and their effects ignore the Types of other Pokemon.",
	},
	prismatic: {
		onResidual(pokemon) {
			this.add('-ability', pokemon, 'ability: Prismatic');
			const types = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting',
						   'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 
						   'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];
			const possibleTypes = types.filter(type => !pokemon.types.includes(type));
			const newType1 = this.sample(possibleTypes);
			const newType2 = this.sample(possibleTypes.filter(type => type != newType1));
			this.add('-message', `${pokemon.name} is having an identity crisis and is now ${newType1}/${newType2}!`);
			const newTypes = [newType1, newType2];
			if(pokemon.setType(newTypes)) this.add('-start', pokemon, 'typechange', newTypes.join('/'), '[silent]');
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Prismatic",
		//shortDesc: "This Pokemon changes to a random typing at the end of each turn.",
	},
	teratooth: {
		onPreStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Teradoof') return;
			if (pokemon.species.forme !== 'Terastal') {
				this.add('-activate', pokemon, 'ability: Tera Shift');
				pokemon.formeChange('Teradoof-Terastal', this.effect, true);
				pokemon.formeChange('Teradoof-Terastal', this.effect, true);
				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, notransform: 1},
		name: "Tera Tooth",
		//shortDesc: "Tera Shift + this Pokemon's form change is doubled.",
	},
	terashell: {
		inherit: true,
		onEffectiveness(typeMod, target, type, move) {
			if (!target || target.species.name !== 'Teradoof-Terastal') return;
			if (this.effectState.resisted) return -1; // all hits of multi-hit move should be not very effective
			if (move.category === 'Status') return;
			if (!target.runImmunity(move.type)) return; // immunity has priority
			if (target.hp < target.maxhp) return;

			this.add('-activate', target, 'ability: Tera Shell');
			this.effectState.resisted = true;
			return -1;
		},
	},
	teraformzero: {
		inherit: true,
		onAfterTerastallization(pokemon) {
			if (pokemon.baseSpecies.name !== 'Teradoof-Stellar') return;
			if (this.field.weather || this.field.terrain) {
				this.add('-ability', pokemon, 'Teraform Zero');
				this.field.clearWeather();
				this.field.clearTerrain();
			}
		},
	},
	humongouspower: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.modify(atk, 3);
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Physical' && typeof accuracy === 'number') {
				return this.chainModify([2458, 4096]);
			}
		},
		flags: {},
		name: "Humongous Power",
		//shortDesc: "This Pokemon's Attack is 3x and accuracy of its physical attacks is 0.6x.",
	},
	badhax: {
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance = 100;
				}
			}
			if (move.self?.chance) move.self.chance = 100;
		},
		onModifySecondaries(secondaries) {
			this.debug('Bad Hax ensure secondary');
			for (const effect of secondaries) {
				effect.chance = 100;
			}
			return secondaries;
		},
		flags: {},
		name: "Bad Hax",
		//shortDesc: "Every move used by or against this Pokemon will always activate its secondary.",
	},
	noigofirst: {
		onModifyPriority(priority, pokemon, target, move) {
			if (!move.critRatio || move.critRatio != 0) return priority + 1;
		},
		flags: {},
		name: "NO I GO FIRST!!",
		//shortDesc: "This Pokemon's moves that can crit have +1 priority.",
	},
	gorillaofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Gorilla of Ruin');
			this.add('-message', "The gorilla suppresses everyone on the field!");
		},
		onAnyModifySpA(spa, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Gorilla of Ruin')) return;
			if (!move.ruinedSpA) move.ruinedSpA = abilityHolder;
			if (move.ruinedSpA !== abilityHolder) return;
			this.debug('Gorilla of Ruin SpA drop');
			return this.chainModify(0.75);
		},
		onFoeSwitchIn(pokemon) {
			if(!pokemon.hasAbility('Gorilla of Ruin') && !pokemon.volatiles['gorillaofruin']) pokemon.addVolatile('gorillaofruin');
		},
		condition: {
			onStart(pokemon) {
				const move = this.sample(pokemon.moveSlots);
				pokemon.disabledMove = move;
			},
			onDisableMove(pokemon) {
				pokemon.disableMove(pokemon.disabledMove.id, 'hidden');
				pokemon.maybeDisabled = true;
			},
			onBeforeMovePriority: 4,
			onBeforeMove(attacker, defender, move) {
				if (move.id !== 'struggle' && attacker.disabledMove && move.id === attacker.disabledMove && !move.isZ && !move.isMax) {
					this.add('cant', attacker, 'move: Imprison', move);
					return false;
				}
			},
			onEnd(pokemon) {
				pokemon.disabledMove = null;
			},
		},
		flags: {},
		name: "Gorilla of Ruin",
		//shortDesc: "Vessel of Ruin + Pokemon without this ability can only select 0.75x moves.",
	},
	swallowswallow: {
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				this.add(`c:|${Math.floor(Date.now() / 1000)}|${source.name}|I'm Smart`);
			}
			else if (target.getMoveHitData(move).typeMod < 0) {
				this.add(`c:|${Math.floor(Date.now() / 1000)}|${source.name}|I'm Dumb`);
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Flying' && target !== source) {
				this.add('-immune', target, '[from] ability: Swallow Swallow');
				this.add(`c:|${Math.floor(Date.now() / 1000)}|${target.name}|mmmm... tastes like chicken`);
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Swallow Swallow",
		//shortDesc: "This Pokemon is immune to Flying-type moves.",
	},
	wetchain: {
		onSourceDamagingHit(damage, target, source, move) {
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;

			if (this.randomChance(3, 10)) {
				source.addVolatile("moisturizer");
			}
		},
		flags: {},
		name: "Wet Chain",
		//shortDesc: "This Pokemon's moves have a 30% chance of giving it Moisturizer.",
	},
	imleabinthisgronp: {
		onFoeSwitchOut(pokemon) {
			const target = this.sample(pokemon.adjacentFoes());
			target.switchFlag = true;
			this.add('-activate', target, 'ability: im leabin this gronp');
		},
		onFoeDragOut(pokemon) {
			const target = this.sample(pokemon.adjacentFoes());
			target.switchFlag = true;
			this.add('-activate', target, 'ability: im leabin this gronp');
		},
		flags: {},
		name: "im leabin this gronp",
		//shortDesc: "Whenever the opponent switches out, this Pokemon also switches out.",
	},
	trjumpscare: {
		//handled in battle-actions
		flags: {},
		name: "trjumpscare",
		//shortDesc: "This Pokemon's Speed is reversed.",
	},
	defensiveice: {
		onStart(source) {
			this.field.setWeather('snow');
		},
		onWeather(target, source, effect) {
			if (effect.id === 'hail' || effect.id === 'snow') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		flags: {},
		name: "Defensive Ice",
		//shortDesc: "Snow Warning + Ice Body",
	},
	ultrayoink: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (!activated) this.add('-ability', pokemon, 'Ultra Yoink');
				activated = true;
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in target.storedStats) {
					if (target.storedStats[s] > bestStat) {
						statName = s;
						bestStat = target.storedStats[s];
					}
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					if (statName === 'atk') {
						this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|Your Attack? No, OUR Attack`);
						pokemon.storedStats.atk = target.storedStats.atk;
					}
					if (statName === 'def') {
						this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|Your Defense? No, OUR Defense`);
						pokemon.storedStats.def = target.storedStats.def;
					}
					if (statName === 'spa') {
						this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|Your Special Attack? No, OUR Special Attack`);
						pokemon.storedStats.spa = target.baseSpecies.baseStats.spa;
					}
					if (statName === 'spd') {
						this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|Your Special Defense? No, OUR Special Defense`);
						pokemon.storedStats.spd = target.storedStats.spd;
					}
					if (statName === 'spe') {
						this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|Your Speed? No, OUR Speed`);
						pokemon.storedStats.spe = target.storedStats.spe;
					}
				}
			}
		},
		flags: {},
		name: "Ultra Yoink",
		//shortDesc: "On switchin, this Pokemon copies the opponent's highest non-HP stat.",
	},
	ultraalchemist: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.add('-ability', source, 'Ultra Alchemist');
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in target.storedStats) {
					if (target.storedStats[s] > bestStat) {
						statName = s;
						bestStat = target.storedStats[s];
					}
				}
				if (statName === 'atk') {
					this.add('-message', `${source.name} looted ${target.name}'s Attack!`);
					source.storedStats.atk = target.storedStats.atk;
				}
				if (statName === 'def') {
					this.add('-message', `${source.name} looted ${target.name}'s Defense!`);
					source.storedStats.def = target.storedStats.def;
				}
				if (statName === 'spa') {
					this.add('-message', `${source.name} looted ${target.name}'s Special Attack!`);
					source.storedStats.spa = target.baseSpecies.baseStats.spa;
				}
				if (statName === 'spd') {
					this.add('-message', `${source.name} looted ${target.name}'s Special Defense!`);
					source.storedStats.spd = target.storedStats.spd;
				}
				if (statName === 'spe') {
					this.add('-message', `${source.name} looted ${target.name}'s Speed!`);
					source.storedStats.spe = target.storedStats.spe;
				}
			}
		},
		flags: {},
		name: "Ultra Alchemist",
		//shortDesc: "This Pokemon copies the highest non-HP stat of a Pokemon that it attacks and KOs.",
	},
	ac: {
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({atk: 1}, target, target)) {
					this.add('-immune', target, '[from] ability: Wind Rider');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['wind'] && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Ice';
				move.typeChangerBoosted = this.effect;
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (move.flags['wind']) this.boost({atk: 1}, source, source);
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {breakable: 1},
		name: "AC",
		//shortDesc: "Wind Rider + this Pokémon's Wind moves become Ice-Type, do 1.2x damage and raise the user's attack by 1 stage.",
	},
	windstorm: {
		onStart(pokemon) {
			this.add('-message', "it fucken WIMDY");
			pokemon.side.addSideCondition('tailwind');
		},
		flags: {},
		name: "Wind Storm",
		//shortDesc: "On switchin, this Pokemon summons Tailwind.",
	},
	asonegears: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One (Gears)');
		},
		onFoeDamage(damage, source, target, effect) {
			if (damage > source.hp && effect && effect.effectType === 'Move') {
				this.add('-message', `${source.name} was spared!`);
				return (source.hp == 1) ? 0 : source.hp - 1;
			}
		},
		flags: {},
		name: "As One (Gears)",
		//shortDesc: "While this Pokemon is active, opponents are prevented from fainting.",
	},
	'windows11': {
		onStart(pokemon) {
			let totaldef = 0;
			let totalspd = 0;
			for (const target of pokemon.foes()) {
				totaldef += target.getStat('def', false, true);
				totalspd += target.getStat('spd', false, true);
			}
			if (totaldef && totaldef >= totalspd) {
				pokemon.side.addSideCondition('reflect');
			} else if (totalspd) {
				pokemon.side.addSideCondition('lightscreen');
			}
		},
		flags: {},
		name: "Windows 11",
		//shortDesc: "On switchin, this Pokemon summons Reflect or Light Screen depending on the higher defense of the opponent.",
	},
	theplague: {
		onStart(source) {
			this.field.setWeather('alotofbees');
		},
		flags: {},
		name: "The Plague",
		//shortDesc: "On switchin, this Pokemon summons A Lot Of Bees.",
	},
	gotyourguts: {
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('gotyourguts') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.hasAbility('gotyourguts')) {
				pokemon.maybeTrapped = true;
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.damage(target.getUndynamaxedHP(damage), source, target);
			}
		},
		flags: {},
		name: "Got Your Guts!",
		//shortDesc: "Shadow Tag + Innards Out",
	},
	countertype: {
		onFoeEffectiveness(typeMod) {
			return typeMod * -1;
		},
		flags: {},
		name: "Countertype",
		//shortDesc: "This Pokemon's attacking effectiveness is reversed.",
	},
	rolidsock: {
		onEffectiveness(typeMod) {
			return typeMod * -1;
		},
		flags: {},
		name: "Rolid Sock",
		//shortDesc: "This Pokemon's defending effectiveness is reversed.",
	},
	graceofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Grace of Ruin');
			this.add('-message', "The luck of all Pokemon has decreased to that of Earl's!");
			this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName('Earlio2')}|wtf`);
		},
		onModifySecondaries(secondaries) {
			this.debug('Bad Hax reduce secondary');
			for (const effect of secondaries) {
				effect.chance = Math.floor(effect.chance * 0.75);
			}
			return secondaries;
		},
		flags: {},
		name: "Grace of Ruin",
		//shortDesc: "Pokemon without this ability have 0.75x luck.",
	},
	ironthorn: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('ironthorn');
			} else if (!pokemon.volatiles['ironthorn']?.fromBooster) {
				pokemon.removeVolatile('ironthorn');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['ironthorn'];
			this.add('-end', pokemon, 'Iron Thorn', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.add('-message', `${pokemon.name} thinks the Pokemon from this timeline are just not natural!`);
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Iron Thorn', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Iron Thorn');
				}
			},
			onResidual(pokemon) {
				for(const target of pokemon.adjacentFoes()){
					this.add(`c:|${Math.floor(Date.now() / 1000)}|${pokemon.name}|I know what you are...`);
					this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			},
		},
		flags: {},
		name: "Iron Thorn",
		//shortDesc: "Iron Barbs + Electric Terrain active or Booster Energy used: gain Iron Thorn.",
	},
	pansexual: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('attract', this.effectState.target);
				}
			}
		},
		//pansexuality implemented in moves.ts
		flags: {},
		name: "Pansexual",
		//shortDesc: "Cute Charm + this Pokemon can attract opponents regardless of gender.",
	},
	seriousshowdown: {
		onAnyModifyBoost(boosts, pokemon) {
			boosts['atk'] = 0;
			boosts['def'] = 0;
			boosts['spa'] = 0;
			boosts['spd'] = 0;
			boosts['spe'] = 0;
			boosts['accuracy'] = 0;
			boosts['evasion'] = 0;
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onFoeBeforeMovePriority: 13,
		onFoeBeforeMove(attacker, defender, move) {
			attacker.addVolatile('seriousshowdown');
		},
		condition: {
			onAfterMove(pokemon) {
				pokemon.removeVolatile('seriousshowdown');
			},
		},
		onAnyModifyAtkPriority: 4,
		onAnyModifyAtk(atk, attacker, defender, move) {
				const abilityHolder = this.effectState.target;
				if (attacker.isAlly(abilityHolder) || attacker.ignoringAbility() || !this.effectState.unnerved) return;
				if (!move.suppressedParadox) move.suppressedParadox = abilityHolder;
				else if (move.suppressedParadox !== abilityHolder) return;
				for (const paradox of ['asoneou', 'goondrive', 'ancientpyramid']) {
					if (attacker.hasAbility(paradox)) {
						if (attacker?.volatiles[paradox]?.bestStat !== 'atk') return;
						this.debug('Dyschronometria nullify');
						return this.chainModify([3151, 4096]);
					}
				}
		},
		onAnyModifyDefPriority: 5,
		onAnyModifyDef(atk, attacker, defender, move) {
				const abilityHolder = this.effectState.target;
				if (defender.isAlly(abilityHolder) || defender.ignoringAbility() || !this.effectState.unnerved) return;
				if (!move.suppressedParadox) move.suppressedParadox = abilityHolder;
				else if (move.suppressedParadox !== abilityHolder) return;
				for (const paradox of ['asoneou', 'goondrive', 'ancientpyramid']) {
					if (defender.hasAbility(paradox)) {
						if (defender?.volatiles[paradox]?.bestStat !== 'def') return;
						this.debug('Dyschronometria nullify');
						return this.chainModify([3151, 4096]);
					}
				}
		},
		onAnyModifySpAPriority: 4,
		onAnyModifySpA(atk, attacker, defender, move) {
				const abilityHolder = this.effectState.target;
				if (attacker.isAlly(abilityHolder) || attacker.ignoringAbility() || !this.effectState.unnerved) return;
				if (!move.suppressedParadox) move.suppressedParadox = abilityHolder;
				else if (move.suppressedParadox !== abilityHolder) return;
				for (const paradox of ['asoneou', 'goondrive', 'ancientpyramid']) {
					if (attacker.hasAbility(paradox)) {
						if (attacker?.volatiles[paradox]?.bestStat !== 'spa') return;
						this.debug('Dyschronometria nullify');
						return this.chainModify([3151, 4096]);
					}
				}
		},
		onAnyModifySpDPriority: 5,
		onAnyModifySpD(atk, attacker, defender, move) {
				const abilityHolder = this.effectState.target;
				if (defender.isAlly(abilityHolder) || defender.ignoringAbility() || !this.effectState.unnerved) return;
				if (!move.suppressedParadox) move.suppressedParadox = abilityHolder;
				else if (move.suppressedParadox !== abilityHolder) return;
				for (const paradox of ['asoneou', 'goondrive', 'ancientpyramid']) {
					if (defender.hasAbility(paradox)) {
						if (defender?.volatiles[paradox]?.bestStat !== 'spd') return;
						this.debug('Dyschronometria nullify');
						return this.chainModify([3151, 4096]);
					}
				}
		},
		//Speed suppression in the other Paradox abilities
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Serious Showdown');
			this.add('-message', `${pokemon.name} is locking in...`);
			this.effectState.unnerved = true;
		},
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'Serious Showdown');
			this.add('-message', `${pokemon.name} is locking in...`);
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		flags: {},
		name: "Serious Showdown",
		//shortDesc: "This Pokemon ignores abilities, stat changes, and paradox boosts.",
	},
	bidenblast: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Biden Blast', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					if(target.lastMove) {
						target.addVolatile('disable');
						this.add('-message', `${pokemon.name} Biden Blasted ${target.name}!`);
					}
				}
			}
		},
		onFaint(pokemon) {
			this.add(`c:|${Math.floor(Date.now() / 1000)}|${pokemon.name}|It's So Joever`);
		},
		flags: {},
		name: "Biden Blast",
		//shortDesc: "On switch-in, this Pokemon disables adjacent opponents' last move.",
	},
	herbgather: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && pokemon.lastItem == 'whiteherb') {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-message', `${pokemon.name} grew the good stuff!`);
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Herb Gather', '[silent]');
				}
			}
		},
		flags: {},
		name: "Herb Gather",
		//shortDesc: "If last item used is a White Herb, 50% chance to restore it at the end of each turn. 100% in Sun.",
	},
	'tier1boomer': {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				const explosion = this.dex.getActiveMove('explosion');
				this.add(`c:|${Math.floor(Date.now() / 1000)}|${pokemon.name}|I just wanna boom for Arceus' sake!`);
				this.actions.useMove(explosion, pokemon, target);
			}
		},
		flags: {},
		name: "Tier 1 Boomer",
		//shortDesc: "On switch-in, this Pokemon explodes.",
	},
	atv: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'ATV');
			let newBaseTypes = ['Grass', 'Electric', 'Fairy', 'Psychic'];
			if(!pokemon.setType(newBaseTypes)) return;
			this.add('-start', pokemon, 'typechange', 'Grass/Electric/Fairy/Psychic', '[from] ability: ATV');
		},
		onSetStatus(status, target, source, effect) {
			if (!target.isGrounded() || target.isSemiInvulnerable()) return;
			if (effect && ((effect as Move).status || effect.id === 'yawn')) {
				this.add('-activate', target, 'move: Misty Terrain');
			}
			return false;
		},
		onAnyBasePowerPriority: 6,
		onAnyBasePower(basePower, attacker, defender, move) {
			const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
			if ((weakenedMoves.includes(move.id) || move.type === 'Dragon') && defender.isGrounded() && !defender.isSemiInvulnerable()) {
				this.debug('misty terrain weaken');
				return this.chainModify(0.5);
			}
		},
		onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				if (target.isSemiInvulnerable() || target.isAlly(source)) return;
				if (!target.isGrounded()) {
					const baseMove = this.dex.moves.get(effect.id);
					if (baseMove.priority > 0) {
						this.hint("Psychic Terrain doesn't affect Pokémon immune to Ground.");
					}
					return;
				}
				this.add('-activate', target, 'move: Psychic Terrain');
				return null;
			},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (['Grass', 'Electric', 'Psychic'].includes(move.type)) {
				return this.chainModify(1.3);
			}
		},
		onResidual(pokemon) {
			if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
				this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
			} else {
				this.debug(`Pokemon semi-invuln or not grounded; Grassy Terrain skipped`);
			}
		},
		flags: {},
		name: "ATV",
		//shortDesc: "Mimicry + This Pokemon is considered to be under all terrains.",
	},
	healaura: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Heal Aura');
			this.add('-message', `${pokemon.name} radiates a healthy aura!`);
		},
		//should be handled in scripts/battle
		flags: {},
		name: "Heal Aura",
		//shortDesc: "While this Pokemon is active, all healing has 1.33x power.",
	},
	dualperformance: {
		onSwitchOut(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Paletta') return;
			const targetForme = (pokemon.species.forme !== 'Pirouette' ? 'Paletta-Pirouette' : 'Paletta');
			pokemon.formeChange(targetForme, this.effect, true);
		},
		onSwitchIn() {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			if (!this.effectState.switchingIn) return;
			this.effectState.switchingIn = false;
			if (pokemon.baseSpecies.baseSpecies !== 'Paletta') return;
			if (!this.effectState.heroMessageDisplayed && pokemon.species.forme === 'Hero') {
				this.add('-activate', pokemon, 'ability: Zero to Hero');
				if (pokemon.species.forme === 'Pirouette') this.add('-message', `${pokemon.name} underwent a rhythmic transformation!`);
				else this.add('-message', `${pokemon.name} underwent a melodic transformation!`);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, notransform: 1},
		name: "Dual Performance",
		//shortDesc: "Serene Grace + This Pokemon changes formes on switch.",
	},
	ultragun: {
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category !== "Status" && this.randomChance(3, 10)) {
				if(pokemon.adjacentFoes().length == 0) return;
				const actualTarget = this.sample(pokemon.adjacentFoes());
				this.add('-activate', pokemon, 'ability: Ultra Gun');
				this.add('-message', `${pokemon.name} ultra hams ${actualTarget.name} with its Ultra Gun!`);
				return 0.1;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (this.randomChance(3, 10)) {
				this.debug('Prism Armor neutralize');
				this.add('-message', `${source.name} Ultra Parried ${move.name}!`);
				return this.chainModify(0.75);
			}
		},
		flags: {},
		name: "Ultra Gun",
		//shortDesc: "Quick Draw + This Pokémon has a 30% chance to take 0.75x damage from attacks.",
	},
	zoomies: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move.flags['contact'] && this.randomChance(3, 10)) {
				this.add(`c:|${Math.floor(Date.now() / 1000)}|${pokemon.name}|Cumon step it up!!!!!`);
				return priority + 1;
			}
		},
		flags: {},
		name: "Zoomies",
		//shortDesc: "This Pokemon's contact moves have a 30% chance to gain +1 priority.",
	},
	sweatypalms: {
		onBasePower(basePower, pokemon, target, move) {
			if (this.randomChance(3, 10)) {
				this.add('-message', `${pokemon.name} is going all out for this attack!`);
				return this.chainModify(2);
			}
		},
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn' || pokemon.status === 'psn') {
				this.add('-activate', pokemon, 'ability: Sweaty Palms');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn' && status.id !== 'psn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Sweaty Palms');
			}
			return false;
		},
		flags: {breakable: 1},
		name: "Sweaty Palms",
		//shortDesc: "Takes half damage from Fire moves. Cannot be burned or poisoned. This Pokémon's contact moves have a 30% chance of doing double damage.",
	},
	boilingblood: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedAngerShell = false;
			} else {
				this.effectState.checkedAngerShell = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedAngerShell;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.add('-message', "The crab has been angered.");
				this.boost({atk: 12, spa: 12, spe: 12, def: -12, spd: -12}, target, target);
			}
		},
		flags: {},
		name: "Boiling Blood",
		//shortDesc: "At 1/2 or less of this Pokemon's max HP: +6 Atk, Sp. Atk, Spe, and -6 Def, Sp. Def.",
	},
	superangrysyrup: {
		onStart(pokemon) {
			if (pokemon.angryBoost) return;
			pokemon.angryBoost = true;
			this.add('-message', `${pokemon.name} is going batshit crazy!`);
			this.boost({atk: 12}, pokemon);
		},
		flags: {},
		name: "Superangry Syrup",
		//shortDesc: "Once per battle, increases Atk 12 stages on entry.",
	},
	footballofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Football of Ruin');
			this.add('-message', `${pokemon.name} doesn't know about type advantages`);
		},
		onAnyModifySTAB(stab, source, target, move) {
			if(source.hasAbility('footballofruin')) return;
			if (move.forceSTAB || source.hasType(move.type)) {
				if (stab === 0.75) {
					return 1;
				}
				return 0.75;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if(source.hasAbility('footballofruin')) return;
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Prism Armor neutralize');
				return this.chainModify(0.75);
			}
		},
		onSourceBasePowerPriority: 17,
		onSourceBasePower(basePower, attacker, defender, move) {
			if(attacker.hasAbility('footballofruin')) return;
			if (defender.getMoveHitData(move).typeMod < 0) {
				return this.chainModify([4, 3]);
			}
		},
		flags: {},
		name: "Football of Ruin",
		//shortDesc: "Active Pokemon without this Ability have the effectiveness of their Type multiplied by 0.75.",
	},
	luckycharm: {
		onModifyCritRatio(critRatio, source) {
			return critRatio + Math.min(source.timesAttacked, 5);
		},
		onDamagingHit(damage, target, source, effect) {
			this.add('-message', `${target.name} is feeling lucky!`);
		},
		flags: {},
		name: "Lucky Charm",
		//shortDesc: "This Pokemon's critical hit ratio is raised by 1 stage after it is damaged by a move.",
	},
	goldenboy: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && ['mimighold', 'mimikyutotem'].includes(target.species.id)) {
				this.add('-activate', target, 'ability: Golden Boy');
				this.damage(target.baseMaxhp / 8, target, target);
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimighold', 'mimikyutotem'].includes(target.species.id)) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (!['mimighold', 'mimikyutotem'].includes(target.species.id)) {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-activate', target, 'ability: Golden Boy');
				this.damage(target.baseMaxhp / 8, target, target);
				return null;
			}
		},
		flags: {
			failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1,
			breakable: 1, notransform: 1,
		},
		name: "Golden Boy",
		//shortDesc: "This Pokemon is immune to attacks and status moves but takes 1/8th max HP damage when targeted by either.",
	},
	supersaiyan: {
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onTryBoost(boost, target, source, effect) {
			if (['As One (OU)', 'Super Saiyan', 'Intimidate'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Super Saiyan', '[of] ' + target);
			}
		},
		onAnyTryPrimaryHit(target, source, move) {
			this.add('-ability', source, 'Intimidate', 'boost');
			this.add(`c:|${Math.floor(Date.now() / 1000)}|${source.name}|You look strong. Let's fight!`);
			this.boost({atk: -1}, target, source, null, true);
		},
		flags: {breakable: 1},
		name: "Super Saiyan",
		//shortDesc: "Inner Focus + Moves used by and against this Pokemon activate Intimidate.",
	},
	ancientpyramid: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('ancientpyramid');
			} else if (!pokemon.volatiles['ancientpyramid']?.fromBooster && this.field.weather !== 'sunnyday') {
				// Protosynthesis will not deactivite if Sun is suppressed, hence the direct ID check (isWeather respects supression)
				pokemon.removeVolatile('ancientpyramid');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['ancientpyramid'];
			this.add('-end', pokemon, 'Ancient Pyramid', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.add('-message', `${pokemon.name} is getting fucked up!`);
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Ancient Pyramid', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Ancient Pyramid', '[silent]');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'ancientpyramid' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Ancient Pyramid atk boost');
				return this.chainModify([3072, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Ancient Pyramid def boost');
				return this.chainModify([3072, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Ancient Pyramid spa boost');
				return this.chainModify([3072, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Ancient Pyramid spd boost');
				return this.chainModify([3072, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('seriousshowdown')) {
						this.debug('Serious Showdown negating spe boost');
						return;
					}
				}
				this.debug('Ancient Pyramid spe boost');
				return this.chainModify(0.67);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Ancient Pyramid');
			},
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Prism Armor neutralize');
				return this.chainModify(1.3);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Ancient Pyramid",
		//shortDesc: "Sunny Day active or Booster Energy used: highest stat is 0.75x, or 0.67x if Speed. This Pokemon takes x1.3 damage from super-effective moves.",
	},
	sweaty: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				this.add('-message', `${target.name} enjoys a Mr. Sauna`);
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Sweaty');
				}
				return null;
			}
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Technician boost');
				this.add('-message', `${attacker.name} is Mr Healthy`);
				this.heal(attacker.baseMaxhp / 4)
				return this.chainModify(1.5);
			}
		},
		flags: {breakable: 1},
		name: "Sweaty",
		//shortDesc: "Water Absorb + Using moves with 60 or lower BP heals the user by 1/4 max HP.",
	},
	ultrathief: {
		onModifyMove(move, pokemon, target) {
			move.stealsBoosts = true;
		},
		flags: {},
		name: "Ultra Thief",
		//shortDesc: "This Pokemon steals stat boosts when it hits a Pokémon with an attack.",
	},
	debristhatarenottoxic: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const spikes = side.sideConditions['spikes'];
			if (move.category === 'Physical' && (!spikes || spikes.layers < 3)) {
				this.add('-activate', target, 'ability: Debris That Are Not Toxic');
				side.addSideCondition('spikes', target);
			}
		},
		flags: {},
		name: "Debris That Are Not Toxic",
		//shortDesc: "If this Pokemon is hit by a physical attack, Spikes are set on the opposing side.",
	},
	understudy: {
		onStart(pokemon) {
			this.add('-message', `One of the nine bats protects ${pokemon.name}!`);
            this.actions.useMove("substitute", pokemon);
        },
		flags: {},
		name: "Understudy",
		//shortDesc: "On switchin, this Pokemon summons Substitute.",
	},
	unimpressivenessofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Unimpressiveness of Ruin');
			this.add('-message', `${pokemon.name} is not amused.`);
		},
		onAnyModifySTAB(stab, source, target, move) {
			if(source.hasAbility('unimpressivenessofruin')) return;
			if (move.forceSTAB || source.hasType(move.type)) {
				if (stab === 0.75) {
					return 1;
				}
				return 0.75;
			}
		},
		onModifySTAB(stab, source, target, move) {
			if (move.forceSTAB || source.hasType(move.type)) {
				if (stab === 2) {
					return 2.25;
				}
				return 2;
			}
		},
		flags: {},
		name: "Unimpressiveness of Ruin",
		//shortDesc: "Pokemon without this ability have 0.75x STAB power. Its own STAB has 2x power instead of 1.5x.",
	},
	honeyrush: {
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('alotofbees')) {
				return this.chainModify(2);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'alotofbees') return false;
		},
		flags: {},
		name: "Honey Rush",
		//shortDesc: "This Pokémon's Speed is doubled under A Lot Of Bees; bee immunity.",
	},
	fatfree: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (['Ice', 'Fire', 'Normal', 'Fighting', 'Ghost'].includes(move.type)) {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (['Ice', 'Fire', 'Normal', 'Fighting', 'Ghost'].includes(move.type)) {
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Fat Free",
		//shortDesc: "Fire/Ice/Normal/Fighting/Ghost moves against this Pokemon have a halved attacking stat.",
	},
	vaporsync: {
		onDamage(damage, target, source, effect) {
			if (effect && effect.effectType !== 'Move' && effect.id !== 'vaporsync') {
				for (const foes of target.adjacentFoes()) {
					this.damage(damage, foes, target);
				}
			}
		},
		flags: {},
		name: "Vapor Sync",
		//shortDesc: "If this Pokemon takes indirect damage, the opponent takes the same amount of damage.",
	},
	saltthewound: {
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Salt The Wound');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Salt The Wound');
				return null;
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (attacker.volatiles['partiallytrapped'] || attacker.volatiles['trapped']) {
				this.debug('Salt The Wound weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(spa, attacker, defender, move) {
			if (attacker.volatiles['partiallytrapped'] || attacker.volatiles['trapped']) {
				this.debug('Salt The Wound weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Salt The Wound",
		//shortDesc: "Trapped opponents deal damage to this Pokemon with a halved attacking stat; can't be statused.",
	},
};
