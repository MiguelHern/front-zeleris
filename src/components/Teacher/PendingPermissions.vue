<script setup>
import { usePendingDocuments } from '@/api/teacherService.js';
const { load, noPendingDocuments, PendingDocuments } = usePendingDocuments();
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('es-ES')}`;
};
</script>


<template>
    <div v-show="!load && noPendingDocuments" class="text-center display-1">

        <i class="bi bi-file-earmark-excel-fill "></i>
        <h1>No hay documentos pendientes</h1>
    </div>
    <table class="table shadow-sm" v-show="!load && !noPendingDocuments">
        <thead>
        <tr>
            <th scope="col" class="col-auto"></th>
            <th scope="col" class="col-5">Motivo</th>
            <th scope="col" class="col-2 text-center">Días solicitados</th>
            <th scope="col" class="col-2 text-center">Fechas solicitadas</th>
            <th scope="col" class="col-2 text-center">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="PendingDocument in PendingDocuments" :key="PendingDocument.id" class="align-content-center">
            <td class="text-lg-center align-content-center fw-bold text-body-secondary">
                <i class="bi bi-file-earmark-check-fill"></i>
            </td>
            <td class="align-content-center">
                <span>{{ PendingDocument.reason }}</span>
            </td>
            <td class="align-content-center text-center">{{ PendingDocument.quantityDays }}</td>
            <td class="text-center">
                <h5 v-for="date in PendingDocument.datesRequests" :key="date.id" class="fs-6">
                    {{ new Date(date.requestDate).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
                </h5>
            </td>
            <td class="dropdown align-content-center text-center text-danger">
                <a class="btn btn-default dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ PendingDocument.status }}
                </a>
                <ul class="dropdown-menu">
                    <li>
                        <span class="dropdown-item text-success" v-if="PendingDocument.signed.coordinador">Coordinador: Firmado</span>
                        <span class="dropdown-item text-danger" v-else>Coordinador: No firmado</span>
                    </li>
                    <li>
                        <span class="dropdown-item text-success" v-if="PendingDocument.signed.coordinadorAdmin">Coordinador Administrativo: Firmado</span>
                        <span class="dropdown-item text-danger" v-else>Coordinador Administrativo: No firmado</span>
                    </li>
                    <li>
                        <span class="dropdown-item text-success" v-if="PendingDocument.signed.director">Director: Firmado</span>
                        <span class="dropdown-item text-danger" v-else>Director: No firmado</span>
                    </li>
                </ul>
            </td>
        </tr>

        </tbody>
    </table>
</template>


<style scoped>

</style>