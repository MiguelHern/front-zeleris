const API_BASE_URL = import.meta.env.VITE_MANAGER_API_URL;

export const allPolices = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/Policies`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            },
        });

        if (!response.ok) {
            // La respuesta no es un éxito (código de estado HTTP fuera del rango 200-299)
            console.error('Error al obtener los documentos pendientes: Respuesta no exitosa', response.status, response.statusText);
            return { error: new Error('Respuesta no exitosa'), success: false };
        }

        const responseText = await response.text();
        try {
            const data = JSON.parse(responseText);
            console.log(data)
            return { data, success: true };
        } catch (jsonError) {
            console.error('Error al parsear JSON:', jsonError, 'Respuesta recibida:', responseText);
            return { error: jsonError, success: false };
        }
    } catch (error) {
        console.error('Error al obtener los documentos pendientes:', error);
        return { error, success: false };
    }
};

