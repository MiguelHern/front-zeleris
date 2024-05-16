<script setup>
import { onMounted, ref } from 'vue';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
const loading = ref(true);
const noPendingDocuments = ref(false);
const permissions = ref([]);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('es-ES')}`;
};

onMounted(async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/Documents/pending`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            },
        });
        const data = await response.json();
        permissions.value = data.data;
        console.log(data)
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
            <th scope="col" class="col-2 text-center">Fechas solicitadas</th>
            <th scope="col" class="col-2 text-center">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="permission in permissions" :key="permission.id" class="align-content-center">
            <td class="text-lg-center align-content-center fw-bold text-body-secondary">
                <i class="bi bi-file-earmark-check-fill"></i>
            </td>
            <td class="align-content-center ">
                <span>{{ permission.employeeName }}</span>
                <span>{{ permission.employeeLastName }}</span>
            </td>
            <td class="align-content-center text-center">{{ permission.quantityDays }}</td>
            <td class="text-center">
                <span v-for="(permitDate, index) in permission.permitDates" :key="index">
                    {{ formatDate(permitDate.requestDate) }}
                    <div v-if="index < permission.permitDates.length - 1"></div>
                </span>
            </td>
            <td class="text-center align-content-center text-danger">Pendiente</td>
        </tr>
        </tbody>
    </table>
</template>


<style scoped>

</style>