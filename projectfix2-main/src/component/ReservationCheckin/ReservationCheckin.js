import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReservationAPI from '../api/Reservation';
import TokenManager from '../api/TokenManager';
import '../ReservationCheckin/ReservationCheckin.css'; // Add some styling if needed// Red cross

const ReservationCheckIn = () => {
	const navigate = useNavigate();
	const { reservationUuid } = useParams(); // Get the reservationUuid from URL params
	const [checkInStatus, setCheckInStatus] = useState('');
	const [statusIcon, setStatusIcon] = useState(null); // Icon for status feedback
	const [loading, setLoading] = useState(true); // Loading indicator

	const CheckIcon = () => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M20 6L9 17l-5-5'></path>
		</svg>
	);

	const CrossIcon = () => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<line x1='18' y1='6' x2='6' y2='18'></line>
			<line x1='6' y1='6' x2='18' y2='18'></line>
		</svg>
	);

	useEffect(() => {
		const handleCheckIn = async () => {
			const token = TokenManager.getToken();

			// If no token, redirect to login
			if (!token) {
				navigate('/login');
				return;
			}

			try {
				// Call the API to check in the reservation
				const response = await ReservationAPI.checkInReservation(
					reservationUuid,
				);

				// Update status and icon based on response
				if (response === 'Check-in successful.') {
					setCheckInStatus(response);
					setStatusIcon(<CheckIcon className='status-icon success' />);
				} else if (response === 'This ticket was used.') {
					setCheckInStatus(response);
					setStatusIcon(<CrossIcon className='status-icon error' />);
				}
			} catch (error) {
				// Handle API errors
				console.error('Check-in failed:', error.message || error);
				setCheckInStatus('An error occurred during check-in.');
				setStatusIcon(<CrossIcon className='status-icon error' />);
			} finally {
				setLoading(false); // Remove loading indicator
			}
		};

		handleCheckIn();
	}, [navigate, reservationUuid]);

	return (
		<div className='checkin-container'>
			<h1>Reservation Check-In</h1>
			{loading ? (
				<p>Processing check-in...</p>
			) : (
				<div className='checkin-status'>
					{statusIcon}
					<p>{checkInStatus}</p>
				</div>
			)}
		</div>
	);
};

export default ReservationCheckIn;
