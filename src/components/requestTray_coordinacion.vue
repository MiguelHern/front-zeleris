<script setup>

import { ref, onMounted, watchEffect } from 'vue';
import { fetchPendingPermissions, fetchDocumentDetails } from '@/api/cordinationService.js';

const loading = ref(false);
const pendingPermissions = ref({ data: [] });
const selectedDocumentId = ref(null);
const documentDetails = ref(null);
const formattedCreatedDate = ref(null); // Variable para almacenar la fecha formateada

onMounted(async () => {
    try {
        const response = await fetchPendingPermissions();
        pendingPermissions.value = response;
        console.log('Permisos pendientes:', pendingPermissions.value);
    } catch (error) {
        console.error('Error al obtener los permisos pendientes:', error);
    }
});

// Watcher para observar cambios en pendingPermissions
watchEffect(() => {
    console.log('Nuevos permisos pendientes:', pendingPermissions.value);
});

// Función para obtener el ID del documento al hacer clic en la fila
const getDocumentId = async (id) => {
    loading.value = true;
    console.log('ID del documento:', id);
    selectedDocumentId.value = id;
    try {
        const documentDetailsResponse = await fetchDocumentDetails(id);
        documentDetails.value = documentDetailsResponse;
        console.log('Detalles del documento:', documentDetails.value);

        // Formatear la fecha de creación después de obtenerla
        const createdDate = new Date(documentDetails.value.data.createdDate);
        formattedCreatedDate.value = createdDate.toLocaleDateString(); // Puedes ajustar el formato según tus preferencias
    } catch (error) {
        console.error('Error al obtener los detalles del documento:', error);
    }finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class=" w-100">
        <div class="d-flex h-100 w-100 p-2">
            <div class="over w-25 overflow-x-auto bca">
                <header class="bandeja__header pt-2 pb-2">
                    <h1 class="fs-3">
                        Bandeja de solicitudes
                    </h1>
                </header>
                <table class=" table shadow-sm ">
                    <thead>
                    <tr class="bg-danger">
                        <th scope="col" class="col-4">Nombre</th>
                        <th scope="col" class="col-1">Número de empleado</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr role="button" v-for="permission in pendingPermissions.data" :key="permission.id" class="tr__permission" @click="getDocumentId(permission.id)">
                        <td class="td__permission align-content-center ">
                            {{ permission.name }} {{ permission.lastName }}
                        </td>
                        <td class="td__permission align-content-center">
                            <span>{{ permission.id }}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class=" w-75 p-4" v-if="documentDetails">
                <div class="bc p-3 shadow">
                    <div class="header__document">
                        <h1 class="document__title">
                            Solicitud de <span>{{ documentDetails.data.employee }}</span>
                        </h1>
                    </div>
                    <div class="main d-flex flex-column mt-2 gap-2 w-100">
                        <div class="data__container d-flex">
                           <h5 class="col-4">Fecha de solicitud</h5><h5>{{ formattedCreatedDate }}</h5>
                        </div>
                        <div class="data__container d-flex">
                            <h5 class="col-4">Cantidad de días solicitados </h5><h5>{{ documentDetails.data.quantityDays }}</h5>
                        </div>
                        <div class="data__container">
                            <h5 class="col-4">Días solicitados</h5>
                            <span v-for="date in documentDetails.data.permitDates" :key="date" class="days">{{ date }}</span>
                        </div>
                        <div class="data__container d-flex">
                            <h5 class="col-4">Motivo </h5><p class="text-wrap">{{ documentDetails.data.reason }}</p>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <div class="w-50">
                                <label for="file">Firmar documento</label>
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    class="form-control"
                                    accept="image/*"
                                    data-browse="Seleccionar archivo"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div v-if="loading" class="loading-overlay">
                <div class="spinner"></div>
            </div>
        </div>
    </div>
</template>



<style scoped>
.bandeja__header{
    text-align: center;
    background-color: var(--principal-color);
    color: white;
}

.data__container{
    padding: 3px 0;
    border-bottom: 1px solid hsl(0, 0%, 94%);
}
.over{
    height: calc(100vh - 70px);
}
.bca{
    border-right: 1px solid var(--principal-color);
}
.td__permission{
    transition: all 150ms ease;
}
.tr__permission:hover .td__permission{
    background-color: var(--grayy)!important;
}
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid #ffffff;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

