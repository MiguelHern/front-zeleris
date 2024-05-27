import axios from 'axios';

export default class DependencyService {
    constructor() {
        this.apiURL = import.meta.env.VITE_MANAGER_API_URL;
    }

    async getDependencies() {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get(`${this.apiURL}/admin/dependencies`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    handleError(error) {
        if (error.response) {
            console.error('Server error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Network error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
}
