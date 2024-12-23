import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReservationAPI from '../api/Reservation';
import './ReservationProcess.css'; // Add styles for progress bar and checkmark if needed

export default function ReservationProcess() {
	const cart = useSelector((state) => state.cart); // Access the cart state
	const items = cart.ticket_list;

	const [progress, setProgress] = useState(0); // Track progress
	const [isCompleted, setIsCompleted] = useState(false); // Track completion
	const [error, setError] = useState(null); // Track errors
	const navigate = useNavigate();

	useEffect(() => {
		const createReservations = async () => {
			const totalTickets = items.reduce(
				(total, event) => total + event.tickets.length,
				0,
			);
			let completedTickets = 0;

			for (const event of items) {
				for (const ticket of event.tickets) {
					const reservationData = {
						ticketId: ticket.id,
						quantity: ticket.quantity || 1, // Ensure a quantity is provided
					};

					try {
						await ReservationAPI.createReservation(reservationData);
						completedTickets += 1;
						setProgress((completedTickets / totalTickets) * 100); // Update progress
					} catch (err) {
						setError(`Failed to create reservation for ticket ${ticket.id}`);
						console.error(err);
					}
				}
			}

			setIsCompleted(true); // Mark as completed
		};

		createReservations();
	}, [items]);

	return (
		<div className='reservation-process-container'>
			<div className='progress-container'>
				{!isCompleted ? (
					<>
						<div>Reservations are being processed...</div>
						<div className='progress-bar-wrapper'>
							<div
								className='progress-bar'
								style={{ width: `${progress}%` }}></div>
						</div>
					</>
				) : (
					<>
						<div className='checkmark'>✔</div>
						<div>All reservations have been processed successfully!</div>
					</>
				)}
			</div>
			{error && <div className='error-message'>{error}</div>}
			{isCompleted && (
				<button className='btn btn-primary mt-4' onClick={() => navigate('/')}>
					Back to Home
				</button>
			)}
		</div>
	);
}
