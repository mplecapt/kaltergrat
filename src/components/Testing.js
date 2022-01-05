import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

function FormikTextInput({label, ...props}) {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className="text-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	);
}

function FormikCheckbox({ children, ...props }) {
	const [field, meta] = useField({...props, type: 'checkbox'});
	return (
		<div>
			<label className='checkbox-input'>
				<input type="checkbox" {...field} {...props} />
				{children}
			</label>
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</div>
	);
}

function FormikSelect({label, ...props }) {
	const [field, meta] = useField(props);
	return (
		<div>
			<label htmlFor={props.id || props.name}>{label}</label>
			<select {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</div>
	);
}

export default function TextForm() {
	return (
		<Formik
			initialValues={{
				name: '',
				size: '',
				type: '',
				subtype: '',
				alignment: '',
				acceptedTerms: false,
			}}
			validationSchema={Yup.object({
				name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
				size: Yup.string()
					.oneOf(
						['tiny', 'small', 'medium', 'large', 'huge', 'gargantuan'],
						'Invalid size'
					)
					.required('Required'),
				type: Yup.string().required('Required'),
				subtype: Yup.string(),
				alignment: Yup.string().required('Required'),
				acceptedTerms: Yup.boolean().required('Required').oneOf([true], 'You must accept the terms and conditions.'),
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 400);
			}}
		>
			<Form>
				<h1>Testing!</h1>
				<FormikTextInput label="Name" name="name" type="text" placeholder="Rose" />
				<FormikSelect label="Size" name="size">
					<option value="">Select a size</option>
					<option value="tiny">Tiny</option>
					<option value="small">Small</option>
					<option value="medium">Medium</option>
					<option value="large">Large</option>
					<option value="huge">Huge</option>
					<option value="gargantuan">Gargantuan</option>
				</FormikSelect>
				<FormikTextInput label="Type" name="type" type="text" placeholder="Humanoid" />
				<FormikTextInput label="Subtype" name="subtype" type="text" placeholder="Human" />
				<FormikSelect label="Alignment" name="alignment">
					<option value="">Select an alignemnt</option>
					<option value="neutral">Neutral</option>
					<option value="lawful good">Lawful Good</option>
					<option value="chaotic evil">Chaotic Evil</option>
				</FormikSelect>
				<FormikCheckbox name="acceptedTerms">I accept the terms and conditions</FormikCheckbox>

				<button type="submit">Submit</button>
			</Form>
		</Formik>
	);
}