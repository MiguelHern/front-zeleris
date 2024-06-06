<script setup>
import { onMounted, ref } from 'vue';
import { fetchDocumentHistory } from '@/api/teacherService.js';
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
const loading = ref(true);
const noHistory = ref(false);
const permissions = ref([]);

//URL.createObjectURL(file)

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
        console.log("dato")
        console.log(permissions.value)
    } else {
        noHistory.value = true;
    }
    loading.value = false;
});

const downloadDocument = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Documents/format`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            }
        });

        if (!response || !response.data) {
            throw new Error('Respuesta inválida del servidor');
        }

        // Verificar si la respuesta indica éxito y contiene datos
        if (response.data.success && response.data.data) {
            const base64String = response.data.data;

            if (typeof base64String !== 'string' || base64String.length === 0) {
                throw new Error('El string base64 es inválido o está vacío');
            }

            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

            // Crear un enlace y simular un clic para descargar el archivo
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'document.docx';
            link.click();
            window.URL.revokeObjectURL(link.href);

            console.log('Documento descargado exitosamente');
        } else {
            throw new Error('El servidor no pudo encontrar el documento');
        }
    } catch (error) {
        console.error('Error al descargar el documento:', error);
    }
};




const downloadFile = async (file) => {

    var response = await fetch(API_BASE_URL + "/Documents/file/" + file, {
        headers: {
            Authorization: 'Bearer ' + localStorage.token
        },
    })
        .then(response => response.json())
        .then(data => {
            var res = createDownloadLink(data.data.file)

        })
    console.log(response)
}

const createDownloadLink = (base64String) => {
    try {
        const binaryString = window.atob(base64String);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = "PermisoEconómico.docx";
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al crear el enlace de descarga:', error);
        return null;
    }
};

</script>

<template>
    <div v-show="!loading && noHistory" class="text-center display-1">
        <div>
            <i class="bi bi-file-earmark-excel-fill icono-tamaño"></i>
            <h4>Historial de permisos vacío</h4>
        </div>
    </div>
    <table class="table shadow-sm" v-show="!loading && !noHistory">
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
        <tr v-for="permission in permissions" :key="permission.id" class="align-content-center">
            <td class="text-lg-center align-content-center fw-bold text-body-secondary">
                <i role="button" class="icono bi bi-file-earmark-arrow-down-fill" @click="downloadFile(permission.documntId)"></i>
            </td>

            <td class="text-lg-center align-content-center fw-bold text-body-secondary">
                <i
                    role="button"
                    class="icono bi bi-file-earmark-arrow-down-fill"
                    @click="downloadDocument"
                >
                </i>
            </td>
            <td class="align-content-center hoverTabla" style="max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{ permission.reason }}
            </td>
            <td class="text-center align-content-center">{{ formatDate(permission.createdDate) }}</td>

            <td class="text-center">
                <div v-for="date in permission.dates" :key="date.id">
                    {{ new Date(date.dates).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
                </div>
            </td>

            <td class="text-center align-content-center"> {{ permission.status }}</td>
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