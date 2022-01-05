import React, { useState } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { createProduct } from '../graphql/mutations';

export default function TestForm() {
	const [form, setForm] = useState(null);

	const handleSubmit = async () => {
		try {
			// get values;
			const value = await form.getValue();
			const response = await API.graphql(
				graphqlOperation(createProduct, {
					input: {
						name: value.name,
						price: value.price.toFixed(2),
						description: value.description,
					},
				}),
			);
			console.log(response);
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<div>
			<form name="testForm" ref={(c)=>setForm(c)}>
				<label for="ProductName">Product Name</label>
				<input type="text" name="ProductName" />
				<label for="Desc">Description</label>
				<input type="text" name="Desc" />
				<label for="Price">Price</label>
				<input type="text" name="Price" />
				<label for="uname">Username</label>
				<input type="text" name="uname" />
				<input type="button" onClick={handleSubmit} name="submit">Submit</input>
			</form>
		</div>
	);
}