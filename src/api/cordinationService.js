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

export const APIS = {

    uploadDesign: async (employeeId, documentPermitId) => {

        const data = {
            employeeId: employeeId,
            documentPermitId: documentPermitId,
        };

        const token = localStorage.token;

        const response = await fetch(`${import.meta.env.VITE_MANAGER_API_URL}/Signed`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log(response.data)
    }

}