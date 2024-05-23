<template>
    <div class="d-flex w-100">
        <table class="table shadow-sm w-25">
            <thead>
            <tr>
                <th scope="col" class="col-4">Nombre</th>
                <th scope="col" class="col-1">Número de empleado</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="permission in pendingPermissions.data" :key="permission.id" class="align-content-center" @click="getDocumentId(permission.id)">
                <td class=" align-content-center fw-bold text-body-secondary">
                    {{ permission.name }} {{ permission.lastName }}
                </td>
                <td class="align-content-center">
                    <span>{{ permission.id }}</span>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="w-75" v-if="documentDetails">
            <!-- Mostrar detalles del documento aquí -->
            <div id="cuerpo">
                <div class="details">
                    <p> Detalles del Permiso Económico</p>
                    <div class="applicantDetails">
                        <h1 id="perfil_Icon">
                            <i class="bi bi-person-square"></i>
                        </h1>
                        <div id="nameMail">
                            <label>Julio A Gutiérrez Gonzáles</label>
                            <label>JulioGutierrez@uacam.mx</label>
                        </div>
                        <div id="permitDate"> Fecha de la solicitud: {{ formattedCreatedDate }}</div>

                    </div>
                </div>

                <div class="fillingArea"> Cantidad de día(s) solicitada(s): <span>{{ documentDetails.data.quantityDays }}</span>
                    <div id="selectedDays">
                        <div v-for="date in documentDetails.data.permitDates" :key="date" class="days">{{ date }}</div>
                    </div>
                    <div id="reasons"> Motivo de la solicitud:</div>
                    <div id="textBox">
                        <p>{{ documentDetails.data.reason }}</p>
                    </div>
                </div>
                <div class="submissionArea">
                    <input class="declineButton" type="submit" name="Boton1" value="Rechazar">
                    <input class="acceptButton" type="submit" name="Boton2" value="Aceptar">
                </div>
            </div>
        </div>
        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
        </div>
    </div>
</template>

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

<style>
#cuerpo{
    display: flex;
    flex-direction:column;
    width: 100%;
    /*border: 3px solid red;*/
}

p{
    background-color: #C8C8C8;
    min-height: 50px;
    width: 100%;
    border-radius: 6px;
    padding-left: 20px;
    align-content: center;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 700;
    /*font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;*/
    font-size: 18px;
}

.details{
    flex-direction:column;
    min-height: 140px;
    /*background-color: lightgreen;*/
    background-color:white;
    display: flex;
    width: calc(100%-30px);
    margin-left: 15px;
    margin-right: 15px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 5px;
    padding-right: 5px;
}

.applicantDetails{
    min-height: 40px;
    /*border: 2px solid green;*/
    display: flex;
    width: 100%;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 15px;
    margin-bottom: 2px;
    /*margin-top: 0px;*/
}

h1[id="perfil_Icon"]{
    /*border: 2px solid green;*/
    margin-top: 3px;
    margin-left: 15px;
    align-content: center;
}

#nameMail{
    /*border: 3px solid yellow;*/
    padding-left: 15px;
    padding-right: 10px;
    width: 72%;
    align-content: center;
    margin-bottom: 0px;
}

#permitDate{
    /*background-color: #f5b642;*/
    background-color: #EDEDED;
    border-radius: 6px;
    min-width: 28%;
    /*min-width RECUERDA MODIFICAR CUANDO HAGAS LA BANDEJA*/
    margin-right: 15px;
    text-align: center;
    align-content: center;
    padding-right: 5px;
    padding-left: 5px;
    padding-top: 3px;
    padding-bottom: 3px;
}

.fillingArea{
    display: flex;
    flex-direction:column;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
    font-size: 15px;
    height: 250px;
    /*background-color: #f762be;*/
    background-color: #EDEDED;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: calc(100%-30px);
    margin-left: 30px;
    margin-right: 30px;
    padding-top: 18px;
    padding-bottom: 18px;
    padding-right: 13px;
    padding-left: 27px;
}

#selectedDays{
    display: flex;
    padding-bottom: 15px;
    padding-top: 13px;
    justify-content: center;
}

.days{
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    background-color: white;
    border-radius: 5px;
    min-width: 24%;
    /*min-width RECUERDA MODIFICAR CUANDO HAGAS LA BANDEJA*/
    margin-left: 30px;
    margin-right: 30px;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
    align-content: center;
}

#textBox{
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 35px;
    margin-bottom: 25px;
    /*background-color: green;*/
    background-color: #EDEDED;
    height: 250px;
}

.reasonsText{
    margin-top: 5px;
    min-height: 110px;
    padding: 5px;
    border-radius: 5px;
}

.submissionArea{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 15px;
    padding-bottom: 15px;
    height: 10%;
    /*background-color: blue;*/
    background-color: #EDEDED;
    margin-left: 30px;
    margin-right: 30px;
}

.remainingDays{
    text-align: center;
    align-content: center;
    background-color: #EDEDED;
    margin-left: 30px;
    margin-right: 30px;
    padding-top: 10px;
    padding-left: 80px;
    padding-right: 80px;
    padding-bottom: 20px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.declineButton, .acceptButton{
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 1px;
    height: 37px;
    width: 150px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    /*box-shadow: 3px 3px 6px rgba(0, 0, 0, .3);*/
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    transition: .3s ease-in;
}

.declineButton{
    background-color: #fae3a0;
    color:black;
    margin-right: 30px;
    border: none;
}
.declineButton:hover{
    background-color: #FCBF12;
    text-shadow: 1px 1px 5px #e2aa11;
    border: none;
}

.acceptButton{
    background-color: #758CA3;
    color:white;
    border: none;
}
.acceptButton:hover {
    background-color: #1B365D;
    text-shadow: 1px 1px 5px #0f1e33;
    border: none;
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

