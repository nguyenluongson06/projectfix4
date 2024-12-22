import { memo, useContext, useEffect, useState } from 'react';
import './navbar.css';
import AuthAPI from '../api/Auth';
import { UserContext } from '../context/UserContext';
import TokenManager from '../api/TokenManager';

const Navbar = () => {
	const { user, setUser } = useContext(UserContext); // Use global state for user info
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchUserInfo = async () => {
			const token = TokenManager.getToken(); // Retrieve the token from localStorage
			if (token) {
				try {
					const userInfo = await AuthAPI.getInfo();
					setUser(userInfo); // Save user info to global state
				} catch (error) {
					console.error('Error fetching user info:', error);
					// Optional: Handle token expiration or invalid token
				}
			}
			setIsLoading(false);
		};

		fetchUserInfo();
	}, [setUser]);

	return (
		<header style={{ width: '100%', height: 90, top: 0, display: 'flex' }}>
			<a className='icon-logo-class' href='/'>
				{/* SVG Logo */}
				<svg
					width='136'
					height='35'
					viewBox='0 0 136 35'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M24.6697 7.11704C24.6697 7.13139 24.6697 7.13139 24.6697 7.14574C24.311 7.13139 23.9523 7.11704 23.5649 7.11704H12.5161L14.0515 5.59605C15.4577 4.17551 17.0074 2.86975 18.801 2.86975C20.609 2.86975 22.1587 4.17551 23.5649 5.59605L24.3684 6.39959C24.5693 6.58613 24.6697 6.84441 24.6697 7.11704Z'
						fill='white'
					/>
					{/* Other paths omitted for brevity */}
				</svg>
			</a>

			<nav className='navbar-class'>
				<ul>
					<li>
						<a href='/music'>Music</a>
					</li>
					<li>
						<a href='/sport'>Sports</a>
					</li>
					<li>
						<a href='/stageandart'>Stage and Art</a>
					</li>
					<li>
						<a href='/talkshow'>Talkshow</a>
					</li>
					<li>
						<a href='/cart'>My Tickets</a>
					</li>
				</ul>
			</nav>

			{isLoading ? (
				<div>Loading...</div> // Show a loading indicator while fetching user info
			) : user ? (
				<div className='user-info'>
					<span className='text-white'>Welcome, {user.fullName}!</span>
				</div>
			) : (
				<a href='/login'>
					<button id='btn-login-id'>Login</button>
				</a>
			)}
		</header>
	);
};

export default memo(Navbar);
