<script setup>
import { usePendingDocuments } from '@/api/teacherService.js';

const { loading, noPendingDocuments, permissions } = usePendingDocuments();

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('es-ES')}`;
};
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