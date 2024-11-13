import axios from 'axios';

const API_URL = 'http://localhost:8080/api';  // Base URL for API requests

class AuthService {
  // Login function to authenticate the user
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/authenticate`, {
        username,
        password
      });
      
      // Save the JWT token to local storage if login is successful
      if (response.data && response.data.jwt) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      throw new Error('Invalid username or password');
    }
  }

  // Logout function to remove the user from local storage
  logout() {
    localStorage.removeItem('user');
  }

  // Register function to create a new user
  async register(username, password) {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data || 'Registration failed');
    }
  }

  // Get current user from local storage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Helper function to get JWT token
  getJwtToken() {
    const user = this.getCurrentUser();
    return user ? user.jwt : null;
  }
}

export default new AuthService();
