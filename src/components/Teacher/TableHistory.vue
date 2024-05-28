<script setup>
import { onMounted, ref } from 'vue';
import { fetchDocumentHistory } from '@/api/teacherService.js';

const loading = ref(true);
const noHistory = ref(false);
const permissions = ref([]);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('es-ES')}`;
};

onMounted(async () => {
    const { data, success } = await fetchDocumentHistory();

    if (success) {
        permissions.value = data.data;
        if (data && data.success === false && data.message === "No leave history found for the specified employee.") {
            console.log("No hay historial de documentos pendientes en este momento.");
            noHistory.value = true;
        }
    } else {
        noHistory.value = true;
    }
    loading.value = false;
});
</script>

<template>
    <div v-show="!loading && noHistory" class="text-center display-1">
        <i class="bi bi-file-earmark-excel-fill "></i>
        <h1>Historial de permisos vacío</h1>
    </div>
    <table class="table shadow-sm" v-show="!loading && !noHistory">
        <thead>
        <tr>
            <th scope="col" class="col-auto"></th>
            <th scope="col" class="col-5">Motivo</th>
            <th scope="col" class="col-2 text-center">Día solicitado</th>
            <th scope="col" class="col-2 text-center">Fechas</th>
            <th scope="col" class="col-2 text-center">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="permission in permissions" :key="permission.id" class="align-content-center">
            <td class="text-lg-center align-content-center fw-bold text-body-secondary">
                <i class="bi bi-file-earmark-check-fill"></i>
            </td>
            <td class="align-content-center hoverTabla" style="max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{ permission.reason }}
            </td>
            <td class="text-center align-content-center">{{ formatDate(permission.createdDate) }}</td>
            <td class="text-center align-content-center">
                <ul>
                    <li v-for="dateRequest in permission.datesRequests" :key="dateRequest.id">
                        {{ dateRequest.requestDate }}
                    </li>
                </ul>
            </td>
            <td :class="{'pending': permission.status === 'Pendiente', 'approved': permission.status === 'aprobado'}" class="text-center align-content-center">{{ permission.status }}</td>
        </tr>
        </tbody>

    </table>
</template>

<style scoped>
.pending {
    color: var(--bs-danger);
}

.approved {
    color: green;
}

</style>