import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	async function logIn() {
		try {
			await signInWithEmailAndPassword(getAuth(), email, password);
			navigate("/articles");
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<>
			<h1>Welcome to the login page</h1>
			{error && <p className="error">{error}</p>}
			<input
				type="text"
				placeholder="Your Email Address"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={logIn}>Login</button>
			<Link to="/create-account">Don't have an account? Create One here!</Link>
		</>
	);
}
