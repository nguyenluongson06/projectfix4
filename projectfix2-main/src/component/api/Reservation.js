import axios from 'axios';
import TokenManager from './TokenManager';

const API_BASE_URL = 'http://localhost:8080/api/reservations';

const ReservationAPI = {
	/**
	 * Create a new reservation.
	 * @param {Object} reservationData - Data for the reservation to create.
	 * @returns {Promise<Object>} - The created reservation data.
	 */
	createReservation: async (reservationData) => {
		try {
			const token = TokenManager.getToken(); // Retrieve token
			const response = await fetch('http://localhost:8080/api/reservations/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`, // Include token
				},
				body: JSON.stringify(reservationData),
			});
	
			if (!response.ok) {
				// Handle non-200 responses
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to create reservation');
			}
	
			return await response.json(); // Parse JSON response
		} catch (error) {
			console.error('Error creating reservation:', error.message || error);
			throw error;
		}
	},
	

	/**
	 * Fetch the list of all reservations.
	 * @returns {Promise<Array>} - A list of reservation data.
	 */
	getReservations: async () => {
		try {
			const token = TokenManager.getToken();
			const response = await fetch(`${API_BASE_URL}/list`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response);
			return response.data;
		} catch (error) {
			console.error(
				'Error fetching reservations:',
				error.response?.data || error.message,
			);
			if (error.response?.status === 401) {
				throw new Error('Unauthorized: Please log in to view reservations.');
			}
			if (error.response?.status === 500) {
				throw new Error('Internal Server Error: Unable to fetch reservations.');
			}
			throw error;
		}
	},

	/**
	 * Update an existing reservation.
	 * @param {Object} reservationData - Updated reservation data.
	 * @returns {Promise<Object>} - The updated reservation data.
	 */
	updateReservation: async (reservationData) => {
		try {
			const response = await axios.put(
				`${API_BASE_URL}/update`,
				reservationData,
			);
			return response.data;
		} catch (error) {
			console.error(
				'Error updating reservation:',
				error.response?.data || error.message,
			);
			if (error.response?.status === 404) {
				throw new Error('Not Found: Reservation does not exist.');
			}
			if (error.response?.status === 500) {
				throw new Error('Internal Server Error: Unable to update reservation.');
			}
			throw error;
		}
	},

	/**
	 * Delete a reservation.
	 * @param {string} uuid - The UUID of the reservation to delete.
	 * @returns {Promise<string>} - Success message.
	 */
	deleteReservation: async (uuid) => {
		try {
			const response = await axios.delete(`${API_BASE_URL}/delete`, {
				params: { uuid },
			});
			return response.data;
		} catch (error) {
			console.error(
				'Error deleting reservation:',
				error.response?.data || error.message,
			);
			if (error.response?.status === 404) {
				throw new Error('Not Found: Reservation does not exist.');
			}
			if (error.response?.status === 500) {
				throw new Error('Internal Server Error: Unable to delete reservation.');
			}
			throw error;
		}
	},

	/**
	 * Check-in a reservation.
	 * @param {string} reservationUuid - The UUID of the reservation to check in.
	 * @returns {Promise<string>} - Check-in status message.
	 */
	checkInReservation: async (reservationUuid) => {
		try {
			const response = await axios.get(
				`${API_BASE_URL}/checkin/${reservationUuid}`,
			);
			return response.data;
		} catch (error) {
			console.error(
				'Error during reservation check-in:',
				error.response?.data || error.message,
			);
			if (error.response?.status === 401) {
				throw new Error('Unauthorized: Please log in to check in.');
			}
			if (error.response?.status === 404) {
				throw new Error('Not Found: Reservation does not exist.');
			}
			throw error;
		}
	},
};

export default ReservationAPI;
