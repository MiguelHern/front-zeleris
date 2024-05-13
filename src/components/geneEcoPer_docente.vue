<template>
    <div class="layout">
        <form>
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
                    <div class="numberDays">Cantidad de dias a solicitar:
                        <span class="minus" @click="decreaseNumber">-</span>
                        <span class="num">{{ number }}</span>
                        <span class="plus" @click="increaseNumber">+</span>
                    </div>
                    <div id="availablePermissions">Permisos disponibles: 3</div>
                </div>
                <div class="applicant">
                    <div id="category">Docente</div>
                    <div id="collegeName">Ingenieria en Sistemas Computacionales</div>
                    <div id="todaysDate">Fecha:</div>
                </div>
            </div>

            <div class="filling_Area">
                <div id="selectedDay">
                    <div id="sel_Day">Fecha del permiso:</div>
                    <div id="selectedDays">
                        <input v-for="(date, index) in selectedDates" :key="index" type="date"
                               v-model="selectedDates[index]"
                               class="form-control"/>
                    </div>
                </div>
                <div id="reasons"> Motivo de la solicitud:</div>
                <div id="text_Box">
                         <textarea class="reasonsTexts form-control"
                                   placeholder=" Coloca el motivo de la solicitud"></textarea>
                </div>
            </div>

            <div class="submissionArea">
                <div class="custom-file-input btn btn-primary">
                    <input type="file" id="file" name="file" class="inp" @change="handleFileInputChange">
                    <label for="file" class="" role="button">Seleccionar archivo</label>
                </div>
                <input type="submit"
                       class="btn btn-submit"
                       name="Boton2"
                       value="Crear"
                       @click="enviarForm">
            </div>
        </form>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';

//const fecha = ref(new Date('2024-04-30T03:45:32.612Z'))
const number = ref(1);
const selectedDates = ref(['']); // Array to store selected dates

onMounted( () => {
    console.log(selectedDates.value.length)
})

const enviarForm = () => {

}
/*
    {
   API: https://service-teacher-zeleris.onrender.com/
  "createdDate": "2024-05-09T21:04:45.684Z",
  "quantityDays": 0,
  "reason": "string",
  "dates": [
    "2024-05-09T21:04:45.684Z"
  ]
}*/
const n = () => {
console.log(selectedDates.value.length)
}

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
// Ensure selectedDates array length matches the current number
while (selectedDates.value.length < number) {
selectedDates.value.push('');
}
while (selectedDates.value.length > number) {
selectedDates.value.pop();
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