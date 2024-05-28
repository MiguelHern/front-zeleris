//Obtener empleados
import {ref, onMounted, watch} from 'vue';

const API_BASE_URL = import.meta.env.VITE_MANAGER_API_URL;
const API_TEACHER_URL = import.meta.env.VITE_APP_API_URL;

import axios from 'axios';
//Obtener empleados

export const pendingPermissionCordination = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/documents/pending`, {
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
            console.log(data);
            return {data, success: true};
        } catch (jsonError) {
            return {error: jsonError, success: false};
        }
    } catch (error) {
        console.error('Error al obtener los documentos pendientes:', error);
        return {error, success: false};
    }
}

export function useEmployee(itemsPerPage = 10) {
    const employees = ref([]);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const page = ref(1);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/Employees`, {
                params: {
                    page: page.value,
                    itemsPerPage,
                },
            });
            const responseData = response.data;
            employees.value = responseData.data.dataEmployees;  // Ajustar la propiedad correctamente
            totalItems.value = responseData.data.totalItems;
            totalPages.value = responseData.data.totalPaginas;
            console.log(employees.value);
            console.log(totalItems.value);
            console.log(totalPages.value);
        } catch (error) {
            console.error('Error al obtener la información del empleado:', error);
        }
    };

    onMounted(fetchEmployees);

    // Volver a cargar empleados cuando la página cambie
    watch(page, fetchEmployees);

    return {
        employees,
        totalItems,
        totalPages,
        fetchEmployees,
        page,
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
                return {success: false, data: response.data};
            }

            console.log('Política editada con éxito:', response.data);
            return {success: true, data: response.data};
        } catch (error) {
            console.error('Error al editar la política:', error);
            return {success: false, data: error};
        }
    },
    deletePolice: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/admin/Policies/${id}`);

            if (!response.data || !response.data.success) {
                console.error('Error al eliminar la política:', response.data);
                return {success: false, data: response.data};
            }

            console.log('Política eliminada con éxito:', response.data);
            return {success: true, data: response.data};
        } catch (error) {
            console.error('Error al eliminar la política:', error);
            return {success: false, data: error};
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
                return {success: false, data: response.data};
            }

            console.log('Política eliminada con éxito:', response.data);
            return {success: true, data: response.data};
        } catch (error) {
            console.error('Error al eliminar la política:', error);
            return {success: false, data: error};
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
                return {success: false, data: response.data};
            }

            console.log('Política editada con éxito:', response.data);
            return {success: true, data: response.data};
        } catch (error) {
            console.error('Error al editar la política:', error);
            return {success: false, data: error};
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
            const response = await axios.patch(`${API_TEACHER_URL}/Documents/sign`, data, {
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

export const APISEMPLOYEES = {
    newEmployee: async (name, lastName, rol, quantityPermissions, matricula, dependencyId, email) => {
        const data = {
            name: name,
            lastName: lastName,
            rol: rol,
            quantityPermissions: quantityPermissions,
            matricula: matricula,
            dependencyId: dependencyId,
            email: email
        };
        try {
            const token = localStorage.token;
            const response = await axios.post(`${API_BASE_URL}/admin/Employees`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            console.error('Error al crear el empleado:', error);
            return {success: false, message: error.message}; // Devuelve un objeto de error en caso de fallo
        }
    },
    deleteEmployee: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/admin/Employees/${id}`);

            if (!response.data || !response.data.success) {
                console.error('Error al eliminar la política:', response.data);
                return {success: false, data: response.data};
            }

            console.log('Política eliminada con éxito:', response.data);
            return {success: true, data: response.data};
        } catch (error) {
            console.error('Error al eliminar la política:', error);
            return {success: false, data: error};
        }
    },
    editEmployee: async (idEmployee, name, lastName, quantityPermissions, signature, birthDate, dependencyId) => {
        const data = {
            idEmployee: idEmployee,
            name: name,
            lastName: lastName,
            quantityPermissions: quantityPermissions,
            signature: signature,
            birthDate: birthDate,
            dependencyId: dependencyId
        };
        try {
            const token = localStorage.token;
            const response = await axios.patch(`${API_BASE_URL}/admin/Employees/Update`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.data || !response.data.success) {
                console.error('Error al editar la política:', response.data);
                return {success: false, data: response.data};
            }

            console.log('Política editada con éxito:', response.data);
            return {success: true, data: response.data};
        } catch (error) {
            console.error('Error al editar la política:', error);
            return {success: false, data: error};
        }
    },
    changeRolEmployee: async (newRol, idEmployee, idDependency) => {
        const data = {
            newRol: newRol,
            idEmployee: idEmployee,
            idDependency: idDependency
        };
        try {
            const token = localStorage.token;
            const response = await axios.patch(`${API_BASE_URL}/admin/Employees/role`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.data || !response.data.success) {
                console.error('Error al editar la política:', response.data);
                return {success: false, data: response.data};
            }

            console.log('Política editada con éxito:', response.data);
            return {success: true, data: response.data};
        } catch (error) {
            console.error('Error al editar la política:', error);
            return {success: false, data: error};
        }
    },
}