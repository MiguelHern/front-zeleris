import { ref, onMounted } from 'vue';
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
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
            console.log(employee.value)
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
    const load = ref(true);
    const noPendingDocuments = ref(false);
    const PendingDocuments = ref([]);
    const fetchPendingDocuments = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/Documents/pending`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.token
                },
            });
            const data = await response.json();
            PendingDocuments.value = data.data;
            console.log(data);
            if (data && data.success === false && data.message === "No Pending Document") {
                console.log("No hay documentos pendientes en este momento.");
                noPendingDocuments.value = true;
            }
        } catch (error) {
            console.error('Error al obtener los documentos pendientes:', error);
        } finally {
            load.value = false;
        }
    };
    onMounted(fetchPendingDocuments);
    return {
        load,
        noPendingDocuments,
        PendingDocuments,
    };
};
//Employee history
export const fetchDocumentHistory = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/Documents/history`, {
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


