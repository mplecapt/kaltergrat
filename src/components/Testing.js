import './Statblock.css';
import React, { useState } from 'react';
import { Formik, Form, useField, FieldArray } from 'formik';
import { TaperedRule } from './Statblock';
import { newCreatureInitialValues, formSchema, creatureAlign, creatureSize, creatureTypes, targetTypes, damageTypes, atkActionInit, atkTypes } from './StatblockFormConstants';

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
			<input className="text-input" {...field} {...props} 
				style={meta.touched && meta.error ? st.error : null}
			/>
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
			<p><input className='text-input' {...field} {...props}
				style={meta.touched && meta.error ? { ...props.style, ...st.error} : props.style}
			/></p>
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

function FormikSelect({label, ...props }) {
	const [field, meta] = useField(props);
	return (
		<>
			{label && <h1><label htmlFor={props.id || props.name}>{label}</label></h1>}
			<select {...field} {...props} 
				style={meta.touched && meta.error ? st.error : null}
			/>
		</>
	);
}

function FormikSubSelect({label, hide, ...props}) {
	const [isShowing, setShowing] = useState(false);
	return (
		<>
			<FormikSelect label={label} {...props} />
			<button type='button' onClick={()=>{setShowing(!isShowing);}}>{isShowing?'-':'+'}</button>
			{isShowing && hide}
		</>
	);
}

const OptList = (list, blank) => {
	return (<>
		{blank && <option value=''>{blank}</option>}
		{list.map(v => <option value={v} key={v}>{v.toUpperCase()}</option>)};
	</>);
}

function AttackInput({name}) {
	return (
		<div>
			<FormikSelect name={`${name}.atk.type`}>{OptList(atkTypes)}</FormikSelect>
			<PropertyLineTextInput name={`${name}.atk.toHit`} label='To Hit: ' style={st.smallText} />
			<PropertyLineTextInput name={`${name}.atk.reach`} label='Reach: ' style={st.smallText} />
			<FormikSelect name={`${name}.atk.target`}>{OptList(targetTypes)}</FormikSelect>
			<PropertyLineTextInput name={`${name}.atk.dmg`} placeholder='2d4+2' style={{width: '150px'}} />
			<FormikSelect name={`${name}.atk.dmgType`}>{OptList(damageTypes)}</FormikSelect>
		</div>
	);
}

function PropertyBlockInput({name, canBeAnAttack, list, idx, ...props}) {
	const [field1] = useField(`${name}.name`);
	const [field2] = useField(`${name}.val`);
	const [showAtk, setShowAtk] = useState(false);

	return (
		<div className='property-block'>
			<h4><input type='text-input' {...field1} placeholder='Name' /></h4>
			<p><textarea {...field2} placeholder='Description...' /></p>
			{canBeAnAttack && (<>
				{showAtk ? (<>
					<button type='button' onClick={()=>{
						setShowAtk(false);
						delete list[idx].atk;
					}}> ^ </button>
					<AttackInput name={name} />
				</>) : (
					<button type='button' onClick={()=>{
						list[idx].atk = atkActionInit;
						setShowAtk(true);
					}}>Is an attack</button>
				)}
			</>)}
		</div>
	)
}

function CategoryList({label, list, canBeAnAttack, ...props}) {
	return (
		<div className='actions'>
			{label && <h3><label htmlFor={props.id || props.name}>{label}</label></h3>}
			<FieldArray
				name={props.name}
				render={arrayHelpers => (
					<>
						{list && list.length > 0 ? (
							list.map((f, index) => (
								<div key={index}>
									<PropertyBlockInput list={list} idx={index} canBeAnAttack={canBeAnAttack} name={`${props.name}[${index}]`} />
									<button type='button' onClick={()=>{arrayHelpers.remove(index)}}> - </button>
									<button type='button' onClick={()=>{arrayHelpers.insert(index+1, {name:'', val:''});}}> + </button>
								</div>
							))
						) : (
							<button type='button' onClick={()=>{arrayHelpers.push({name:'', val:''});}}> + </button>
						)}
					</>
				)}
			/>
		</div>
	)
}

