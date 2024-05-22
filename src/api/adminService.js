//Obtener empleados
import { ref, onMounted } from 'vue';
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
export function useEmployee() {
    const employees = ref({});

    onMounted(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/Employees`, {
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