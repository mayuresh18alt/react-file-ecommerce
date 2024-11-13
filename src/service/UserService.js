// UserService.js
// UserService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Change this to your backend URL

const UserService = {
    /**
     * Registers a new user.
     * @param {Object} user - The user details for registration.
     * @param {string} user.email - The user's email address.
     * @param {string} user.pwd - The user's password.
     * @param {string} user.name - The user's name.
     * @returns {Promise<Object>} Response data from the server.
     */
    registerUser: async (user) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, user, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error("An error occurred during registration:", error);
            throw error;
        }
    },

    /**
     * Gets user details after login.
     * Assumes the user is authenticated (e.g., JWT token is present in headers).
     * @returns {Promise<Object>} The authenticated user's details.
     */
    getUserDetailsAfterLogin: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user`, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error("An error occurred while fetching user details:", error);
            throw error;
        }
    }
};

export default UserService;
