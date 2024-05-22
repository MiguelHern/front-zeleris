import axios from 'axios';

export default class PerfilEmployees {
    
    constructor() {
        this.apiURL = import.meta.env.VITE_APP_API_URL;
    }

    async perEmployees() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${this.apiURL}/Employees/id`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
            });
            return response.data;
        } catch (error) {
            console.error('Error al realizar la petición:', error);
            throw error;
        }
    }
}