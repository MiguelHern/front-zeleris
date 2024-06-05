<script setup>
import {onMounted, ref} from 'vue';
import {pendingPermissionAdmin} from '@/api/adminService.js';

const pending = ref({});
const loading = ref(true);
const loading2 = ref(false)
const error = ref(null);
const loadingDocumentDetails = ref(false);
const loadPending = async () => {
    loading.value = true;
    const {data, success, error: fetchError} = await pendingPermissionAdmin();
    if (success) {
        pending.value = data;
        loading.value = false;
    } else {
        console.error('Error al obtener los permisos pendientes:', fetchError);
        error.value = fetchError;
        loading.value = false;
    }
};

const getDocumentId = async (id) => {
    loadingDocuments.value[id] = true;
    selectedDocumentId.value = id;
    loadingDocumentDetails.value = true;
    try {
        const documentDetailsResponse = await fetchDocumentDetails(id);
        documentDetails.value = documentDetailsResponse;
        file.value = documentDetails.value.data.file;
        const createdDate = new Date(documentDetails.value.data.createdDate);
        formattedCreatedDate.value = createdDate.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    } catch (error) {
        console.error('Error al obtener los detalles del documento:', error);
    } finally {
        loadingDocumentDetails.value = false;
        loadingDocuments.value[id] = false;
    }
};

