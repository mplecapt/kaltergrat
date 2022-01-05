import './App.css';
import { Link, Outlet } from "react-router-dom";

function App() {
	return (
		<div>
			<h1>Kaltergrat</h1>
			<nav style={{
					borderBottom: "solid 1px",
					paddingBottom: "1rem"
				}}
			>
				<Link to="/kaltergrat/statblock">Statblock</Link> | {" "}
				<Link to="/kaltergrat/testing">Testing</Link>
			</nav>
			<Outlet />
		</div>
	);
}

export default App;
