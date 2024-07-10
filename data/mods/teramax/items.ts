export const Items: {[itemid: string]: ModdedItemData} = {
	wishingstone: {
		name: "Wishing Stone",
		spritenum: 22,
		onTakeItem: false,
		zMove: true,
		onSwitchIn(pokemon) {
			if (pokemon.side.sideConditions['dynamaxused']) {
				pokemon.side.dynamaxUsed = true;
			} else {
				pokemon.side.dynamaxUsed = false;				
			}
			if (pokemon.gigantamax && pokemon.side.sideConditions['gmaxused']) {
				pokemon.addVolatile('dynamax');
			}
		},
		onSwitchOut(pokemon) {
			pokemon.side.dynamaxUsed = true;
		},
		onFaint(pokemon) {
			pokemon.side.dynamaxUsed = true;
		},
		num: -1000,
		gen: 9,
		desc: "Allows this the holder to Dynamax.",
		rating: 3,
		itemUser: [
			"Venusaur-Gmax", "Charizard-Gmax", "Blastoise-Gmax", "Butterfree-Gmax", "Pikachu-Gmax", "Meowth-Gmax", "Machamp-Gmax", "Gengar-Gmax", "Kingler-Gmax", "Lapras-Gmax", 
			"Eevee-Gmax", "Snorlax-Gmax", "Garbodor-Gmax", "Melmetal-Gmax", "Rillaboom-Gmax", "Cinderace-Gmax", "Inteleon-Gmax", "Corviknight-Gmax", "Orbeetle-Gmax", "Drednaw-Gmax", 
			"Coalossal-Gmax", "Flapple-Gmax", "Appletun-Gmax", "Sandaconda-Gmax", "Centiskorch-Gmax", "Toxtricity-Gmax", "Toxtricity-Low-Key-Gmax", "Hatterene-Gmax", "Grimmsnarl-Gmax", 
			"Alcremie-Gmax", "Copperajah-Gmax", "Duraludon-Gmax", "Urshifu-Gmax", "Urshifu-Rapid-Strike-Gmax"
		],
	},
};
