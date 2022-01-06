import './Statblock.css';
import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { TaperedRule } from './Statblock';

function FormikTextInput({label, isProperty, ...props}) {
	const [field, meta] = useField(props);
	const Wrap = (props) => {
		if (props.isProperty)
			return <h4>{props.children}</h4>
		else
			return <h1>{props.children}</h1>
	}
	return (
		<>
			<Wrap isProperty={isProperty}>
				<label htmlFor={props.id || props.name}>{label}</label>
			</Wrap>
			<input className="text-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	);
}

function PropertyLineTextInput({label, first, last, ...props}) {
	const [field, meta] = useField(props);
	let cn = "property-line";
	if (first) cn += " first";
	if (last) cn += " last";
	return (
		<div className={cn}>
			<h4><label htmlFor={props.id || props.name}>{label} </label></h4>
			<p><input className='text-input' {...field} {...props} /></p>
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</div>
	);
}

function AbilityLineTextInput({label, ...props}) {
	const [field, meta] = useField(props);
	let cn = 'ability-';
	switch(label) {
	case 'STR': cn += "strength"; break;
	case 'DEX': cn += "dexterity"; break;
	case 'CON': cn += "constitution"; break;
	case 'INT': cn += "intelligence"; break;
	case 'WIS': cn += "wisdom"; break;
	case 'CHA': cn += "charisma"; break;
	default:
	}
	const sty = (meta.touched && meta.error)
		? {width: '50px', borderColor: 'red'}
		: {width: '50px'}
	return (
		<div className={cn}>
			<h4><label htmlFor={props.id || props.name}>{label} </label></h4>
			<p><input className='text-input' style={sty} {...field} {...props} /></p>
		</div>
	);
}

function SavingThrowList({ label, first, last, ...props }) {
	const [field, meta] = useField(props);
	const [lines] = useState([]);
	let cn = 'property-line'
	if (first) cn += ' first'
	if (last) cn += ' last'
	return (
		<div className={cn}>
			<h4><label htmlFor={props.id || props.name}>{label}</label></h4>
			<input type='button' onClick={()=>{}}>+</input>
			{lines.map((v, idx) => (
				<p key={idx}><div>
					<input type='text-input'></input>
				</div></p>	
			))}
			<input type='hidden' {...field} />
		</div>
	);
}

function FormikCheckbox({ children, ...props }) {
	const [field, meta] = useField({...props, type: 'checkbox'});
	return (
		<div>
			<h1><label className='checkbox-input'>
				<input type="checkbox" {...field} {...props} />
				{children}
			</label></h1>
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</div>
	);
}

function FormikSelect({label, ...props }) {
	const [field, meta] = useField(props);
	return (
		<>
			<h1><label htmlFor={props.id || props.name}>{label}</label></h1>
			<select {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</>
	);
}

function FormikSubSelect({label, hide, ...props}) {
	const [field, meta] = useField(props);
	const [isShowing, setShowing] = useState(false);
	return (
		<>
			<h1><label htmlFor={props.id || props.name}>{label}</label></h1>
			<select {...field} {...props} />
			<button type='button' onClick={()=>{setShowing(!isShowing);}}>{isShowing?'-':'+'}</button>
			{isShowing && hide}
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</>
	);
}

const OptList = (list) => {
	return (<>
		<option value='' />	
		{list.map(v => <option value={v} key={v}>{v.toUpperCase()}</option>)};
	</>);
}

export default function TextForm() {
	return (
		<Formik
			initialValues={{
				name: '',
				size: '',
				type: '',
				subtype: '',
				align: '',
				ac: 0,
				hp: 0,
				hitdie: '',
				spd: '',
				stats: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
				savingThrows: [],
				skills: [],
				senses: [],
				languages: [],
				cr: 0,
				features: [],
				actions: [],
				reactions: [],
				legendary: [],
			}}
			validationSchema={Yup.object({
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
						target: Yup.string(),
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
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 400);
			}}
		>
		{({ isSubmitting, touched, errors }) => (
			<Form>
				<div className="stat-block wide">
					<hr className='orange-border' />
					<div className='section-left'>
						<div className='creature-heading'>
							<FormikTextInput label='Name' name='name' placeholder='Name' />
							<FormikSelect label='Size' name='size'>{OptList(creatureSize)}</FormikSelect>
							<FormikSubSelect label='Type' name='type' hide={
								<FormikTextInput name='subtype' placeholder='Subtype' />
							}>{OptList(creatureTypes)}</FormikSubSelect>
							<FormikSelect label='Alignment' name='align'>{OptList(creatureAlign)}</FormikSelect>
						</div>
						<TaperedRule />
						<div className='top-stats'>
							<PropertyLineTextInput first label="Armor Class" name='ac' value={10} style={st.smallText} />
							<PropertyLineTextInput label="Hit Points" name='hp' style={st.smallText} />
							<PropertyLineTextInput label="Hit Die" name='hitdie' placeholder='1d8+4' style={{width: '100px'}} />
							<PropertyLineTextInput last label="Speed" name='spd' placeholder='30ft' style={{width: '150px'}} />
							<TaperedRule />
							<div className="abilities">
								<AbilityLineTextInput label='STR' name='stats.str' />
								<AbilityLineTextInput label='DEX' name='stats.dex' />
								<AbilityLineTextInput label='CON' name='stats.con' />
								<AbilityLineTextInput label='INT' name='stats.int' />
								<AbilityLineTextInput label='WIS' name='stats.wis' />
								<AbilityLineTextInput label='CHA' name='stats.cha' />
							</div>
							<TaperedRule />

						</div>
					</div>
					<div className='section-right'>

					</div>
					<hr className='orange-border bottom' />
				</div>
				<br />
				<button type="submit" disabled={isSubmitting}>Submit</button>
			</Form>
		)}
		</Formik>
	);
}

const st = {
	smallText: {
		width: '50px',
	},
};

const creatureSize = ['tiny', 'small', 'medium', 'large', 'huge', 'gargantuan'];

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