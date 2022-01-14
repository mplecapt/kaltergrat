import './App.css';
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import Statblock from './components/Statblock';
import CreatureForm, { ShareLink } from './components/Editing';
import Modal from './components/Modal';

function App() {
	const location = useLocation();
	let state = location.state;

	return (
		<div>
			<Routes location={state?.backgroundLocation || location}>
				<Route path="/kaltergrat">
					<Route index element={<Navigate to='/kaltergrat/create' />} />
					<Route path="create" element={<CreatureForm />} />
					<Route path="edit/:data" element={<CreatureForm />} />
					<Route path="view/:data" element={<Statblock />} />
				</Route>
				<Route path="*" element={<h1>:404</h1>} />
			</Routes>
			{state?.backgroundLocation && (
				<Routes>
					<Route path="/" element={<Modal background={state.backgroundLocation} />}>
						<Route path="share/:link" element={<ShareLink />} />
					</Route>
				</Routes>
			)}
		</div>
	);
}

export default App;
