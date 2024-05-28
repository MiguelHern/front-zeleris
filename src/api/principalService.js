const API_BASE_URL = import.meta.env.VITE_MANAGER_API_URL;

export const usePendingPrincipal = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/director/documents/pending`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            },
        });
        if (!response.ok) {
            return {error: new Error('Respuesta no exitosa'), success: false};
        }
        const responseText = await response.text();
        try {
            const data = JSON.parse(responseText);
            console.log(data)
            return {data, success: true};
        } catch (jsonError) {
            return {error: jsonError, success: false};
        }
    } catch (error) {
        console.error('Error al obtener los documentos pendientes:', error);
        return {error, success: false};
    }
};