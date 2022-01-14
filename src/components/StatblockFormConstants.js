import * as Yup from 'yup';

const creatureSize = [
	'tiny', 
	'small', 
	'medium', 
	'large', 
	'huge', 
	'gargantuan'
];

const creatureAlign = [
	'lawful good',
	'lawful neutral',
	'lawful evil',
	'neutral good',
	'neutral',
	'neutral evil',
	'chaotic good',
	'chaotic neutral',
	'chaotic evil',
];

const damageTypes = [
	'slashing',
	'piercing',
	'bludgeoning',
	'poison',
	'acid',
	'fire',
	'cold',
	'radiant',
	'necrotic',
	'lightning',
	'thunder',
	'force',
	'psychic',
];

const creatureTypes = [
	'aberration',
	'beast',
	'celestial',
	'construct',
	'dragon',
	'elemental',
	'fey',
	'fiend',
	'giant',
	'humanoid',
	'monstrosity',
	'ooze',
	'plant',
	'undead',
];

const targetTypes = [
	'single',
	'self',
	'cone',
	'sphere',
	'cube',
	'cylindar',
	'line',
];

const atkTypes = ['melee', 'ranged', 'magic'];

const newCreatureInitialValues = {
	name: '',
	size: '',
	type: '',
	subtype: '',
	align: '',
	ac: 10,
	hp: 0,
	hitdie: '',
	spd: '',
	stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
	savingThrows: [],
	skills: [],
	senses: [],
	languages: [],
	cr: 1,
	features: [],
	actions: [],
	reactions: [],
	legendary: [],
};

const atkActionInit = {
	type: atkTypes[0],
	toHit: 0, 
	reach: 0, 
	target: targetTypes[0], 
	dmg: '', 
	dmgType: damageTypes[0],
};

const formSchema = Yup.object({
	name: Yup.string().required('Required'),
	size: Yup.string()
		.oneOf(creatureSize, 'Invalid size')
		.required('Required'),
	type: Yup.string()
		.oneOf(creatureTypes, 'Invalid creature type')
		.required('Required'),
	subtype: Yup.string(),
	align: Yup.string()
		.oneOf(creatureAlign, 'Invalid alignment')
		.required('Required'),
	ac: Yup.number()
		.integer('Must be an integer')
		.min(0, 'Must be positive')
		.required('Required'),
	hp: Yup.number().integer('Must be an integer').required('Required'),
	hitdie: Yup.string()
		.matches(/^\d+d\d+(\+\d+)*$/, 'Invalid format (ie: 1d6+2)')
		.required('Required'),
	spd: Yup.string().required('Required'),
	stats: Yup.object({
		str: Yup.number().integer().min(0).required('Required'),
		dex: Yup.number().integer().min(0).required('Required'),
		con: Yup.number().integer().min(0).required('Required'),
		int: Yup.number().integer().min(0).required('Required'),
		wis: Yup.number().integer().min(0).required('Required'),
		cha: Yup.number().integer().min(0).required('Required'),
	}),
	savingThrows: Yup.array().of(Yup.object({
		name: Yup.string(),
		val: Yup.string(),
	})),
	skils: Yup.array().of(Yup.object({
		name: Yup.string(),
		val: Yup.string(),
	})),
	senses: Yup.array().of(Yup.object({
		name: Yup.string(),
		val: Yup.string(),
	})),
	languages: Yup.array().of(Yup.object({
		name: Yup.string(),
		val: Yup.string(),
	})),
	cr: Yup.number().integer('Must be an integer').min(0, 'Must be >= 0').required('Required'),
	features: Yup.array().of(Yup.object({
		name: Yup.string(),
		val: Yup.string(),
	})),
	actions: Yup.array().of(Yup.object({
		name: Yup.string(),
		val: Yup.string(),
		atk: Yup.object({
			type: Yup.string(),
			toHit: Yup.number().integer(),
			reach: Yup.number().integer(),
			target: Yup.string().oneOf(targetTypes),
			dmg: Yup.string().matches(/^\d+d\d+(\+\d+)*$/, 'Invalid format (ie: 1d6+2)'),
			dmgType: Yup.string().oneOf(damageTypes),
		}),
	})),
	reactions: Yup.array().of(Yup.object({
		name: Yup.string(),
		val: Yup.string(),
	})),
	legendary: Yup.array().of(Yup.object({
		name: Yup.string(),
		val: Yup.string(),
	})),
});

export { newCreatureInitialValues, atkActionInit, atkTypes, formSchema, creatureAlign, creatureSize, creatureTypes, targetTypes, damageTypes }