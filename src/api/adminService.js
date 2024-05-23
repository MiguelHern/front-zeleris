//Obtener empleados
import { ref, onMounted } from 'vue';
const API_BASE_URL = import.meta.env.VITE_MANAGER_API_URL;
import axios from 'axios';

export function useEmployee() {
    const employees = ref({});

    onMounted(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/Employees`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.token
                },
            });
            const data = await response.json();
            employees.value = data.data;
            console.log(employees.value)
        } catch (error) {
            console.error('Error al obtener la información del empleado:', error);
        }
    });
    return {
        employees
    };
}
//Crear nuevos empleados

//Eliminar empleados
export async function deleteEmployee(employeeId) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/admin/Employees/${employeeId}`);
        return response.data; // Puedes devolver datos adicionales si lo necesitas
    } catch (error) {
        throw new Error('Error deleting employee'); // Maneja el error según tu lógica de aplicación
    }
}


//Políticas

export const APIS = {
//Crear políticas
    newPolice: async (description, createdDate) => {

        const data = {
            description: description,
            createdDate: createdDate,
        };

        const token = localStorage.token;

        const response = await fetch(`${import.meta.env.VITE_MANAGER_API_URL}/admin/Policies`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log(response)
    },
//Modificar políticas
    editPolice: async (id, description) => {
        const data = {
            id: id,
            description: description,
        };

        const token = localStorage.token;

        try {
            const response = await fetch(`${import.meta.env.VITE_MANAGER_API_URL}/admin/Policies/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error al editar la política:', errorData);
                return { success: false, data: errorData };
            }

            const responseData = await response.json();
            return { success: true, data: responseData };
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            return { success: false, data: error };
        }
    },
    //Eliminar políticas
    deletePolice: async (id) => {
        const token = localStorage.token;

        try {
            const response = await fetch(`${import.meta.env.VITE_MANAGER_API_URL}/admin/Policies/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error al eliminar la política:', errorData);
                return { success: false, data: errorData };
            }

            const responseData = await response.json();
            return { success: true, data: responseData };
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            return { success: false, data: error };
        }
    }

}
