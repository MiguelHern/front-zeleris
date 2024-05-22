//Políces
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
export const allPolices = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/Polices`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            },
        });
        const data = await response.json();
        return { data, success: true };
    } catch (error) {
        console.error('Error al obtener los documentos pendientes:', error);
        return { error, success: false };
    }
};
