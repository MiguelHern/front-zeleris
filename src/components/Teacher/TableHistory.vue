<script setup>
import { onMounted, ref } from 'vue';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
const loading = ref(true);
const noPendingDocuments = ref(false);
const permissions = ref([]);


onMounted(async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/Documents/history`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            },
        });
        const data = await response.json();
        permissions.value = data.data;
        console.log(data)
        if (data && data.success === false && data.message === "No History") {
            console.log("No hay historial de documentos pendientes en este momento.");
            noPendingDocuments.value = true;
        }
    } catch (error) {
        console.error('Error al obtener los documentos pendientes:', error);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <table class="table shadow-sm">
        <thead>
        <tr>
            <th scope="col" class="col-auto"></th>
            <th scope="col" class="col-5">Nombre</th>
            <th scope="col" class="col-2 text-center">Días solicitados</th>
            <th scope="col" class="col-2 text-center">Fechas</th>
            <th scope="col" class="col-2 text-center">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr class="align-content-center">
            <td class="text-lg-center align-content-center fw-bold text-body-secondary">
                <i class="bi bi-file-earmark-check-fill"></i>
            </td>
            <td class="align-content-center hoverTabla"></td>
            <td class="text-center align-content-center"></td>
            <td class="text-center align-content-center"><span></span><span></span> <span></span></td>
            <td class="text-center align-content-center"></td>
        </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>