import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/signin.css';
import AuthAPI from '../api/Auth';

export default function SignIn() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		fullName: '',
		tel: '',
		address: '',
	});
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate passwords match
		if (formData.password !== formData.confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		// Prepare user object for the API call
		const userInfo = {
			username: formData.username,
			password: formData.password,
			email: formData.email,
			fullname: formData.fullName,
			tel: formData.tel,
			address: formData.address,
		};

		try {
			// Call the signup API
			const result = await AuthAPI.signup(userInfo);

			if (result.includes('successfully')) {
				// If successful, show success message and redirect to login
				setSuccessMessage('Registration successful! Redirecting to login...');
				setErrorMessage('');
				setTimeout(() => {
					navigate('/login');
				}, 2000);
			}
		} catch (error) {
			// Handle errors
			console.error('Signup Error:', error);
			setErrorMessage(
				error.message || 'Registration failed. Please try again later.',
			);
		}
	};

	return (
		<div className='signin-container'>
			<div className='signin-card'>
				<h1 className='signin-title'>Create an Account</h1>
				<p className='signin-description'>
					Join us today to enjoy exclusive offers and manage your bookings.
				</p>
				{successMessage && <p className='success-message'>{successMessage}</p>}
				{errorMessage && <p className='error-message'>{errorMessage}</p>}
				<form className='signin-form' onSubmit={handleSubmit}>
					<label htmlFor='username' className='form-label'>
						Username
					</label>
					<input
						id='username'
						name='username'
						type='text'
						placeholder='Enter your username'
						className='form-input'
						value={formData.username}
						onChange={handleChange}
						required
					/>

					<label htmlFor='email' className='form-label'>
						Email Address
					</label>
					<input
						id='email'
						name='email'
						type='email'
						placeholder='Enter your email'
						className='form-input'
						value={formData.email}
						onChange={handleChange}
						required
					/>

					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						id='password'
						name='password'
						type='password'
						placeholder='Enter your password'
						className='form-input'
						value={formData.password}
						onChange={handleChange}
						required
					/>

					<label htmlFor='confirmPassword' className='form-label'>
						Confirm Password
					</label>
					<input
						id='confirmPassword'
						name='confirmPassword'
						type='password'
						placeholder='Confirm your password'
						className='form-input'
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>

					<label htmlFor='fullName' className='form-label'>
						Full Name
					</label>
					<input
						id='fullName'
						name='fullName'
						type='text'
						placeholder='Enter your name'
						className='form-input'
						value={formData.fullName}
						onChange={handleChange}
						required
					/>

					<label htmlFor='tel' className='form-label'>
						Phone Number
					</label>
					<input
						id='tel'
						name='tel'
						type='tel'
						placeholder='Enter your phone number'
						className='form-input'
						value={formData.tel}
						onChange={handleChange}
						required
					/>

					<label htmlFor='address' className='form-label'>
						Address
					</label>
					<input
						id='address'
						name='address'
						type='text'
						placeholder='Enter your address'
						className='form-input'
						value={formData.address}
						onChange={handleChange}
						required
					/>

					<button type='submit' className='signin-button'>
						Create Account
					</button>
				</form>
				<div className='login-prompt'>
					<span>Already have an account? </span>
					<a href='/login' className='login-link'>
						Login here
					</a>
				</div>
			</div>
		</div>
	);
}
