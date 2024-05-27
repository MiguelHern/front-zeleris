//Obtener empleados
import { ref, onMounted } from 'vue';
const API_BASE_URL = import.meta.env.VITE_MANAGER_API_URL;
const API_TEACHER_URL = import.meta.env.VITE_APP_API_URL;

import axios from 'axios';
//Obtener empleados

export function useEmployee() {
    const employees = ref([]);
    onMounted(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/Employees`);
            employees.value = response.data.data;
            console.log(employees.value);
        } catch (error) {
            console.error('Error al obtener la información del empleado:', error);
        }
    });
    return {
        employees,
    };
}

export const useDependencies = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/Dependencies`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            },
        });
        if (!response.ok) {
            return { error: new Error('Respuesta no exitosa'), success: false };
        }
        const responseText = await response.text();
        try {
            const data = JSON.parse(responseText);
            console.log(data)
            return { data, success: true };
        } catch (jsonError) {
            return { error: jsonError, success: false };
        }
    } catch (error) {
        console.error('Error al obtener los documentos pendientes:', error);
        return { error, success: false };
    }
};
//Eliminar empleados
export async function deleteEmployee(employeeId) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/admin/Employees/${employeeId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting employee');
    }
}


//Políticas

export const APIS = {
    newPolice: async (description, createdDate) => {
        const data = {
            description: description,
            createdDate: createdDate,
        };
        try {
            const token = localStorage.token;
            const response = await axios.post(`${API_BASE_URL}/admin/Policies`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        } catch (error) {
            console.error('Error al crear la política:', error);
        }
    },
    editPolice: async (id, description) => {
        const data = {
            id: id,
            description: description,
        };

        try {
            const token = localStorage.token;
            const response = await axios.put(`${API_BASE_URL}/admin/Policies/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.data || !response.data.success) {
                console.error('Error al editar la política:', response.data);
                return { success: false, data: response.data };
            }

            console.log('Política editada con éxito:', response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Error al editar la política:', error);
            return { success: false, data: error };
        }
    },
    deletePolice: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/admin/Policies/${id}`);

            if (!response.data || !response.data.success) {
                console.error('Error al eliminar la política:', response.data);
                return { success: false, data: response.data };
            }

            console.log('Política eliminada con éxito:', response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Error al eliminar la política:', error);
            return { success: false, data: error };
        }
    }
};

export const APISDEPENDENCE = {
    newDependence: async (name, phone, employeeId) => {
        const data = {
            name: name,
            phone: phone,
            employeeId: employeeId
        };
        try {
            const token = localStorage.token;
            const response = await axios.post(`${API_BASE_URL}/admin/Dependencies`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        } catch (error) {
            console.error('Error al crear la la dependencia:', error);
        }
    },
    deleteDependence: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/admin/Dependencies/${id}`);

            if (!response.data || !response.data.success) {
                console.error('Error al eliminar la política:', response.data);
                return { success: false, data: response.data };
            }

            console.log('Política eliminada con éxito:', response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Error al eliminar la política:', error);
            return { success: false, data: error };
        }
    },
    editDependence: async (id, name, phone, employeeId) => {
        const data = {
            name: name,
            phone: phone,
            employeeId: employeeId
        };
        try {
            const token = localStorage.token;
            const response = await axios.put(`${API_BASE_URL}/admin/Dependencies/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.data || !response.data.success) {
                console.error('Error al editar la política:', response.data);
                return { success: false, data: response.data };
            }

            console.log('Política editada con éxito:', response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Error al editar la política:', error);
            return { success: false, data: error };
        }
    },
}
export const APISPERMIT = {
    signPermit: async (imageBase64, documentPermitId) => {
        const data = {
            imageBase64: imageBase64,
            documentPermitId: documentPermitId,
        };
        try {
            const token = localStorage.token;
            const response = await axios.post(`${API_TEACHER_URL}/Documents/sign`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        } catch (error) {
            console.error('Error a firmar el permiso:', error);
        }
    },
}