function InlineDoubleText({name, style1, style2, placeholder1, placeholder2, addLine, subLine, ...props}) {
	const [nameField] = useField(`${name}.name`);
	const [descField] = useField(`${name}.val`);
	return (
		<div className='property-line'>
			<input type='text' {...nameField} placeholder={placeholder1} style={style1 ? style1 : {width: '100px'}} />
			<input type='text' {...descField} placeholder={placeholder2} style={style2 ? style2 : {width: '75px'}} />
			<button type='button' onClick={subLine}> - </button>
			<button type='button' onClick={addLine}> + </button>
		</div>
	)
}

function PropertyList({label, list, first, last, simple, ...props}) {
	let cn = 'property-line';
	if (first) cn += ' first';
	if (last) cn += ' last';
	return (
		<div className={cn}>
			{label && <h4><label htmlFor={props.id || props.name}>{label}</label></h4>}
			<FieldArray 
				name={props.name}
				render={helper => (<>
					{list && list.length > 0 ? (
						list.map((f, index) => (<div key={index}>
							{!simple
								? <InlineDoubleText name={`${props.name}[${index}]`} 
									placeholder1='Name' 
									placeholder2='Value'
									subLine={()=>{helper.remove(index)}}
									addLine={()=>{helper.insert(index + 1, {name:'', val:''})}}
								  />
								: <div className='property-line'>
									<PropertyLineTextInput name={`${props.name}[${index}]`} placeholder='Common' />
									<button type='button' onClick={()=>{helper.remove(index)}}> - </button>
									<button type='button' onClick={()=>{helper.insert(index + 1, {name:''})}}> + </button>
								  </div>
							}
						</div>))
					) : (
						<button type='button' onClick={()=>{helper.push({name:'', val:''})}}> + </button>
					)}
				</>)}
			/>
		</div>
	);
}

export default function TextForm() {
	return (
		<Formik
			initialValues={newCreatureInitialValues}
			validationSchema={formSchema}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					let succ = JSON.stringify(values, null, 2);
					alert(succ !== undefined ? 'Success' : 'Failure');
					console.log(succ);
					setSubmitting(false);
				}, 400);
			}}
		>
		{({ isSubmitting, values }) => (
			<Form>
				<div className="stat-block wide">
					<hr className='orange-border' />
					<div className='section-left'>
						<div className='creature-heading'>
							<FormikTextInput label='Name' name='name' placeholder='Name' />
							<FormikSelect name='size'>{OptList(creatureSize, "Size...")}</FormikSelect>
							<FormikSubSelect name='type' hide={
								<FormikTextInput name='subtype' placeholder='Subtype...' />
							}>{OptList(creatureTypes, "Creature Type...")}</FormikSubSelect>
							<FormikSelect name='align'>{OptList(creatureAlign, "Alignment...")}</FormikSelect>
						</div>
						<TaperedRule />
						<div className='top-stats'>
							<PropertyLineTextInput first label="Armor Class" name='ac' placeholder="10" style={st.smallText} />
							<PropertyLineTextInput label="Hit Points" name='hp' style={st.smallText} />
							<PropertyLineTextInput label="Hit Die" name='hitdie' placeholder='1d8+4' style={{width: '100px'}} />
							<PropertyLineTextInput last label="Speed" name='spd' placeholder='30ft, fly 60ft' style={{width: '150px'}} />
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
							<PropertyList label='Saving Throws  ' list={values.savingThrows} name='savingThrows' first />
							<PropertyList label='Skills  ' list={values.skills} name='skills' />
							<PropertyList label='Senses  ' list={values.senses} name='senses' />
							<PropertyList label='Languages  ' list={values.languages} name='languages' simple last />
							<PropertyLineTextInput last label="Challenge" name="cr" style={st.smallText} />
						</div>
					</div>
					<div className='section-right'>
						<CategoryList label='Features' list={values.features} name='features' />
						<CategoryList label='Actions' list={values.actions} name='actions' canBeAnAttack />
						<CategoryList label='Reactions' list={values.reactions} name='reactions' />
						<CategoryList label='Legendary Actions' list={values.legendary} name='legendary' />
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
	error: {
		borderColor: 'red'
	}
};