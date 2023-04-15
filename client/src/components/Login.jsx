import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// import { useDarkMode } from '../contexts/DarkModeProvider';
import { useAuth } from '../contexts/AuthProvider';

export default function Login() {
	const { setAuth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const emailRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [email, password]);

	function handleSubmit(e) {
		e.preventDefault();
		console.log('form sub');
		// communicate with server?

		setAuth({
			state: true,
			userID: '',
			password: '',
			refreshToken: '',
			accessToken: '',
		});
		setEmail('');
		setPassword('');

		navigate(from, { replace: true });
	}

	return (
		<section className="flex h-full flex-col justify-center">
			<div className="flex flex-col items-center justify-center gap-1">
				<p
					ref={errRef}
					className={errMsg ? '' : 'hidden'}
					aria-live="assertive"
				>
					{errMsg}
				</p>
				<span className="text-2xl">LOGIN PAGE</span>
				<form className="flex flex-col gap-1 " onSubmit={handleSubmit}>
					<label htmlFor="email">Email:</label>
					<input
						className="input-bordered input input-sm w-80 "
						id="email"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						ref={emailRef}
						autoComplete="off"
					/>

					<label htmlFor="password">Password:</label>
					<input
						className="input-bordered input input-sm w-80"
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<button className="btn-sm btn mb-3 mt-3" type="submit">
						Login
					</button>
				</form>
				<p className="flex justify-between gap-10">
					<span>Need an Account?</span>
					<span>
						<Link className="link-primary link" to="/register">
							Sign Up
						</Link>
					</span>
				</p>
			</div>
		</section>
	);
}
