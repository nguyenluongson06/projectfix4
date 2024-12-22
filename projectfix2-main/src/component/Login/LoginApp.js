import React, { useState } from 'react';
import '../css/login.css';
import AuthAPI from '../api/Auth.js';
import TokenManager from '../api/TokenManager.js';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		setErrorMessage(''); // Clear any existing error message

		try {
			const token = await AuthAPI.login(username, password); // Call AuthAPI
			// Save token to localStorage using TokenManager for future requests
			TokenManager.setToken(token);
			alert('Login successful!');
			// Redirect user to the home page or dashboard
			window.location.href = '/';
		} catch (error) {
			// Display error message to user
			setErrorMessage(
				error.response?.data?.message || 'Login failed. Please try again.',
			);
		}
	};

	return (
		<div className='login-container'>
			<div className='login-card'>
				<h1 className='login-title'>Account Login</h1>
				<p className='login-description'>
					If you are already a member, you can login with your user name and
					password.
				</p>

				<form className='login-form' onSubmit={handleLogin}>
					<label htmlFor='enter-username' className='form-label'>
						Username
					</label>
					<input
						id='enter-username-login-id'
						type='text'
						placeholder='Enter your username'
						className='form-input'
						value={username}
						onChange={(e) => setUsername(e.target.value)} // Update user name state
						required
					/>

					<label htmlFor='enter-password' className='form-label'>
						Password
					</label>
					<input
						id='enter-password-login-id'
						type='password'
						placeholder='Enter your password'
						className='form-input'
						value={password}
						onChange={(e) => setPassword(e.target.value)} // Update password state
						required
					/>

					<div className='remember-me'>
						<input type='checkbox' id='remember_id' />
						<label htmlFor='remember_id'>Remember me</label>
					</div>

					{errorMessage && <p className='error-message'>{errorMessage}</p>}
					{/* Display error message if any */}

					<button id='login_button_id' className='login-button' type='submit'>
						Login
					</button>
				</form>

				<div className='signup-prompt'>
					<span>Don't have an account? </span>
					<a href='/signup' className='signup-link'>
						Sign up here
					</a>
				</div>
			</div>
		</div>
	);
}
