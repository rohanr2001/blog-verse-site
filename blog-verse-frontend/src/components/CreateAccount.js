import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

export default function CreateAccount() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

    async function createAccount(){
        try{
            if(password !== confirmPassword){
                setError('Password and confirm password do not match')
                return
            }
            await createUserWithEmailAndPassword(getAuth(), email, password)
            navigate('/articles')
        }
        catch(err){
            setError(err.message)
        }
    }

	return (
		<>
			<h1>Create Account</h1>
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
			<input
				type="password"
				placeholder="Re-Enter your Password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>
			<button onClick={createAccount}>Create Account</button>
			<Link to="/login">Already Have an Account ? Login here</Link>
		</>
	);
}
