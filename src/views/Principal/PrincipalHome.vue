<script setup>
import {onMounted, ref} from 'vue';

const pending = ref({});
const loading = ref(true);
const error = ref(null);

const loadPending = async () => {
    loading.value = true;
    const {data, success, error: fetchError} = await usePendingPrincipal();
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
    errorMessage.value = false
    loadingDocuments.value[id] = true;
    selectedDocumentId.value = id;
    console.log(selectedDocumentId.value)
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

    if (!imageBase64) {
        errorMessage.value = true
        return;
    }
    try {
        if (isCheckboxChecked.value) {
            imageBase64 = null;
        }
        const response = await APISPERMIT.signPermit(imageBase64, selectedDocumentId.value);
        errorMessage.value = false
        console.log('Documento firmado con éxito:', response);
    } catch (error) {
        console.error('Error al firmar el permiso:', error);
    }
};

onMounted(async () => {
    await loadPending();
});
import {fetchPendingPermissions, fetchDocumentDetails} from '@/api/cordinationService.js';
import {APISPERMIT} from "@/api/adminService.js";
import {usePendingPrincipal} from "@/api/principalService.js";

const loadingDocuments = ref({});
const pendingPermissions = ref({data: []});
const selectedDocumentId = ref(null);
const documentDetails = ref(null);
const formattedCreatedDate = ref(null);
const file = ref("");
let imageBase64 = '';
const errorMessage = ref(false);
const isCheckboxChecked = ref(false);
const showModalEdit = ref(false);
const reasonRejection = ref('');

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

const toggleModalEdit = () => {
    showModalEdit.value = !showModalEdit.value;
};

const rejectPermit = async () => {
    try {
        const response = await APISPERMIT.rejectPermit(reasonRejection.value, selectedDocumentId.value);
        console.log('Documento rechazado:', response);
        alert('Documento rechazado');
        showModalEdit.value = false
    } catch (error) {
        console.error('Error al rechazar permiso:', error);
    }
};

</script>


<template>
    <div class="w-100">
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
            <div class="w-75 card p-5 pt-3" v-if="documentDetails">
                <div v-if="errorMessage">
                    <p class="alert alert-danger text-center">No se ha seleccionado ningún archivo</p>
                </div>
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
                                <button @click="toggleModalEdit()" class="btn bg-danger">Rechazar</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    </div>
    <div v-if="showModalEdit" class="modal">
        <div class="modal-content">
            <div class="close__modal">
                <span class="close" @click="toggleModalEdit">&#x2716;</span>
            </div>
            <h3 class="text-center">Motivo para rechazar permiso</h3>
            <form @submit.prevent="rejectPermit">
                <div>
                    <textarea v-model="reasonRejection" class="form-control modal__edit-text"></textarea>
                </div>
                <div class="d-flex justify-content-center">
                    <button @click.stop="rejectPermit" class="btn bg-danger text-white">Rechazar</button>
                </div>
            </form>
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

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
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
.modal {
    display: block !important;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.4);

}

.modal-content {
    background-color: #fefefe;
    margin: 8% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
}

.close__modal {
    text-align: right;
}

.close {
    text-align: right;
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.modal__edit-text {
    height: 400px;
    margin: 20px 0;
    resize: none;
    box-shadow: var(--bs-box-shadow-inset);
}
</style>