const downloadFile = () => {
    const link = document.createElement('a');
    link.href = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${file.value}`;
    link.download = 'document.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            imageBase64 = reader.result.split(',')[1];
        };
    }
};

const handleCheckboxChange = () => {
    if (isCheckboxChecked.value) {
        imageBase64 = null;
    }
};

const signPermit = async () => {
    loading2.value = true;
    if (!imageBase64 && isCheckboxChecked.value === false) {
        errorMessage.value = true;
        return;
    }
    try {
        if (isCheckboxChecked.value) {
            imageBase64 = null;
        }
        const response = await APISPERMIT.signPermit(imageBase64, selectedDocumentId.value);
        errorMessage.value = false;
        console.log('Documento firmado con éxito:', response);
        loading2.value = false;

        // Mostrar alerta de éxito
        await Swal.fire({
            icon: 'success',
            title: '¡Firma exitosa!',
            text: 'El documento se ha firmado correctamente.',
            showConfirmButton: false,
            timer: 2500 // Cerrar automáticamente después de 2 segundos
        });

    } catch (error) {
        console.error('Error al firmar el permiso:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Error al firmar',
            text: 'Hubo un error al firmar el documento. Por favor, inténtalo de nuevo más tarde.',
        });
    } finally {
        loading2.value = false;
    }
};


onMounted(async () => {
    await loadPending();
});
import {fetchPendingPermissions, fetchDocumentDetails} from '@/api/cordinationService.js';
import {APISPERMIT} from "@/api/adminService.js";
import Swal from "sweetalert2";

const loadingDocuments = ref({});
const pendingPermissions = ref({data: []});
const selectedDocumentId = ref(null);
const documentDetails = ref(null);
const formattedCreatedDate = ref(null);
const file = ref("");
let imageBase64 = '';
const errorMessage = ref(false);
const isCheckboxChecked = ref(false);

onMounted(async () => {
    loading.value = true;
    try {
        const response = await fetchPendingPermissions();
        pendingPermissions.value = response;
    } catch (error) {
    } finally {
        loading.value = false;
    }
});


</script>


<template>
    <div class="w-100">
        <div v-if="loading2" class="loading-overlay">
            <div class="spinner"></div>
        </div>
        <div class="d-flex h-100 w-100 p-2 gap-2">
            <section class="bandeja col-3 card p-3">
                <header class="bandeja__title mb-2">
                    <h1 class="fs-3">Bandeja de solicitudes</h1>
                </header>
                <i v-if="loading" class="c-inline-spinner"></i>
                <div class="solicitudes__cards d-flex flex-column gap-3 navbar-nav-scroll">
                    <div class="solicitudes__card p-1" role="button"
                         v-for="permission in pending.data" :key="permission.id"
                         @click="getDocumentId(permission.id)"
                    >
                        <h3 class="fs-6 mb-2">
                            <h4 class="fs-6">{{ permission.employee.coordination }}</h4>

                        </h3>
                        <div class="card__email d-flex align-items-center gap-2">
                            {{ permission.employee.name }}
                            <i v-if="loadingDocuments[permission.id]" class="c-inline-spinner"></i>
                        </div>
                    </div>
                </div>
            </section>
            <div class="d-flex flex-column align-items-center justify-content-center display-1 w-75"
                 v-if="!documentDetails">
                <i class="bi bi-card-text"></i>
                <h2 class="text-center">Seleccione un permiso pendiente <br> para visualizar su información</h2>
            </div>
            <section class="w-75 card p-5 pt-3" v-if="documentDetails">
                <div v-if="errorMessage">
                    <p class="alert alert-danger text-center">No se ha seleccionado ningún archivo</p>
                </div>
                <div v-if="loadingDocumentDetails" class="d-flex justify-content-center align-items-center h-100">
                    <div class="casual-spinner"></div>
                </div>

                <div v-else>
                    <header class="details__header">
                        <h2 class="fs-3">{{ documentDetails.data.nameEmployee }}</h2>
                        <h3 class="fs-5 text-gray">Solicitud de permiso económico</h3>
                    </header>
                    <main class="details__main">
                        <table class="table">
                            <tbody>
                            <tr class="align-content-center">
                                <td>
                                    <h5 class="fs-6">Fecha de solicitud</h5>
                                </td>
                                <td>
                                    <h5 class="fs-6 text-gray">{{ formattedCreatedDate }}</h5>
                                </td>
                            </tr>
                            <tr>
                                <td class="align-content-center">
                                    <h5 class="fs-6">Cantidad de días solicitados</h5>
                                </td>
                                <td class="align-content-center">
                                    <h5 class="fs-6 text-gray">{{ documentDetails.data.quantityDays }}</h5>
                                </td>
                            </tr>
                            <tr class="align-content-center">
                                <td>
                                    <h5 class="fs-6">Días solicitados</h5>
                                </td>
                                <td>
                                    <h5 v-for="date in documentDetails.data.permitDates" :key="date.id"
                                        class="fs-6 text-gray">
                                        {{
                                            new Date(date.requestDate).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })
                                        }},
                                    </h5>
                                </td>
                            </tr>
                            <tr class="align-content-center">
                                <td>
                                    <h5 class="fs-6">Motivo</h5>
                                </td>
                                <td>
                                    <p class="fs-6 text-gray">{{ documentDetails.data.reason }}</p>
                                </td>
                            </tr>
                            <tr class="align-content-center">
                                <td>
                                    <h5 class="fs-6">Descargar documento</h5>
                                </td>
                                <td>
                                    <button @click="downloadFile" class="btn btn__new">Descargar</button>
                                </td>
                            </tr>

                            <tr class="align-content-center">
                                <td>
                                    <label class="fs-6" for="file">Firmar documento</label>
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        id="file"
                                        name="file"
                                        class="form-control"
                                        accept="image/*"
                                        data-browse="Seleccionar archivo"
                                        @change="handleFileChange"
                                        required
                                        :disabled="isCheckboxChecked"
                                        :required="!isCheckboxChecked"
                                    />
                                    <div class="d-flex align-items-center gap-3 mt-1">
                                        <input
                                            id="firmacheck"
                                            type="checkbox"
                                            class="form-check-input m-0"
                                            v-model="isCheckboxChecked"
                                            @change="handleCheckboxChange"
                                        >
                                        <label for="firmacheck" class="align-content-center">Ya tengo firma</label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="align-content-center">
                                <td>
                                    <h5 class="fs-6">Enviar respuesta</h5>
                                </td>
                                <td class="d-flex gap-3">
                                    <button @click="signPermit" class="btn btn__new">Aceptar</button>
                                    <button class="btn bg-danger">Rechazar</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </main>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
td {
    padding: 20px 0;
}

.bandeja {
    height: calc(100vh - 120px);
}



.solicitudes__card {
    border-bottom: 1px solid hsl(0, 0%, 94%);
    transition: all 200ms ease-in-out;
}

.bandeja__title {
    border-bottom: 1px solid hsl(0, 0%, 80%);
}

.card__email {
    color: #758CA3;
}

.solicitudes__card:hover {
    background-color: var(--principal-color);
    color: white;
}

.btn__new {
    color: var(--white-color);
    background-color: var(--principal-color);
}

.btn__new:hover {
    background-color: var(--grayy);
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
