<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {APISEMPLOYEES} from "@/api/adminService.js";

const route = useRoute();
const id = ref(route.params.id)
const employees = ref([])
const noHistory = ref(false);


onMounted(() => {
    employeeHistory()
})

const employeeHistory = async () => {
    console.log(id.value)
    const resultado = await APISEMPLOYEES.employeeHistory(id.value);
    if (resultado.success) {
        employees.value = resultado.data.data
    } else {
        noHistory.value = true
        console.error('Error al buscar el empleado:', resultado.data);
    }
};

</script>

<template>
    <div class="p-4">
        <header class="mb-5">
            <h1>Historial de permisos de</h1>
        </header>
        <div v-show="noHistory" class="text-center display-1">
            <div>
                <i class="bi bi-file-earmark-excel-fill icono-tamaño"></i>
                <h4>Historial de permisos vacío</h4>
            </div>
        </div>
        <table class="table shadow-sm" v-show="!noHistory">
            <thead>
            <tr>
                <th scope="col" class="col-1">Firmado</th>
                <th scope="col" class="col-1">Sin Firma</th>
                <th scope="col" class="col-5">Motivo</th>
                <th scope="col" class="col-2 text-center">Día solicitado</th>
                <th scope="col" class="col-2 text-center">Fechas</th>
                <th scope="col" class="col-2 text-center">Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="employee in employees" :key="employee.id">
                <td class="text-lg-center align-content-center fw-bold text-body-secondary">
                    <i role="button" class="icono bi bi-file-earmark-arrow-down-fill"></i>
                </td>
                <td class="text-lg-center align-content-center fw-bold text-body-secondary">
                    <i role="button" class="icono bi bi-file-earmark-arrow-down-fill"></i>
                </td>
                <td class="align-content-center hoverTabla" style="max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    {{employee.employeeName}}
                </td>
                <td class="text-center align-content-center">
                    <!-- Día solicitado -->
                </td>
                <td class="text-center">
                    <!-- Fechas -->
                </td>
                <td class="text-center align-content-center">
                    <!-- Status -->
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>




<style scoped>
.pending {
    color: var(--bs-danger);
}

.approved {
    color: green;
}
.icono{
    transition: all 150ms ease-in-out;
}
.icono:hover{
    color: var(--secondary-color);
}
.icono-tamaño {
    font-size: 50px;
}

</style>