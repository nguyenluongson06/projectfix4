import TokenManager from './TokenManager';

const API_BASE_URL = 'http://localhost:8080/api/auth';

const AuthAPI = {
	/**
	 * Logs in a user by sending credentials to the server.
	 * @param {string} username - The user's username or email.
	 * @param {string} password - The user's password.
	 * @returns {Promise<Object>} - A promise that resolves to the response data or rejects with an error.
	 */
	login: async (username, password) => {
		try {
			const response = await fetch(`${API_BASE_URL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				// Parse error response and throw error
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to log in');
			}

			// Parse the response JSON to get the token
			const data = await response.text(); // Log the token for debugging

			return data; // Assuming the token is the direct response
		} catch (error) {
			console.error('Login Error:', error.message);
			throw error; // Re-throw for handling in the component
		}
	},

	/**
	 * Signs up a new user by sending user information to the server.
	 * @param {Object} userInfo - The user's information, e.g., { username, email, password }.
	 * @returns {Promise<Object>} - A promise that resolves to the response data or rejects with an error.
	 */
	signup: async (userInfo) => {
		try {
			const response = await fetch(`${API_BASE_URL}/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userInfo),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to sign up');
			}

			const data = await response.text();
			console.log(data);
			return data; // e.g., { message: "User created successfully", user }
		} catch (error) {
			// Re-throw for handling in the component
		}
	},

	getInfo: async () => {
		try {
			const token = TokenManager.getToken();
			if (!token || token.length === 0) {
				console.log('Token is empty: ' + token.toString());
			}
			const response = await fetch(`${API_BASE_URL}/info`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to get user info');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error getting user info:', error.message);
			throw error;
		}
	},
};

export default AuthAPI;
