<template>
    <div class="layout">
        <form @submit.prevent="enviarSolicitud">
            <div class="applicant_Details">
                <p id="p_ad">Solicitar Permiso Económico</p>
                <div class="teacherDetails">
                    <h1>
                        <i class="bi bi-person-square"></i>
                    </h1>
                    <div id="nameMail">
                        <label>Julio A Gutiérrez Gonzáles</label>
                        <label>JulioGutierrez@uacam.mx</label>
                    </div>
                    <div class="numberDays">Cantidad de días a solicitar:
                        <span class="minus" @click="decreaseNumber">-</span>
                        <span class="num">{{ number }}</span>
                        <span class="plus" @click="increaseNumber">+</span>
                    </div>
                    <div id="availablePermissions">Permisos disponibles: 3</div>
                </div>
                <div class="applicant">
                    <div id="category">Docente</div>
                    <div id="collegeName">Ingeniería en Sistemas Computacionales</div>
                    <div id="todaysDate">Fecha: {{ today }}</div>
                </div>
            </div>
            <img :src=url alt="">
            <img :src=url alt="">
            <div class="filling_Area">
                <div id="selectedDay">
                    <div id="sel_Day">Fechas del permiso:</div>
                    <div id="selectedDays">
                        <input v-for="(date, index) in selectedDates" :key="index" type="date"
                               v-model="selectedDates[index]"
                               class="form-control"/>
                    </div>
                </div>
                <div id="reasons">Motivo de la solicitud:</div>
                <div id="text_Box">
                         <textarea v-model="reason" class="reasonsTexts form-control"
                                   placeholder="Coloca el motivo de la solicitud"></textarea>
                </div>
            </div>

            <div class="submissionArea">
                <div class="custom-file-input btn btn-primary">
                    <input
                        type="file"
                        id="file"
                        name="file"
                        class="inp"
                        accept="image/*"
                        @change="handleFileChange"
                    >
                    <label for="file" class="" role="button">Seleccionar archivo</label>
                </div>
                <button type="submit" class="btn btn-submit">Crear</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const number = ref(1);
const selectedDates = ref(['']);
const today = new Date().toISOString().slice(0, 10);
const reason = ref('');
let signatureImageBase64 = '';

onMounted(() => {
    updateDatePermitInputs(number.value);
});

const increaseNumber = () => {
    if (number.value < 3) {
        updateDatePermitInputs(++number.value);
    }
};

const decreaseNumber = () => {
    if (number.value > 1) {
        updateDatePermitInputs(--number.value);
    }
};

const updateDatePermitInputs = (number) => {
    while (selectedDates.value.length < number) {
        selectedDates.value.push('');
    }
    while (selectedDates.value.length > number) {
        selectedDates.value.pop();
    }
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            signatureImageBase64 = reader.result.split(',')[1];
        };
    }
};

const base64ToImage = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Cambia 'image/jpeg' según el tipo de imagen
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
};

const url = ref("")

const enviarSolicitud = async () => {
    try {
        console.log(signatureImageBase64)
        url.value = base64ToImage(signatureImageBase64)
        console.log(url.value)

        console.log(url)

        if (!signatureImageBase64 || signatureImageBase64.trim() === '') {
            console.log('La imagen no se ha convertido correctamente a base64 o está vacía.');
            return;
        }

        const response = await axios.post(`${API_BASE_URL}/Documents`, {
            createdDate: today,
            quantityDays: number.value,
            reason: reason.value,
            dates: selectedDates.value.filter(date => date !== ''),
            signatureImageBase64: url.value
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
    }
};

</script>



<style scoped>
.layout {
    padding: 1rem;
}

.inp{
    display: none;
}
.applicant_Details, .filling_Area, .submissionArea {
    display: flex;
}

.applicant_Details {
    flex-direction: column;
    min-height: 25%;
    margin-bottom: 10px;
}

p[id="p_ad"] {
    background-color: #C8C8C8;
    min-height: 50px;
    width: 100%;
    border-radius: 6px;
    padding-left: 20px;
    align-content: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 700;
    /*font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;*/
    font-size: 18px;
}

h1 {
    align-content: center;
    text-align: center;
    height: 50px;
    width: 50px;
    margin-left: 10px
}

.applicant, .teacherDetails {
    display: flex;
    width: 100%;
    border-radius: 6px;
    /*border: 1px solid black;*/
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 14px;

}

.teacherDetails {
    max-height: 35%;
    margin-top: -5px;
}

.applicant {
    background-color: #EDEDED;
    max-height: 45px;
    margin-top: 7px;
    padding: 10px 15px;
}

#category {

    width: 25%;
    align-content: center
}

#nameMail {
    /*border: 1px solid black;*/
    padding-left: 15px;
    width: 50%;
    align-content: center
}

#collegeName {
    min-width: 50%;
    text-align: center;
    align-content: center
}

.numberDays {
    margin-right: 20px;
    margin-left: 10px;
    border-radius: 6px;
    background-color: #EDEDED;
    /*border: 1px solid black;*/
    min-width: 22%;
    text-align: center;
    align-content: center;
    padding: 5px 10px;
    overflow: hidden;
}

.numberDays span {
    margin-right: 5px;
    margin-left: 5px;
    font-size: 16px;
}

.numberDays span.plus, span.minus {
    cursor: pointer;
}

.numberDays span.num {
    padding-left: 5px;
    padding-right: 5px;
    background-color: white;
    border: 2px solid rgba(0, 0, 0, .2);
    border-radius: 6px;
}

#availablePermissions {
    background-color: #EDEDED;
    border-radius: 6px;
    /*border: 1px solid black;*/
    min-width: 23%;
    text-align: center;
    align-content: center;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
}

#todaysDate {
    background-color: #EDEDED;
    border-radius: 6px;
    /*border: 1px solid black;*/
    min-width: 25%;
    text-align: right;
    align-content: center;
}


#selectedDays {
    display: flex;
    flex-direction: row;
    max-width: 80%;
    justify-content: right;
    align-items: center;
    /*border: 1px solid black;*/
}

#sel_Day {
    display: flex;
    width: 130px;
    /*border: 1px solid yellow;*/
    align-items: center;
    text-align: center;
}

#selectedDay {
    display: flex;
    /*border: 1px solid blue;*/
    justify-content: right;
}

#datePermit {
    border-radius: 6px;
    border: 1px solid black;
    padding: 5px;
    height: 30px;
    text-align: center;
}

.filling_Area {
    display: flex;
    flex-direction: column;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 700;
    font-size: 14px;
    background-color: #EDEDED;
    border-radius: 5px;
    padding: 10px 15px;
}

#text_Box {
    display: flex;
    flex-direction: column;
    /*background-color: green;*/
    height: 170px;
}

.reasonsTexts {
    min-height: 130px;
    border-radius: 5px;
    resize: none;
}


.submissionArea {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3px;
    margin-left: 45px;
    height: 10%;
    background-color: white;

}

.cancelButton{
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 1px;
    cursor: pointer;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    transition: .3s ease-in;
    border: none;
}


.cancelButton {
    background-color: #758CA3;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    height: 40px;
    width: 250px;
}

.cancelButton:hover {
    background-color: #1B365D;
    text-shadow: 1px 1px 5px #0f1e33;
}

body {
    display: flex;
    flex-direction: column;
    background-color: white;
}
</style>