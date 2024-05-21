// src/composables/useEmployee.js
import { ref, onMounted } from 'vue';

export function useEmployee() {
    const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
    const employee = ref({});

    onMounted(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/Employees/id`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.token
                },
            });
            const data = await response.json();
            employee.value = data.data;
        } catch (error) {
            console.error('Error al obtener la información del empleado:', error);
        }
    });

    return {
        employee
    };
}
