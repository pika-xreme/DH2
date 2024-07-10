import {FS} from '../../../lib';
import {toID} from '../../../sim/dex-data';

// Similar to User.usergroups. Cannot import here due to users.ts requiring Chat
// This also acts as a cache, meaning ranks will only update when a hotpatch/restart occurs
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
	abyssallight: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Abyssal Light weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Abyssal Light weaken');
				return this.chainModify(0.5);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' || move.type === 'Electric') {
				this.debug('hidden boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' || move.type === 'Electric') {
				this.debug('hidden boost');
				return this.chainModify(1.5);
			}
		},
		flags: {breakable: 1},
		name: "Abyssal Light",
		shortDesc: "This Pokemon takes halved damage from Dark and Ghost-type moves.",
	},
	ahexual: {
		onTryHit(target, source, move) {
			if (target !== source && move.flags['trick']) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Ahexual');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Ahexual",
		shortDesc: "This Pokemon heals 1/4 max HP when hit by a trick move; immune to tricks.",
	},
	cursedbody: {
		onSourceModifyDamage(damage, source, target, move) {
			if(this.effectState.cursed) return;
			return this.chainModify(0.75);
		},
		onDamagingHit(damage, target, source, move) {
			if (this.effectState.cursed || source.volatiles['disable']) return;
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
				this.effectState.cursed = true;
				source.addVolatile('disable', this.effectState.target);
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.cursed;
		},
		name: "Cursed Body",
		shortDesc: "When attacked, takes 75% damage and disables the move. Once per switch in.",
	},
	dummy: {
        onStart(pokemon) {
            this.actions.useMove("substitute", pokemon);
        },
        name: "Dummy",
        shortDesc: "On switchin, this Pokemon uses Substitute.",
    },
	jankster: {
		onDamagingHit(damage, target, source, move) {
			this.add('-ability', target, 'Jankster');
			if (move.category === 'Physical') {
				const newatk = target.storedStats.atk;
				target.storedStats.atk = source.storedStats.atk;
				source.storedStats.atk = newatk;
				this.add('-message', `${target.name}'s and ${target.name}'s Attack were swapped!`);
			} else {
				const newspa = target.storedStats.spa;
				target.storedStats.spa = newspa;
				source.storedStats.spa = newspa;
				this.add('-message', `${target.name}'s and ${target.name}'s Special Attack were swapped!`);
			}
		},
		flags: {breakable: 1},
		name: "Jankster",
		shortDesc: "When this Pokemon is damaged by an attack, it swaps its corresponding attack stat with the attacker.",
	},
	jumpscare: {
		onStart(pokemon) {
			if (pokemon.scare) return;
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Jumpscare');
					activated = true;
					pokemon.scare = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					target.addVolatile('jumpscare');
				}
			}
		},
		name: "Jumpscare",
		shortDesc: "On switchin, opposing Pokemon flinch. Once per battle.",
	},
	magician: {
		name: "Magician",
		shortDesc: "This Pokemon heals 1/16 max HP while behind a Substitute.",
		onStart(pokemon) {
			const switchin = ['I am here!', 
							'I have come!', 
							'Merasmus has risen!', 
							'Cower fools! Merasmus is here!', 
							'Run fools! Run from Merasmus!', 
							'Merasmus the Wizard has come for your souls!', 
							'(evil laughter)', 
							'(wicked laughter)', 
							'(diabolical laughter)', 
							'Soldier! Never anger a magician!', 
							'Welcome. To your doom!', 
							'DOOM! All of you are doomed!', 
							'Enjoy Halloween mortals, for it will be your last!', 
							'Merasmus arrives on a tide of blood! *sotto voce* Oh hello, Soldier.'];
			this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName('Merasmus')}|${this.sample(switchin)}`);
		},
		onResidual(pokemon) {
			if(pokemon.volatiles['substitute']) {
				const sub = ['Must hide and heal.', 
							'Must hide and heal.', 
							'Must hide. Get stronger.', 
							'Must hide. Must heal.', 
							'Must hide. Must heal.', 
							'Merasmus must hide.', 
							'Merasmus must hide.', 
							'No strength. Must hide.', 
							'No! This cannot be the end! Must hide.', 
							'Fools! I will come back stronger!', 
							'Fools! Do you not know you deal with the master of hiding!', 
							'Fools! Feel the terror of my hiding!', 
							'You cannot kill me fools! For I am great at hiding!', 
							'The hide-ening! It is here! Okay, need to find a hiding-spot.', 
							'Time to play hide-and-seek...your doom!', 
							'Must hide. Get stronger.', 
							'You have bested my magic! But can you withstand the dark power...of HIDING!'];
				this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName('Merasmus')}|${this.sample(sub)}`);
				this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
			}
		},
		onSwitchOut(pokemon) {
			const switchout = ['Goodbye... Forever!', 
								'Alright, I\'m leaving now.', 
								'Alright, I\'m leaving now.', 
								'Goodbye, everyone!', 
								'Well, that was fun. Off I go!', 
								'Alright, goodbye everyone!', 
								'Enough! I leave.', 
								'A-ha! Too slow! I leave!', 
								'*Evil laugh* Goodbye, forever!', 
								'*Evil laugh* Goodbye, forever! *sotto voce* I\'ll see you at home, Soldier.', 
								'You have amused Merasmus, but now I must attend to other eldritch business. Farewell!', 
								'*Evil laugh* I bid you, farewell!', 
								'Farewell! Happy Halloween, everyone!', 
								'I leave you... to your doom!'];
			this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName('Merasmus')}|${this.sample(switchout)}`);
		},
		onFaint(pokemon) {
			const faint = ['Ach, no!', 
						'You win. No, wait, it\'s a tie! Argh...',
						'Aaah!', 
						'Aaah!', 
						'Oooh!', 
						'Nyyaaagh! I hate you so much, Soldier!',
						'You haven\'t heard the last of Merasmus the Magician!', 
						'I die, I diieeee... bye Soldier.', 'I die! Soldier, you were the wooorst roommate!', 
						'I die! I curse this land, for a hundred years!- No! A thousand! Thousand year-oh, I die!', 
						'Noooo!', 
						'Noooo!'];
			this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName('Merasmus')}|${this.sample(faint)}`);
		},
	},
	mutualexclusion: {
		onStart(target) {
			this.add('-activate', target, 'ability: Mutual Exclusion');
			target.addVolatile('imprison');
		},
        name: "Mutual Exclusion",
        shortDesc: "On switchin, this Pokemon gains Imprison.",
    },
	onderguard: {
		onDamagingHit(damage, target, source, effect) {
			if (this.randomChance(1, 2)) this.boost({def: 1, spd: -1});
			else this.boost({def: -1, spd: 1});
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('hidden boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('hidden boost');
				return this.chainModify(1.5);
			}
		},
		name: "Onder Guard",
		shortDesc: "This Pokemon's Defense is raised by 1 and its Special Defense is lowered by 1, or vice versa, when it is damaged by an opponent's move.",
	},
	pinfiltrator: {
		onModifyMove(move) {
			move.infiltrates = true;
		},
		onSourceDamagingHit(damage, target, source, move) {
			this.damage(source.baseMaxhp / 8, source, target);
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Rock') {
				this.debug('hidden boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Rock') {
				this.debug('hidden boost');
				return this.chainModify(1.5);
			}
		},
		name: "PInfiltrator",
		shortDesc: "This Pokemon's moves ignore Substitute/screens and deal an extra 1/8 max HP.",
	},
	powerofalchemy: {
		name: "Power of Alchemy",
		shortDesc: "On switch-in, swaps ability with the opponent.",
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			if (!pokemon.isStarted || !this.effectState.switchingIn) return;
			const additionalBannedAbilities = [
				// Zen Mode included here for compatability with Gen 5-6
				'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'wanderingspirit',
				'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode'
			];
			const possibleTargets = pokemon.foes().filter(foeActive => foeActive && !foeActive.getAbility().isPermanent
				&& !additionalBannedAbilities.includes(foeActive.ability) && foeActive.isAdjacent(pokemon));
			if (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				const target = possibleTargets[rand];
				const ability = target.getAbility();
				if (pokemon.setAbility(ability) && target.setAbility('powerofalchemy')) {
					this.add('-ability', target, 'Power of Alchemy');
					this.add('-ability', pokemon, ability.name);
				} else {
					pokemon.setAbility('powerofalchemy');
				}
			}
		},
	},
	ppressure: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'PPressure');
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 2;
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Rock') {
				this.debug('hidden boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Rock') {
				this.debug('hidden boost');
				return this.chainModify(1.5);
			}
		},
		name: "PPressure",
		shortDesc: "When a move targets this Pokemon, that move loses 2 additional PP.",
	},
	pulpup: {
		onDamagingHit(damage, target, source, effect) {
			target.addVolatile('stockpile');
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && move.name === 'Explosion' && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fire';
				move.typeChangerBoosted = this.effect;
			}
		},
		name: "Pulp Up",
		shortDesc: "This Pokemon gains 1 Stockpile upon damage. Normal-type moves become Fire-type.",
	},
	wandrush: {
		onStart(source) {
			this.field.setWeather('sandstorm');
		},
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		name: "Wand Rush",
		shortDesc: "On switchin, sets Sandstorm. Sandstorm: Speed 2x, Sp. Atk 1.5x; immunity to sand.",
	},
	revive: {
		shortDesc: "When this Pokemon has 0 HP, it switches out and is revived to 1/2 max HP. Once per battle.",
		name: "Revive",
		onBeforeSwitchIn(pokemon) {
			if (pokemon.zombie) {
				pokemon.zombie = false;
				pokemon.switchedIn = undefined;
			}
		},
		onFaint(pokemon) {
			if (pokemon.name === 'Trevenant' && !pokemon.zombie && this.canSwitch(pokemon.side)) {
				if (pokemon.formeChange('Trevenant-Revenant', this.effect, true)) {
					this.add('-ability', pokemon, 'Revive');
					pokemon.zombie = true;
					pokemon.hp = Math.floor(pokemon.maxhp / 2);
					pokemon.setAbility('reckless');
				}
			}
		},
	},
	shapeshift: {
		name: "Shapeshift",
		shortDesc: "If this Pokemon is a Rotom, certain moves cause it to change forme.",
		onBeforeMove(source, target, move) {
			switch (move.type) {
				case "Fire":
					if (source.species.id !== "rotomheat") {
						this.add('-activate', source, 'ability: Shapeshift');
						source.formeChange("Rotom-Heat");
					}
					break;
				case "Water":
					if (source.species.id !== "rotomwash") {
						this.add('-activate', source, 'ability: Shapeshift');
						source.formeChange("Rotom-Wash");
					}
					break;
				case "Grass":
					if (source.species.id !== "rotommow") {
						this.add('-activate', source, 'ability: Shapeshift');
						source.formeChange("Rotom-Mow");
					}
					break;
				case "Ice":
					if (source.species.id !== "rotomfrost") {
						this.add('-activate', source, 'ability: Shapeshift');
						source.formeChange("Rotom-Frost");
					}
					break;
				case "Flying":
					if (source.species.id !== "rotomfan") {
						this.add('-activate', source, 'ability: Shapeshift');
						source.formeChange("Rotom-Fan");
					}
					break;
				case "Ghost":
					if (source.species.id !== "rotom") {
						this.add('-activate', source, 'ability: Shapeshift');
						source.formeChange("Rotom");
					}
					break;
			}
		},
	},
	spoky: {
		name: "Spoky",
		shortDesc: "This Pokemon's type effectiveness is reversed when attacking or getting attacked.",
		onStart(target) {
			this.add('-ability', target, 'Spoky');
		},
		onEffectiveness(typeMod) {
			return typeMod * -1;
		},
		onFoeEffectiveness(typeMod) {
			return typeMod * -1;
		},
	},
	undead: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Ghost'] = true;
			}
		},
		name: "Undead",
		shortDesc: "This Pokemon can hit Normal-types with Ghost attacks.",
	},
	wonderguard: {
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) != 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Wonder Guard');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Wonder Guard",
		shortDesc: "This Pokemon can only be hit by neutral attacks.",
	},
}