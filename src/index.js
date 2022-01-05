import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import Statblock from './components/Statblock.js';
import TestForm from './components/Testing';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/kaltergrat" element={<App />}>
					<Route path="statblock" element={<Statblock />} />
					<Route path="testing" element={<TestForm />} />
				</Route>
				<Route path="*" element={<h1>:404</h1>} />
			</Routes>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
