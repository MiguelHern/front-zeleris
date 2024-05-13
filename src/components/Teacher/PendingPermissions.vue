<script setup>
import { onMounted, ref } from 'vue';

const loading = ref(true);
const noPendingDocuments = ref(false);

onMounted(async () => {
    try {
        const response = await fetch('https://service-teacher-zeleris.onrender.com/Documents/pending', {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            },
        });
        const data = await response.json();
        if (data && data.success === false && data.message === "No Pending Document") {
            console.log("No hay documentos pendientes en este momento.");
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
    <div v-show="!loading && noPendingDocuments" class="text-center display-1">
        <i class="bi bi-file-earmark-excel-fill "></i>
        <h1>No hay documentos pendientes</h1>
    </div>
    <table class="table shadow-sm" v-show="!loading && !noPendingDocuments">
        <thead>
        <tr>
            <th scope="col" class="col-auto"></th>
            <th scope="col" class="col-5">Nombre</th>
            <th scope="col" class="col-2 text-center">Días solicitados</th>
            <th scope="col" class="col-2 text-center">Fecha</th>
            <th scope="col" class="col-2 text-center">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr class="align-content-center">
            <td class="text-lg-center align-content-center fw-bold text-body-secondary">
                <i class="bi bi-file-earmark-check-fill"></i>
            </td>
            <td class="align-content-center hoverTabla"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
        </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>