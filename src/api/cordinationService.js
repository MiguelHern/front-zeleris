import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_MANAGER_API_URL;
export async function fetchPendingPermissions() {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`${API_BASE_URL}/coordination/pending/permissions`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los permisos pendientes de coordinación: ' + error.message);
    }
}
export async function fetchDocumentDetails(documentId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/Documents/${documentId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los detalles del documento: ' + error.message);
    }
}