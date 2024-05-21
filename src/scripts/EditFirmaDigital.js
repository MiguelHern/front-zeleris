import axios from 'axios';

export default class EditFirmaDigital {
    constructor() {
        this.apiURL = import.meta.env.VITE_APP_API_URL;
    }

    async editarFirma(signatureBase64, token) {
        try {
            const response = await axios.patch(`${this.apiURL}/Employees`, {
                signatureBase64: signatureBase64,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al realizar la petición:', error);
            throw error;
        }
    }
}