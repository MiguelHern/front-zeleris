import { ref, onMounted } from 'vue';
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
//Employee information
export function useEmployee() {
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
//Employee pending permissions
export const usePendingDocuments = () => {
    const loading = ref(true);
    const noPendingDocuments = ref(false);
    const permissions = ref([]);

    const fetchPendingDocuments = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/Documents/pending`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.token
                },
            });
            const data = await response.json();
            permissions.value = data.data;
            console.log(data);
            if (data && data.success === false && data.message === "No Pending Document") {
                console.log("No hay documentos pendientes en este momento.");
                noPendingDocuments.value = true;
            }
        } catch (error) {
            console.error('Error al obtener los documentos pendientes:', error);
        } finally {
            loading.value = false;
        }
    };

    onMounted(fetchPendingDocuments);

    return {
        loading,
        noPendingDocuments,
        permissions
    };
};


