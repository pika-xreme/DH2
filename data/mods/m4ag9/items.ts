export const Items: {[itemid: string]: ModdedItemData} = {
	dragonitite: {
		name: "Dragonitite",
		spritenum: 586,
		megaStone: "Dragonite-Mega",
		megaEvolves: "Dragonite",
		itemUser: ["Dragonite"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1001,
		gen: 8,
		desc: "If held by a Dragonite, this item allows it to Mega Evolve in battle.",
	},
	hydreigonite: {
		name: "Hydreigonite",
		spritenum: 585,
		megaStone: "Hydreigon-Mega",
		megaEvolves: "Hydreigon",
		itemUser: ["Hydreigon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1002,
		gen: 8,
		desc: "If held by a Hydreigon, this item allows it to Mega Evolve in battle.",
	},
	goodranite: {
		name: "Goodranite",
		spritenum: 577,
		megaStone: "Goodra-Mega",
		megaEvolves: "Goodra",
		itemUser: ["Goodra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1003,
		gen: 8,
		desc: "If held by a Goodra, this item allows it to Mega Evolve in battle.",
	},
	kommonite: {
		name: "Kommonite",
		spritenum: 580,
		megaStone: "Kommo-o-Mega",
		megaEvolves: "Kommo-o",
		itemUser: ["Kommo-o"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1004,
		gen: 8,
		desc: "If held by a Kommo-o, this item allows it to Mega Evolve in battle.",
	},
	dragapultite: {
		name: "Dragapultite",
		spritenum: 600,
		megaStone: "Dragapult-Mega",
		megaEvolves: "Dragapult",
		itemUser: ["Dragapult"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1005,
		gen: 8,
		desc: "If held by a Dragapult, this item allows it to Mega Evolve in battle.",
	},
	corviknite: {
		name: "Corviknite",
		spritenum: 578,
		megaStone: "Corviknight-Mega",
		megaEvolves: "Corviknight",
		itemUser: ["Corviknight"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1006,
		gen: 8,
		desc: "If held by a Corviknight, this item allows it to Mega Evolve in battle.",
	},
	orbeetlite: {
		name: "Orbeetlite",
		spritenum: 584,
		megaStone: "Orbeetle-Mega",
		megaEvolves: "Orbeetle",
		itemUser: ["Orbeetle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1007,
		gen: 8,
		desc: "If held by an Orbeetle, this item allows it to Mega Evolve in battle.",
	},
	thievulite: {
		name: "Thievulite",
		spritenum: 591,
		megaStone: "Thievul-Mega",
		megaEvolves: "Thievul",
		itemUser: ["Thievul"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1008,
		gen: 8,
		desc: "If held by a Thievul, this item allows it to Mega Evolve in battle.",
	},
	toucannonite: {
		name: "Toucannonite",
		spritenum: 625,
		megaStone: "Toucannon-Mega",
		megaEvolves: "Toucannon",
		itemUser: ["Toucannon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1009,
		gen: 8,
		desc: "If held by a Toucannon, this item allows it to Mega Evolve in battle.",
	},
	gumshoosite: {
		name: "Gumshoosite",
		spritenum: 622,
		megaStone: "Gumshoos-Mega",
		megaEvolves: "Gumshoos",
		itemUser: ["Gumshoos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1010,
		gen: 8,
		desc: "If held by a Gumshoos, this item allows it to Mega Evolve in battle.",
	},
	lycanite: {
		name: "Lycanite",
		spritenum: 602,
		megaStone: "Lycanroc-Mega",
		megaEvolves: "Lycanroc",
		itemUser: ["Lycanroc"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1011,
		gen: 8,
		desc: "If held by a Lycanroc, this item allows it to Mega Evolve in battle.",
	},
	vikavoltite: {
		name: "Vikavoltite",
		spritenum: 607,
		megaStone: "Vikavolt-Mega",
		megaEvolves: "Vikavolt",
		itemUser: ["Vikavolt"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1012,
		gen: 8,
		desc: "If held by a Vikavolt, this item allows it to Mega Evolve in battle.",
	},
	raichunite: {
		name: "Raichunite",
		spritenum: 628,
		megaStone: "Raichu-Mega",
		megaEvolves: "Raichu",
		itemUser: ["Raichu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1013,
		gen: 8,
		desc: "If held by a Raichu, this item allows it to Mega Evolve in battle.",
	},
	clefabite: {
		name: "Clefabite",
		spritenum: 617,
		megaStone: "Clefable-Mega",
		megaEvolves: "Clefable",
		itemUser: ["Clefable"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1014,
		gen: 8,
		desc: "If held by a Clefable, this item allows it to Mega Evolve in battle.",
	},
	rillaboomite: {
		name: "Rillaboomite",
		spritenum: 613,
		megaStone: "Rillaboom-Mega",
		megaEvolves: "Rillaboom",
		itemUser: ["Rillaboom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1015,
		gen: 8,
		desc: "If held by a Rillaboom, this item allows it to Mega Evolve in battle.",
	},
	cinderite: {
		name: "Cinderite",
		spritenum: 590,
		megaStone: "Cinderace-Mega",
		megaEvolves: "Cinderace",
		itemUser: ["Cinderace"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1016,
		gen: 8,
		desc: "If held by a Cinderace, this item allows it to Mega Evolve in battle.",
	},
	inteleonite: {
		name: "Inteleonite",
		spritenum: 608,
		megaStone: "Inteleon-Mega",
		megaEvolves: "Inteleon",
		itemUser: ["Inteleon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1017,
		gen: 8,
		desc: "If held by an Inteleon, this item allows it to Mega Evolve in battle.",
	},
	klinklite: {
		name: "Klinklite",
		spritenum: 578,
		megaStone: "Klinklang-Mega",
		megaEvolves: "Klinklang",
		itemUser: ["Klinklang"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1018,
		gen: 8,
		desc: "If held by a Klinklang, this item allows it to Mega Evolve in battle.",
	},
	vanillite: {
		name: "Vanillite",
		spritenum: 578,
		megaStone: "Vanilluxe-Mega",
		megaEvolves: "Vanilluxe",
		itemUser: ["Vanilluxe"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1019,
		gen: 8,
		desc: "If held by a Vanilluxe, this item allows it to Mega Evolve in battle.",
	},
	garbodorite: {
		name: "Garbodorite",
		spritenum: 578,
		megaStone: "Garbodor-Mega",
		megaEvolves: "Garbodor",
		itemUser: ["Garbodor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1020,
		gen: 8,
		desc: "If held by a Garbodor, this item allows it to Mega Evolve in battle.",
	},
	vaporeonite: {
		name: "Vaporeonite",
		spritenum: 578,
		megaStone: "Vaporeon-Mega",
		megaEvolves: "Vaporeon",
		itemUser: ["Vaporeon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1021,
		gen: 8,
		desc: "If held by a Vaporeon, this item allows it to Mega Evolve in battle.",
	},
	jolteonite: {
		name: "Jolteonite",
		spritenum: 578,
		megaStone: "Jolteon-Mega",
		megaEvolves: "Jolteon",
		itemUser: ["Jolteon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1022,
		gen: 8,
		desc: "If held by a Jolteon, this item allows it to Mega Evolve in battle.",
	},
	flareonite: {
		name: "Flareonite",
		spritenum: 578,
		megaStone: "Flareon-Mega",
		megaEvolves: "Flareon",
		itemUser: ["Flareon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1023,
		gen: 8,
		desc: "If held by a Flareon, this item allows it to Mega Evolve in battle.",
	},
	butterfrite: {
		name: "Butterfrite",
		spritenum: 578,
		megaStone: "Butterfree-Mega",
		megaEvolves: "Butterfree",
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1024,
		gen: 8,
		desc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
	},
	slowkinite: {
		name: "Slowkinite",
		spritenum: 578,
		megaStone: "Slowking-Mega",
		megaEvolves: "Slowking",
		itemUser: ["Slowking"],
		onTakeItem(item, source) {
			if (source.species.name.startsWith('Slowking')) return false;
			return true;
		},
		num: -1025,
		gen: 8,
		desc: "If held by a Slowking, this item allows it to Mega Evolve in battle.",
	},
	froslassite: {
		name: "Froslassite",
		spritenum: 578,
		megaStone: "Froslass-Mega",
		megaEvolves: "Froslass",
		itemUser: ["Froslass"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1026,
		gen: 8,
		desc: "If held by a Froslass, this item allows it to Mega Evolve in battle.",
	},
	conkeldite: {
		name: "Conkeldite",
		spritenum: 578,
		megaStone: "Conkeldurr-Mega",
		megaEvolves: "Conkeldurr",
		itemUser: ["Conkeldurr"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1027,
		gen: 8,
		desc: "If held by a Conkeldurr, this item allows it to Mega Evolve in battle.",
	},
	gothitite: {
		name: "Gothitite",
		spritenum: 578,
		megaStone: "Gothitelle-Mega",
		megaEvolves: "Gothitelle",
		itemUser: ["Gothitelle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1028,
		gen: 8,
		desc: "If held by a Gothitelle, this item allows it to Mega Evolve in battle.",
	},
	chandelite: {
		name: "Chandelite",
		spritenum: 578,
		megaStone: "Chandelure-Mega",
		megaEvolves: "Chandelure",
		itemUser: ["Chandelure"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1029,
		gen: 8,
		desc: "If held by a Chandelure, this item allows it to Mega Evolve in battle.",
	},
	bisharpite: {
		name: "Bisharpite",
		spritenum: 578,
		megaStone: "Bisharp-Mega",
		megaEvolves: "Bisharp",
		itemUser: ["Bisharp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1030,
		gen: 8,
		desc: "If held by a Bisharp, this item allows it to Mega Evolve in battle.",
	},
	gigalite: {
		name: "Gigalite",
		spritenum: 578,
		megaStone: "Gigalith-Mega",
		megaEvolves: "Gigalith",
		itemUser: ["Gigalith"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1031,
		gen: 8,
		desc: "If held by a Gigalith, this item allows it to Mega Evolve in battle.",
	},
	reunite: {
		name: "Reunite",
		spritenum: 578,
		megaStone: "Reuniclus-Mega",
		megaEvolves: "Reuniclus",
		itemUser: ["Reuniclus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1032,
		gen: 8,
		desc: "If held by a Reuniclus, this item allows it to Mega Evolve in battle.",
	},
	boltundite: {
		name: "Boltundite",
		spritenum: 578,
		megaStone: "Boltund-Mega",
		megaEvolves: "Boltund",
		itemUser: ["Boltund"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1033,
		gen: 8,
		desc: "If held by a Boltund, this item allows it to Mega Evolve in battle.",
	},
	luxrite: {
		name: "Luxrite",
		spritenum: 578,
		megaStone: "Luxray-Mega",
		megaEvolves: "Luxray",
		itemUser: ["Luxray"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1034,
		gen: 8,
		desc: "If held by a Luxray, this item allows it to Mega Evolve in battle.",
	},
	archeonite: {
		name: "Archeonite",
		spritenum: 578,
		megaStone: "Archeops-Mega",
		megaEvolves: "Archeops",
		itemUser: ["Archeops"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1035,
		gen: 8,
		desc: "If held by an Archeops, this item allows it to Mega Evolve in battle.",
	},
	talonflite: {
		name: "Talonflite",
		spritenum: 578,
		megaStone: "Talonflame-Mega",
		megaEvolves: "Talonflame",
		itemUser: ["Talonflame"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1036,
		gen: 8,
		desc: "If held by a Talonflame, this item allows it to Mega Evolve in battle.",
	},
	staraptorite: {
		name: "Staraptorite",
		spritenum: 578,
		megaStone: "Staraptor-Mega",
		megaEvolves: "Staraptor",
		itemUser: ["Staraptor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1037,
		gen: 8,
		desc: "If held by a Staraptor, this item allows it to Mega Evolve in battle.",
	},
	bibarelite: {
		name: "Bibarelite",
		spritenum: 578,
		megaStone: "Bibarel-Mega",
		megaEvolves: "Bibarel",
		itemUser: ["Bibarel"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1038,
		gen: 8,
		desc: "If held by a Bibarel, this item allows it to Mega Evolve in battle.",
	},
	kricketite: {
		name: "Kricketite",
		spritenum: 578,
		megaStone: "Kricketune-Mega",
		megaEvolves: "Kricketune",
		itemUser: ["Kricketune"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1039,
		gen: 8,
		desc: "If held by a Kricketune, this item allows it to Mega Evolve in battle.",
	},
	mismaginite: {
		name: "Mismaginite",
		spritenum: 578,
		megaStone: "Mismagius-Mega",
		megaEvolves: "Mismagius",
		itemUser: ["Mismagius"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1040,
		gen: 8,
		desc: "If held by a Mismagius, this item allows it to Mega Evolve in battle.",
	},
	honchkronite: {
		name: "Honchkronite",
		spritenum: 578,
		megaStone: "Honchkrow-Mega",
		megaEvolves: "Honchkrow",
		itemUser: ["Honchkrow"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1041,
		gen: 8,
		desc: "If held by a Honchkrow, this item allows it to Mega Evolve in battle.",
	},
	oddkeystone: {
		name: "Odd Keystone",
		spritenum: 578,
		megaStone: "Spiritomb-Mega",
		megaEvolves: "Spiritomb",
		itemUser: ["Spiritomb"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1042,
		gen: 8,
		desc: "If held by a Spiritomb, this item allows it to Mega Evolve in battle.",
	},
	ariadosite: {
		name: "Ariadosite",
		spritenum: 578,
		megaStone: "Ariados-Mega",
		megaEvolves: "Ariados",
		itemUser: ["Ariados"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1043,
		gen: 8,
		desc: "If held by an Ariados, this item allows it to Mega Evolve in battle.",
	},
	gourgeite: {
		name: "Gourgeite",
		spritenum: 578,
		megaStone: "Gourgeist-Mega",
		megaEvolves: "Gourgeist",
		itemUser: ["Gourgeist"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1044,
		gen: 8,
		desc: "If held by a Gourgeist, this item allows it to Mega Evolve in battle. The effect is different depending on the base form's size!",
	},
	mimikyunite: {
		name: "Mimikyunite",
		spritenum: 578,
		megaStone: "Mimikyu-Mega",
		megaEvolves: "Mimikyu",
		itemUser: ["Mimikyu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1045,
		gen: 8,
		desc: "If held by a Mimikyu, this item allows it to Mega Evolve in battle. The effect is different depending on the base form's Disguise!",
	},
	nidoqueenite: {
		name: "Nidoqueenite",
		spritenum: 578,
		megaStone: "Nidoqueen-Mega",
		megaEvolves: "Nidoqueen",
		itemUser: ["Nidoqueen"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1046,
		gen: 8,
		desc: "If held by a Nidoqueen, this item allows it to Mega Evolve in battle.",
	},
	walreinite: {
		name: "Walreinite",
		spritenum: 578,
		megaStone: "Walrein-Mega",
		megaEvolves: "Walrein",
		itemUser: ["Walrein"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1047,
		gen: 8,
		desc: "If held by a Walrein, this item allows it to Mega Evolve in battle.",
	},
	aurorite: {
		name: "Aurorite",
		spritenum: 578,
		megaStone: "Aurorus-Mega",
		megaEvolves: "Aurorus",
		itemUser: ["Aurorus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1048,
		gen: 8,
		desc: "If held by an Aurorus, this item allows it to Mega Evolve in battle.",
	},
	nidokinite: {
		name: "Nidokinite",
		spritenum: 578,
		megaStone: "Nidoking-Mega",
		megaEvolves: "Nidoking",
		itemUser: ["Nidoking"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1049,
		gen: 8,
		desc: "If held by a Nidoking, this item allows it to Mega Evolve in battle.",
	},
	tyranite: {
		name: "Tyranite",
		spritenum: 578,
		megaStone: "Tyrantrum-Mega",
		megaEvolves: "Tyrantrum",
		itemUser: ["Tyrantrum"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1050,
		gen: 8,
		desc: "If held by a Tyrantrum, this item allows it to Mega Evolve in battle.",
	},
	trevenite: {
		name: "Trevenite",
		spritenum: 578,
		megaStone: "Trevenant-Mega",
		megaEvolves: "Trevenant",
		itemUser: ["Trevenant"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1051,
		gen: 8,
		desc: "If held by a Trevenant, this item allows it to Mega Evolve in battle.",
	},
	eelektrossite: {
		name: "Eelektrossite",
		spritenum: 578,
		megaStone: "Eelektross-Mega",
		megaEvolves: "Eelektross",
		itemUser: ["Eelektross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1052,
		gen: 8,
		desc: "If held by an Eelektross, this item allows it to Mega Evolve in battle.",
	},
	dragalgite: {
		name: "Dragalgite",
		spritenum: 578,
		megaStone: "Dragalge-Mega",
		megaEvolves: "Dragalge",
		itemUser: ["Dragalge"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1053,
		gen: 8,
		desc: "If held by a Dragalge, this item allows it to Mega Evolve in battle.",
	},
	acidicseed: {
		name: "Acidic Seed",
		spritenum: 666,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('electricterrain')) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('acidicterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			spd: 1,
		},
		num: -1054,
		gen: 8,
		desc: "If the terrain is Acidic Terrain, raises holder's Sp. Def by 1 stage. Single use.",
	},
	dhelmite: {
		name: "Dhelmite",
		spritenum: 578,
		megaStone: "Dhelmise-Mega",
		megaEvolves: "Dhelmise",
		itemUser: ["Dhelmise"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1055,
		gen: 8,
		desc: "If held by a Dhelmise, this item allows it to Mega Evolve in battle.",
	},
	meganiumite: {
		name: "Meganiumite",
		spritenum: 578,
		megaStone: "Meganium-Mega",
		megaEvolves: "Meganium",
		itemUser: ["Meganium"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1056,
		gen: 8,
		desc: "If held by a Meganium, this item allows it to Mega Evolve in battle.",
	},
	typhlosionite: {
		name: "Typhlosionite",
		spritenum: 578,
		megaStone: "Typhlosion-Mega",
		megaEvolves: "Typhlosion",
		itemUser: ["Typhlosion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1057,
		gen: 8,
		desc: "If held by a Typhlosion, this item allows it to Mega Evolve in battle.",
	},
	feraligatrite: {
		name: "Feraligatrite",
		spritenum: 578,
		megaStone: "Feraligatr-Mega",
		megaEvolves: "Feraligatr",
		itemUser: ["Feraligatr"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1058,
		gen: 8,
		desc: "If held by a Feraligatr, this item allows it to Mega Evolve in battle.",
	},
	reginite: {
		name: "Reginite",
		spritenum: 578,
		megaStone: "Regirock-Mega",
		megaEvolves: "Regirock",
		itemUser: ["Regirock"],
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Regirock') return false;
			if (source.baseSpecies.baseSpecies === 'Regice') return false;
			if (source.baseSpecies.baseSpecies === 'Registeel') return false;
			return true;
		},
		num: -1059,
		gen: 8,
		desc: "If held by a Regirock, Regice or Registeel, this item allows it to Mega Evolve in battle.",
	},
	magcargonite: {
		name: "Magcargonite",
		spritenum: 578,
		megaStone: "Magcargo-Mega",
		megaEvolves: "Magcargo",
		itemUser: ["Magcargo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1060,
		gen: 8,
		desc: "If held by a Magcargo, this item allows it to Mega Evolve in battle.",
	},
	bastiodite: {
		name: "Bastiodite",
		spritenum: 578,
		megaStone: "Bastiodon-Mega",
		megaEvolves: "Bastiodon",
		itemUser: ["Bastiodon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1061,
		gen: 8,
		desc: "If held by a Bastiodon, this item allows it to Mega Evolve in battle.",
	},
	leavannite: {
		name: "Leavannite",
		spritenum: 578,
		megaStone: "Leavanny-Mega",
		megaEvolves: "Leavanny",
		itemUser: ["Leavanny"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1062,
		gen: 8,
		desc: "If held by a Leavanny, this item allows it to Mega Evolve in battle.",
	},
	parasite: {
		name: "Parasite",
		spritenum: 578,
		megaStone: "Parasect-Mega",
		megaEvolves: "Parasect",
		itemUser: ["Parasect"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1063,
		gen: 8,
		desc: "If held by a Parasect, this item allows it to Mega Evolve in battle.",
	},
	samurite: {
		name: "Samurite",
		spritenum: 578,
		megaStone: "Samurott-Mega",
		megaEvolves: "Samurott",
		itemUser: ["Samurott"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1064,
		gen: 8,
		desc: "If held by a Samurott, this item allows it to Mega Evolve in battle.",
	},
	meowsticite: {
		name: "Meowsticite",
		spritenum: 578,
		megaStone: "Meowstic-Mega",
		megaEvolves: "Meowstic",
		itemUser: ["Meowstic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1065,
		gen: 8,
		desc: "If held by a Meowstic, this item allows it to Mega Evolve in battle.",
	},
	starminite: {
		name: "Starminite",
		spritenum: 578,
		megaStone: "Starmie-Mega",
		megaEvolves: "Starmie",
		itemUser: ["Starmie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1066,
		gen: 8,
		desc: "If held by a Starmie, this item allows it to Mega Evolve in battle.",
	},
	delibirdite: {
		name: "Delibirdite",
		spritenum: 578,
		megaStone: "Delibird-Mega",
		megaEvolves: "Delibird",
		itemUser: ["Delibird"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1067,
		gen: 8,
		desc: "If held by a Delibird, this item allows it to Mega Evolve in battle.",
	},
	sawsbuckite: {
		name: "Sawsbuckite",
		spritenum: 578,
		megaStone: "Sawsbuck-Mega",
		megaEvolves: "Sawsbuck",
		itemUser: ["Sawsbuck"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			if (source.baseSpecies.baseSpecies === 'Delibird') return false;
			return true;
		},
		num: -1068,
		gen: 8,
		desc: "If held by a Sawsbuck, this item allows it to Mega Evolve in battle.",
	},
	flygonite: {
		name: "Flygonite",
		spritenum: 578,
		megaStone: "Flygon-Mega",
		megaEvolves: "Flygon",
		itemUser: ["Flygon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1069,
		gen: 8,
		desc: "If held by a Flygon, this item allows it to Mega Evolve in battle.",
	},
	drapionite: {
		name: "Drapionite",
		spritenum: 578,
		megaStone: "Drapion-Mega",
		megaEvolves: "Drapion",
		itemUser: ["Drapion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1070,
		gen: 8,
		desc: "If held by a Drapion, this item allows it to Mega Evolve in battle.",
	},
	lurantisite: {
		name: "Lurantisite",
		spritenum: 578,
		megaStone: "Lurantis-Mega",
		megaEvolves: "Lurantis",
		itemUser: ["Lurantis"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1071,
		gen: 8,
		desc: "If held by a Lurantis, this item allows it to Mega Evolve in battle.",
	},
	exploudite: {
		name: "Exploudite",
		spritenum: 578,
		megaStone: "Exploud-Mega",
		megaEvolves: "Exploud",
		itemUser: ["Exploud"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1072,
		gen: 8,
		desc: "If held by an Exploud, this item allows it to Mega Evolve in battle.",
	},
	noivernite: {
		name: "Noivernite",
		spritenum: 578,
		megaStone: "Noivern-Mega",
		megaEvolves: "Noivern",
		itemUser: ["Noivern"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1073,
		gen: 8,
		desc: "If held by a Noivern, this item allows it to Mega Evolve in battle.",
	},
	toxtricitite: {
		name: "Toxtricitite",
		spritenum: 578,
		megaStone: "Toxtricity-Mega",
		megaEvolves: "Toxtricity",
		itemUser: ["Toxtricity"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1074,
		gen: 8,
		desc: "If held by a Toxtricity, this item allows it to Mega Evolve in battle.",
	},
	cacturnite: {
		name: "Cacturnite",
		spritenum: 578,
		megaStone: "Cacturne-Mega",
		megaEvolves: "Cacturne",
		itemUser: ["Cacturne"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1075,
		gen: 8,
		desc: "If held by a Cacturne, this item allows it to Mega Evolve in battle.",
	},
	hawluchanite: {
		name: "Hawluchanite",
		spritenum: 578,
		megaStone: "Hawlucha-Mega",
		megaEvolves: "Hawlucha",
		itemUser: ["Hawlucha"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1076,
		gen: 8,
		desc: "If held by a Hawlucha, this item allows it to Mega Evolve in battle.",
	},
	araquanite: {
		name: "Araquanite",
		spritenum: 578,
		megaStone: "Araquanid-Mega",
		megaEvolves: "Araquanid",
		itemUser: ["Araquanid"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1077,
		gen: 8,
		desc: "If held by an Araquanid, this item allows it to Mega Evolve in battle.",
	},
	ninetalesite: {
		name: "Ninetalesite",
		spritenum: 578,
		megaStone: "Ninetales-Alola-Mega",
		megaEvolves: "Ninetales-Alola",
		itemUser: ["Ninetales-Alola"],
		onTakeItem(item, source) {
			if (source.species.name.startsWith('Ninetales-Alola')) return false;
			return true;
		},
		num: -1078,
		gen: 8,
		desc: "If held by a Ninetales, this item allows it to Mega Evolve in battle.",
	},
	zoroarkite: {
		name: "Zoroarkite",
		spritenum: 578,
		megaStone: "Zoroark-Mega",
		megaEvolves: "Zoroark",
		itemUser: ["Zoroark"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Zoroark, this item allows it to Mega Evolve in battle.",
	},
	delphite: {
		name: "Delphite",
		spritenum: 578,
		megaStone: "Delphox-Mega",
		megaEvolves: "Delphox",
		itemUser: ["Delphox"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1080,
		gen: 8,
		desc: "If held by a Delphox, this item allows it to Mega Evolve in battle.",
	},
	dugtrionite: {
		name: "Dugtrionite",
		spritenum: 578,
		megaStone: "Dugtrio-Mega",
		megaEvolves: "Dugtrio",
		itemUser: ["Dugtrio"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1081,
		gen: 8,
		desc: "If held by a Dugtrio, this item allows it to Mega Evolve in battle.",
	},
	wishiwashinite: {
		name: "Wishiwashinite",
		spritenum: 578,
		megaStone: "Wishiwashi-Mega",
		megaEvolves: "Wishiwashi",
		itemUser: ["Wishiwashi"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1082,
		gen: 8,
		desc: "If held by a Wishiwashi, this item allows it to Mega Evolve in battle.",
	},
	falinksite: {
		name: "Falinksite",
		spritenum: 578,
		megaStone: "Falinks-Mega-Legion",
		megaEvolves: "Falinks",
		itemUser: ["Falinks"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1083,
		gen: 8,
		desc: "If held by a Falinks, this item allows it to Mega Evolve in battle.",
	},
	floatzelite: {
		name: "Floatzelite",
		spritenum: 578,
		megaStone: "Floatzel-Mega",
		megaEvolves: "Floatzel",
		itemUser: ["Floatzel"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1084,
		gen: 8,
		desc: "If held by a Floatzel, this item allows it to Mega Evolve in battle.",
	},
	simisearite: {
		name: "Simisearite",
		spritenum: 578,
		megaStone: "Simisear-Mega",
		megaEvolves: "Simisear",
		itemUser: ["Simisear"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1085,
		gen: 8,
		desc: "If held by a Simisear, this item allows it to Mega Evolve in battle.",
	},
	krookodilite: {
		name: "Krookodilite",
		spritenum: 578,
		megaStone: "Krookodile-Mega",
		megaEvolves: "Krookodile",
		itemUser: ["Krookodile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1086,
		gen: 8,
		desc: "If held by a Krookodile, this item allows it to Mega Evolve in battle.",
	},
	cinccinite: {
		name: "Cinccinite",
		spritenum: 578,
		megaStone: "Cinccino-Mega",
		megaEvolves: "Cinccino",
		itemUser: ["Cinccino"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1087,
		gen: 8,
		desc: "If held by a Cinccino, this item allows it to Mega Evolve in battle.",
	},
	torterranite: {
		name: "Torterranite",
		spritenum: 578,
		megaStone: "Torterra-Mega",
		megaEvolves: "Torterra",
		itemUser: ["Torterra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1088,
		gen: 8,
		desc: "If held by a Torterra, this item allows it to Mega Evolve in battle.",
	},
	infernite: {
		name: "Infernite",
		spritenum: 578,
		megaStone: "Infernape-Mega",
		megaEvolves: "Infernape",
		itemUser: ["Infernape"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1089,
		gen: 8,
		desc: "If held by an Infernape, this item allows it to Mega Evolve in battle.",
	},
	empoleonite: {
		name: "Empoleonite",
		spritenum: 578,
		megaStone: "Empoleon-Mega",
		megaEvolves: "Empoleon",
		itemUser: ["Empoleon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1090,
		gen: 8,
		desc: "If held by an Empoleon, this item allows it to Mega Evolve in battle.",
	},
	rapidashinite: {
		name: "Rapidashinite",
		spritenum: 578,
		megaStone: "Rapidash-Mega",
		megaEvolves: "Rapidash",
		itemUser: ["Rapidash"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1091,
		gen: 8,
		desc: "If held by a Rapidash, this item allows it to Mega Evolve in battle.",
	},
	zebstrikanite: {
		name: "Zebstrikanite",
		spritenum: 578,
		megaStone: "Zebstrika-Mega",
		megaEvolves: "Zebstrika",
		itemUser: ["Zebstrika"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1092,
		gen: 8,
		desc: "If held by a Zebstrika, this item allows it to Mega Evolve in battle.",
	},
	mudsdalite: {
		name: "Mudsdalite",
		spritenum: 578,
		megaStone: "Mudsdale-Mega",
		megaEvolves: "Mudsdale",
		itemUser: ["Mudsdale"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1093,
		gen: 8,
		desc: "If held by a Mudsdale, this item allows it to Mega Evolve in battle.",
	},
	electrodite: {
		name: "Electrodite", // sorry, Kero, no Thermite for you
		spritenum: 578,
		megaStone: "Electrode-Mega",
		megaEvolves: "Electrode",
		itemUser: ["Electrode"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1094,
		gen: 8,
		desc: "If held by an Electrode, this item allows it to Mega Evolve in battle.",
	},
	porygonitez: {
		name: "Porygonite-Z",
		spritenum: 578,
		megaStone: "Porygon-Z-Mega",
		megaEvolves: "Porygon-Z",
		itemUser: ["Porygon-Z"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1098,
		gen: 8,
		desc: "If held by a Porygon-Z, this item allows it to Mega Evolve in battle.",
	},
	sirfetchdite: {
		name: "Sirfetch\u2019dite",
		spritenum: 578,
		megaStone: "Sirfetch\u2019d-Mega",
		megaEvolves: "Sirfetch\u2019d",
		itemUser: ["Sirfetch\u2019d"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1099,
		gen: 8,
		desc: "If held by a Sirfetch\u2019d, this item allows it to Mega Evolve in battle.",
	},
	deciduite: {
		name: "Deciduite",
		spritenum: 578,
		megaStone: "Decidueye-Mega",
		megaEvolves: "Decidueye",
		itemUser: ["Decidueye"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1100,
		gen: 8,
		desc: "If held by a Decidueye, this item allows it to Mega Evolve in battle.",
	},
	incinerite: {
		name: "Incinerite",
		spritenum: 578,
		megaStone: "Incineroar-Mega",
		megaEvolves: "Incineroar",
		itemUser: ["Incineroar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1101,
		gen: 8,
		desc: "If held by an Incineroar, this item allows it to Mega Evolve in battle.",
	},
	primarinite: {
		name: "Primarinite",
		spritenum: 578,
		megaStone: "Primarina-Mega",
		megaEvolves: "Primarina",
		itemUser: ["Primarina"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1102,
		gen: 8,
		desc: "If held by a Primarina, this item allows it to Mega Evolve in battle.",
	},
	electivirite: {
		name: "Electivirite",
		spritenum: 578,
		megaStone: "Electivire-Mega",
		megaEvolves: "Electivire",
		itemUser: ["Electivire"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1104,
		gen: 8,
		desc: "If held by an Electivire, this item allows it to Mega Evolve in battle.",
	},
	magmortarite: {
		name: "Magmortarite",
		spritenum: 578,
		megaStone: "Magmortar-Mega",
		megaEvolves: "Magmortar",
		itemUser: ["Magmortar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1105,
		gen: 8,
		desc: "If held by a Magmortar, this item allows it to Mega Evolve in battle.",
	},
	mightyenite: {
		name: "Mightyenite",
		spritenum: 578,
		megaStone: "Mightyena-Mega",
		megaEvolves: "Mightyena",
		itemUser: ["Mightyena"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1107,
		gen: 8,
		desc: "If held by a Mightyena, this item allows it to Mega Evolve in battle.",
	},
	stoutlandite: {
		name: "Stoutlandite",
		spritenum: 578,
		megaStone: "Stoutland-Mega",
		megaEvolves: "Stoutland",
		itemUser: ["Stoutland"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1108,
		gen: 8,
		desc: "If held by a Stoutland, this item allows it to Mega Evolve in battle.",
	},
	dodrionite: {
		name: "Dodrionite",
		spritenum: 578,
		megaStone: "Dodrio-Mega",
		megaEvolves: "Dodrio",
		itemUser: ["Dodrio"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1110,
		gen: 8,
		desc: "If held by a Dodrio, this item allows it to Mega Evolve in battle.",
	},
	lanturnite: {
		name: "Lanturnite",
		spritenum: 578,
		megaStone: "Lanturn-Mega",
		megaEvolves: "Lanturn",
		itemUser: ["Lanturn"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1111,
		gen: 8,
		desc: "If held by a Lanturn, this item allows it to Mega Evolve in battle.",
	},
	obstagoonite: {
		name: "Obstagoonite",
		spritenum: 578,
		megaStone: "Obstagoon-Mega",
		megaEvolves: "Obstagoon",
		itemUser: ["Obstagoon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1112,
		gen: 8,
		desc: "If held by an Obstagoon, this item allows it to Mega Evolve in battle.",
	},
	guzzlordite: {
		name: "Guzzlordite",
		spritenum: 578,
		megaStone: "Guzzlord-Mega",
		megaEvolves: "Guzzlord",
		itemUser: ["Guzzlord"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1117,
		gen: 8,
		desc: "If held by a Guzzlord, this item allows it to Mega Evolve in battle.",
	},
	lickilickite: {
		name: "Lickilickite",
		spritenum: 578,
		megaStone: "Lickilicky-Mega",
		megaEvolves: "Lickilicky",
		itemUser: ["Lickilicky"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1118,
		gen: 8,
		desc: "If held by a Lickilicky, this item allows it to Mega Evolve in battle.",
	},
	tsareenite: {
		name: "Tsareenite",
		spritenum: 578,
		megaStone: "Tsareena-Mega",
		megaEvolves: "Tsareena",
		itemUser: ["Tsareena"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1119,
		gen: 8,
		desc: "If held by a Tsareena, this item allows it to Mega Evolve in battle.",
	},
	grapplite: {
		name: "Grapplite",
		spritenum: 578,
		megaStone: "Grapploct-Mega",
		megaEvolves: "Grapploct",
		itemUser: ["Grapploct"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1120,
		gen: 8,
		desc: "If held by a Grapploct, this item allows it to Mega Evolve in battle.",
	},
	snorlaxite: {
		name: "Snorlaxite",
		spritenum: 578,
		megaStone: "Snorlax-Mega",
		megaEvolves: "Snorlax",
		itemUser: ["Snorlax"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1121,
		gen: 8,
		desc: "If held by a Snorlax, this item allows it to Mega Evolve in battle.",
	},
	swalonite: {
		name: "Swalonite",
		spritenum: 578,
		megaStone: "Swalot-Mega",
		megaEvolves: "Swalot",
		itemUser: ["Swalot"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1122,
		gen: 8,
		desc: "If held by a Swalot, this item allows it to Mega Evolve in battle.",
	},
	wailordite: {
		name: "Wailordite",
		spritenum: 578,
		megaStone: "Wailord-Mega",
		megaEvolves: "Wailord",
		itemUser: ["Wailord"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1123,
		gen: 8,
		desc: "If held by a Wailord, this item allows it to Mega Evolve in battle.",
	},

	// Kalos content

	gogoatite: {
		name: "Gogoatite",
		spritenum: 578,
		megaStone: "Gogoat-Mega",
		megaEvolves: "Gogoat",
		itemUser: ["Gogoat"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1001,
		gen: 8,
		desc: "If held by a Gogoat, this item allows it to Mega Evolve in battle.",
	},
	clawitzerite: {
		name: "Clawitzerite",
		spritenum: 578,
		megaStone: "Clawitzer-Mega",
		megaEvolves: "Clawitzer",
		itemUser: ["Clawitzer"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1002,
		gen: 8,
		desc: "If held by a Clawitzer, this item allows it to Mega Evolve in battle.",
	},
	wormadamite: {
		name: "Wormadamite",
		spritenum: 578,
		megaStone: "Wormadam-Sandy-Mega",
		megaEvolves: "Wormadam-Sandy",
		itemUser: ["Wormadam-Sandy"],
		onTakeItem(item, source) {
			if (source.species.name.startsWith('Wormadam-Sandy')) return false;
			return true;
		},
		num: -1003,
		gen: 8,
		desc: "If held by a Wormadam-Sandy, this item allows it to Mega Evolve in battle.",
	},
	drifblimite: {
		name: "Drifblimite",
		spritenum: 578,
		megaStone: "Drifblim-Mega",
		megaEvolves: "Drifblim",
		itemUser: ["Drifblim"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1004,
		gen: 8,
		desc: "If held by a Drifblim, this item allows it to Mega Evolve in battle.",
	},
	heliolite: {
		name: "Heliolite",
		spritenum: 578,
		megaStone: "Heliolisk-Mega",
		megaEvolves: "Heliolisk",
		itemUser: ["Heliolisk"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1005,
		gen: 8,
		desc: "If held by a Heliolisk, this item allows it to Mega Evolve in battle.",
	},
	escavalite: {
		name: "Escavalite",
		spritenum: 578,
		megaStone: "Escavalier-Mega",
		megaEvolves: "Escavalier",
		itemUser: ["Escavalier"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1006,
		gen: 8,
		desc: "If held by an Escavalier, this item allows it to Mega Evolve in battle.",
	},
	haxorite: {
		name: "Haxorite",
		spritenum: 578,
		megaStone: "Haxorus-Mega",
		megaEvolves: "Haxorus",
		itemUser: ["Haxorus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1007,
		gen: 8,
		desc: "If held by a Haxorus, this item allows it to Mega Evolve in battle.",
	},
	mienshaonite: {
		name: "Mienshaonite",
		spritenum: 578,
		megaStone: "Mienshao-Mega",
		megaEvolves: "Mienshao",
		itemUser: ["Mienshao"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1008,
		gen: 8,
		desc: "If held by a Mienshao, this item allows it to Mega Evolve in battle.",
	},
	espeonite: {
		name: "Espeonite",
		spritenum: 578,
		megaStone: "Espeon-Mega",
		megaEvolves: "Espeon",
		itemUser: ["Espeon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1009,
		gen: 8,
		desc: "If held by an Espeon, this item allows it to Mega Evolve in battle.",
	},
	umbreonite: {
		name: "Umbreonite",
		spritenum: 578,
		megaStone: "Umbreon-Mega",
		megaEvolves: "Umbreon",
		itemUser: ["Umbreon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1010,
		gen: 8,
		desc: "If held by an Umbreon, this item allows it to Mega Evolve in battle.",
	},
	sylveonite: {
		name: "Sylveonite",
		spritenum: 578,
		megaStone: "Sylveon-Mega",
		megaEvolves: "Sylveon",
		itemUser: ["Sylveon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1011,
		gen: 8,
		desc: "If held by a Sylveon, this item allows it to Mega Evolve in battle.",
	},
	zangoosite: {
		name: "Zangoosite",
		spritenum: 578,
		megaStone: "Zangoose-Mega",
		megaEvolves: "Zangoose",
		itemUser: ["Zangoose"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1012,
		gen: 8,
		desc: "If held by a Zangoose, this item allows it to Mega Evolve in battle.",
	},
	seviperite: {
		name: "Seviperite",
		spritenum: 578,
		megaStone: "Seviper-Mega",
		megaEvolves: "Seviper",
		itemUser: ["Seviper"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1013,
		gen: 8,
		desc: "If held by a Seviper, this item allows it to Mega Evolve in battle.",
	},
	solrockite: {
		name: "Solrockite",
		spritenum: 578,
		megaStone: "Solrock-Mega",
		megaEvolves: "Solrock",
		itemUser: ["Solrock"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1014,
		gen: 8,
		desc: "If held by a Solrock, this item allows it to Mega Evolve in battle.",
	},
	quagsite: {
		name: "Quagsite",
		spritenum: 578,
		megaStone: "Quagsire-Mega",
		megaEvolves: "Quagsire",
		itemUser: ["Quagsire"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1015,
		gen: 8,
		desc: "If held by a Quagsire, this item allows it to Mega Evolve in battle.",
	},
	heatmorite: {
		name: "Heatmorite",
		spritenum: 578,
		megaStone: "Heatmor-Mega",
		megaEvolves: "Heatmor",
		itemUser: ["Heatmor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1016,
		gen: 8,
		desc: "If held by a Heatmor, this item allows it to Mega Evolve in battle.",
	},
	pangoronite: {
		name: "Pangoronite",
		spritenum: 578,
		megaStone: "Pangoro-Mega",
		megaEvolves: "Pangoro",
		itemUser: ["Pangoro"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1017,
		gen: 8,
		desc: "If held by a Pangoro, this item allows it to Mega Evolve in battle.",
	},
	jumpluffite: {
		name: "Jumpluffite",
		spritenum: 578,
		megaStone: "Jumpluff-Mega",
		megaEvolves: "Jumpluff",
		itemUser: ["Jumpluff"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1018,
		gen: 8,
		desc: "If held by a Jumpluff, this item allows it to Mega Evolve in battle.",
	},
	rhyperiorite: {
		name: "Rhyperiorite",
		spritenum: 578,
		megaStone: "Rhyperior-Mega",
		megaEvolves: "Rhyperior",
		itemUser: ["Rhyperior"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1019,
		gen: 8,
		desc: "If held by a Rhyperior, this item allows it to Mega Evolve in battle.",
	},
	florgesite: {
		name: "Florgesite",
		spritenum: 578,
		megaStone: "Florges-Mega",
		megaEvolves: "Florges",
		itemUser: ["Florges"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1020,
		gen: 8,
		desc: "If held by a Florges, this item allows it to Mega Evolve in battle.",
	},
	skarmorite: {
		name: "Skarmorite",
		spritenum: 578,
		megaStone: "Skarmory-Mega",
		megaEvolves: "Skarmory",
		itemUser: ["Skarmory"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1021,
		gen: 8,
		desc: "If held by a Skarmory, this item allows it to Mega Evolve in battle.",
	},
	druddigonite: {
		name: "Druddigonite",
		spritenum: 578,
		megaStone: "Druddigon-Mega",
		megaEvolves: "Druddigon",
		itemUser: ["Druddigon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1022,
		gen: 8,
		desc: "If held by a Druddigon, this item allows it to Mega Evolve in battle.",
	},
	chesnite: {
		name: "Chesnite",
		spritenum: 578,
		megaStone: "Chesnaught-Mega",
		megaEvolves: "Chesnaught",
		itemUser: ["Chesnaught"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1023,
		gen: 8,
		desc: "If held by a Chesnaught, this item allows it to Mega Evolve in battle.",
	},
	skuntankite: {
		name: "Skuntankite",
		spritenum: 578,
		megaStone: "Skuntank-Mega",
		megaEvolves: "Skuntank",
		itemUser: ["Skuntank"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1024,
		gen: 8,
		desc: "If held by a Skuntank, this item allows it to Mega Evolve in battle.",
	},
	emolganite: {
		name: "Emolganite",
		spritenum: 578,
		megaStone: "Emolga-Mega",
		megaEvolves: "Emolga",
		itemUser: ["Emolga"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1025,
		gen: 8,
		desc: "If held by an Emolga, this item allows it to Mega Evolve in battle.",
	},
	avaluggite: {
		name: "Avaluggite",
		spritenum: 578,
		megaStone: "Avalugg-Mega",
		megaEvolves: "Avalugg",
		itemUser: ["Avalugg"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1026,
		gen: 8,
		desc: "If held by an Avalugg, this item allows it to Mega Evolve in battle.",
	},
	laprasite: {
		name: "Laprasite",
		spritenum: 578,
		megaStone: "Lapras-Mega",
		megaEvolves: "Lapras",
		itemUser: ["Lapras"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1027,
		gen: 8,
		desc: "If held by a Lapras, this item allows it to Mega Evolve in battle.",
	},
	pyroarite: {
		name: "Pyroarite",
		spritenum: 578,
		megaStone: "Pyroar-Mega",
		megaEvolves: "Pyroar",
		itemUser: ["Pyroar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1028,
		gen: 8,
		desc: "If held by a Pyroar, this item allows it to Mega Evolve in battle.",
	},
	carbinite: {
		name: "Carbinite",
		spritenum: 578,
		megaStone: "Carbink-Mega",
		megaEvolves: "Carbink",
		itemUser: ["Carbink"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1029,
		gen: 8,
		desc: "If held by a Carbink, this item allows it to Mega Evolve in battle.",
	},
	hoopanite: {
		name: "Hoopanite",
		spritenum: 578,
		megaStone: "Hoopa-Mega",
		megaEvolves: "Hoopa",
		itemUser: ["Hoopa"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1030,
		gen: 8,
		desc: "If held by a Hoopa-Confined, this item allows it to Mega Evolve in battle.",
	},
};
