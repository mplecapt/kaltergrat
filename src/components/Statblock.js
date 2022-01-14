import "./Statblock.css";
import React from "react";
import { deserialize } from "./Editing";
import { useParams } from "react-router-dom";

export default function Statblock() {
	let { data } = useParams();
	if (data)
		data = deserialize(data);
	else
		data = staticdata;

	console.log(data);

	return (
		<div className="stat-block wide">
			<hr className="orange-border" />
			<div className="section-left">
				<div className="creature-heading">
					<h1>{data.name}</h1>
					<h2>{data.size} {data.type} {data.subtype && "(" + data.subtype + ")"}, {data.align}</h2>
				</div>
				<TaperedRule />
				<div className="top-stats">
					<PropertyLine first title="Armor Class" value={data.ac} />
					<PropertyLine title="Hit Points" value={`${data.hp} (${data.hitdie})`} />
					<PropertyLine last title="Speed" value={data.spd} />
					{data.stats && <>
					<TaperedRule />
					<div className="abilities">
						<AbilityLine title="STR" value={data.stats.str} />
						<AbilityLine title="DEX" value={data.stats.dex} />
						<AbilityLine title="CON" value={data.stats.con} />
						<AbilityLine title="INT" value={data.stats.int} />
						<AbilityLine title="WIS" value={data.stats.wis} />
						<AbilityLine title="CHA" value={data.stats.cha} />
					</div></>}
					{(data.savingThrows || data.skills || data.senses || data.languages || data.cr) && <TaperedRule />}
					{data.savingThrows && <PropertyLine first title="Saving Throws"
						value={(data.savingThrows.map(v=>`${v.name} ${showMod(v.val)}`)).join(', ')}
					/>}
					{data.skills && <PropertyLine title="Skills" 
						value={(data.skills.map(v=>`${v.name} ${showMod(v.val)}`)).join(', ')}
					/>}
					{data.senses && <PropertyLine title="Sense" value={(data.senses.map(v=>`${v.name} ${v.val}`)).join(', ')} />}
					{data.languages && <PropertyLine title="Languages" value={data.languages.map(v=>`${v.name}`).join(', ')} />}
					{data.cr && <PropertyLine last title="Challenge" value={`${data.cr} (${getXP(data.cr)} XP)`} />}
				</div>
				<TaperedRule />
				{data.features && data.features.map(feat => (
					<PropertyBlock title={feat.name} value={feat.val} />
				))}
			</div>
			<div className="section-right">
				{data.actions && data.actions.length > 0 && <ActionList title="Actions" list={data.actions} />}
				{data.reactions && data.reactions.length > 0 && <ActionList title="Reactions" list={data.reactions} />}
				{data.legendary && data.legendary.length > 0 && <ActionList title="Legendary Actions" list={data.legendary} />}
			</div>
			<hr className="orange-border bottom" />
		</div>
	);
}

function TaperedRule() {
	return (
		<svg height="5" width="100%" className="tapered-rule">
			<polyline points="0,0 400,2.5 0,5"></polyline>
		</svg>
	);
}

function AbilityLine({title, value}) {
	let cn = "ability-";
	switch (title) {
	case 'STR': cn += "strength"; break;
	case 'DEX': cn += "dexterity"; break;
	case 'CON': cn += "constitution"; break;
	case 'INT': cn += "intelligence"; break;
	case 'WIS': cn += "wisdom"; break;
	case 'CHA': cn += "charisma"; break;
	default:
	}
	return (
		<div className={cn}>
			<h4>{title}</h4>
			<p>{`${value} (${showMod(Math.floor((value - 10) / 2))})`}</p>
		</div>
	);
}

function PropertyLine({title, value, first, last}) {
	let cn = "property-line";
	if (first) cn += " first";
	if (last) cn += " last";
	return (
		<div className={cn}>
			<h4>{title} </h4>
			<p>{value}</p>
		</div>
	);
}

function PropertyBlock({title, value}) {
	return (
		<div className="property-block">
			<h4>{title}. </h4>
			{value}
		</div>
	);
}

function ActionList({title, list}) {
	return (
		<div className="actions">
			<h3>{title}</h3>
			{list.map((act, idx) => (
				<PropertyBlock key={idx} title={act.name} value={getAtk(act)} />
			))}
		</div>
	);
}

const showMod = m => `${m >= 0 ? '+' : ''}${m}`; 

const getXP = cr => {
	return '100';
};

const getAtk = a => {
	const atk = a.atk;
	return (
		<p>
			{atk &&
				<><i>{atk.type} Weapon Attack:</i> {showMod(atk.toHit)} to hit, reach {atk.reach}ft., {atk.target} target. <i>Hit:</i> {atk.dmg} {atk.dmgType} damage. </>
			}
			{a.val}
		</p>
	);
};

export { TaperedRule };

const staticdata = {
	name: 'Rose',
	size: 'Medium',
	type: 'humanoid',
	subtype: 'human',
	align: 'lawful neutral',
	
	ac: 18,
	hp: 120,
	hitdie: '16d8+48',
	spd: '30ft, fly 30ft',
	stats: {
		str: 16,
		dex: 10,
		con: 14,
		int: 10,
		wis: 10,
		cha: 14,
	},
	savingThrows: [
		{name: 'Str', val: 5},
		{name: 'Con', val: 4},
	],
	skills: [
		{name: 'Athletics', val: 5},
		{name: 'Persuasion', val: 6},
	],
	senses: [
		{name: 'Passive Perception', val: 12},
	],
	languages: [
		{name: 'Common'},
		{name: 'Sylvan'},
	],
	cr: 6,
	features: [
		{name: 'Special Equipment', val: 'Rose wears winged boots.'},
		{name: 'Legendary Resistance (1/Day)', val: 'If Rose fails a saving throw, she can shoose to succeed instead.'},
		{name: 'Charger', val: 'If Rose moves at least 20ft in a straightline towards a creature and then lands a lance attack, deal an additional 6 (1d12) piercing damage and make a DC 14 Strength saving throw or be knocked prone.'},
		{name: 'Saddle Master', val: 'Lorem ipsem'},
	],
	actions: [
		{name: 'Multiattack', val: 'Rose makes three attacks.'},
		{name: 'Lance', val: 'Rose has disadvantage on this attack if she isn\'t mounted.', atk: {
			type: 'Melee',
			toHit: 7,
			reach: 10,
			target: 'one',
			dmg: '1d12+4',
			dmgType: 'piercing',
		}},
		{name: 'Longsword', atk: {
			type: 'Melee',
			toHit: 7,
			reach: 5, 
			target: 'one',
			dmg: '1d8+4',
			dmgType: 'slashing',
		}},
		{name: 'Longbow', atk: {
			type: 'Ranged',
			toHit: 7,
			reach: '150/600',
			target: 'one',
			dmg: '1d8+4',
			dmgType: 'piercing',
		}},
	],
	reactions: [
		{name: 'Warding Maneuvers', val: 'Lorem ipsem'},
	],
	legendary: [
		{name: 'Legendary Actions (1/Turn)', val: 'Lorem ipsem'},
		{name: 'Move', val: 'Rose moves up to her speed.'},
		{name: 'Weapon Attack', val: 'Rose makes a weapon attack.'}
	],
};