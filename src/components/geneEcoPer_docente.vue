<template>
    <div class="layout">
        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
        </div>
        <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
        </div>
        <form @submit.prevent="openPasswordModal">
            <div class="applicant_Details">
                <p id="p_ad">Solicitar Permiso Económico</p>
                <div class="teacherDetails">
                    <h1>
                        <i class="bi bi-person-square"></i>
                    </h1>
                    <div id="nameMail" class="d-flex flex-column justify-content-center">
                        <div><span>{{ employee.name }}</span>{{ employee.lastName }}</div>
                        <span>{{ employee.email }}</span>
                    </div>
                    <div class="numberDays">Cantidad de días a solicitar:
                        <span class="minus" @click="decreaseNumber">-</span>
                        <span class="num">{{ number }}</span>
                        <span class="plus" @click="increaseNumber">+</span>
                    </div>
                    <div id="availablePermissions">Permisos disponibles: <span>{{ employee.quantityPermissions }}</span>
                    </div>
                </div>
                <div class="applicant">
                    <div id="category">Docente</div>
                    <div id="collegeName">Ingeniería en Sistemas Computacionales</div>
                    <div id="todaysDate">Fecha: {{ today }}</div>
                </div>
            </div>
            <div class="filling_Area">
                <div id="selectedDay">
                    <div class="motivo-container">
                        <div id="motivo">Motivo especial:</div>
                        <select v-model="selectedReason" class="form-control" @change="updateReason">
                            <option id="Fallecimiento" value="Fallecimiento">Fallecimiento</option>
                            <option id="Parto" value="Parto">Parto</option>
                            <option id="Matrimonio" value="Matrimonio">Matrimonio</option>
                            <option id="Cumpleaños" value="Cumpleaños">Cumpleaños</option>
                            <option id="Otro" value="">Otro</option>
                        </select>
                    </div>
                    <div id="sel_Day">Fechas del permiso:</div>
                    <div id="selectedDays">
                        <input
                            v-for="(date, index) in selectedDates" :key="index" type="date"
                            v-model="selectedDates[index]"
                            class="form-control"
                            required
                        />
                    </div>
                </div>
                <div id="reasons">Motivo de la solicitud:</div>
                <div id="text_Box" class="d-flex gap-1">
                    <textarea
                        v-model="reason"
                        class="reasonsTexts form-control"
                        placeholder="Coloca el motivo de la solicitud"
                        :readonly="isReadonly"
                        required
                    ></textarea>
                    <div class="d-flex align-items-center gap-2">
                        <div class="w-50">
                            <input
                                type="file"
                                id="file"
                                name="file"
                                class="form-control"
                                accept="image/*"
                                @change="handleFileChange"
                                :disabled="isCheckboxChecked"
                                :required="!isCheckboxChecked"
                                data-browse="Seleccionar archivo"
                            />
                        </div>
                        <input
                            id="firmacheck"
                            type="checkbox"
                            class="form-check-input"
                            v-model="isCheckboxChecked"
                            @change="handleCheckboxChange"
                        >
                        <label for="firmacheck" class="">Ya tengo firma</label>
                    </div>
                </div>
            </div>
            <div class="submissionArea">
                <button type="submit" class="btn btn-submit form__submit">Crear</button>
            </div>
        </form>

        <div v-if="showPasswordModal" class="modal">
            <div class="modal-content_pass">
                <p class="pContent_passH">Confirmar Contraseña</p>
                <p class="pContent_pass">Por favor, ingrese su contraseña para confirmar la solicitud.</p>
                <input style="border: 1px solid var(--grayy); margin-bottom: 15px;" type="password" v-model="password"
                       class="form-control"/>
                <div class="modal-buttons">
                    <button
                        style="background-color: #1B365D; margin-right: 20px; margin-left: 20px; margin-bottom: 10px;  border: none;"
                        @click="validatePassword" class="btn btn-primary">Confirmar
                    </button>
                    <button style="background-color: #FCBF12; color:black; border: none; margin-bottom: 10px;"
                            @click="cancelPasswordModal" class="btn btn-secondary">Cancelar
                    </button>
                </div>
                <div
                    style="min-height: 50px; text-align: center; margin-top: 5px; padding-top: 12px; padding-bottom: 11px"
                    v-if="passwordError" class="alert alert-danger">
                    {{ passwordError }}
                </div>
            </div>
        </div>

        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <p class="fs-5">Solicitud de permiso enviada</p>
                <button class="form__button p-1" @click="irDirecciones">Aceptar</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import {useEmployee} from "@/api/teacherService.js";
import router from "@/router/index.js";

const {employee} = useEmployee();

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const loading = ref(false);
const number = ref(1);
const selectedDates = ref(['']);
const today = new Date().toISOString().slice(0, 10);
const reason = ref('');
const selectedReason = ref('');
const isCheckboxChecked = ref(false);
const errorMessage = ref('');
const showModal = ref(false);
const showPasswordModal = ref(false);
const password = ref('');
const passwordError = ref('');
const isReadonly = ref(false);

let signatureImageBase64 = '';

const Reasons = {
    Fallecimiento: "Fallecimiento",
    Parto: "Parto",
    Matrimonio: "Matrimonio",
    Cumpleaños: "Cumpleaños",
    Otro: ""
};

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

const handleCheckboxChange = () => {
    if (isCheckboxChecked.value) {
        signatureImageBase64 = null;
    }
};

const updateReason = () => {
    reason.value = Reasons[selectedReason.value] || '';
    isReadonly.value = selectedReason.value !== '';
};

const openPasswordModal = () => {
    showPasswordModal.value = true;
};

const cancelPasswordModal = () => {
    showPasswordModal.value = false;
    password.value = '';
    passwordError.value = '';
};

const validatePassword = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/Accounts/validate/password`, {
            password: password.value
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            }
        });
        if (response.data.success) {
            showPasswordModal.value = false;
            enviarSolicitud();
        } else {
            passwordError.value = 'Contraseña incorrecta.';
        }
    } catch (error) {
        console.error('Error al validar la contraseña:', error);
        passwordError.value = 'Error al validar la contraseña.';
    }
};

const enviarSolicitud = async () => {
    loading.value = true;
    errorMessage.value = '';
    try {
        if (isCheckboxChecked.value) {
            signatureImageBase64 = null;
        }
        const response = await axios.post(`${API_BASE_URL}/Documents`, {
            createdDate: today,
            quantityDays: number.value,
            reason: reason.value,
            dates: selectedDates.value.filter(date => date !== ''),
            signatureImageBase64: signatureImageBase64
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            }
        });
        console.log(response.data);
        if (response.data.success) {
            showModal.value = true;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message;
        } else {
            errorMessage.value = error.message;
        }
    } finally {
        loading.value = false;
    }
};
const irDirecciones = () => {
    const role = localStorage.rol;
    if (role === 'Docente') {
        router.push('/TeachersHome');
    } else if (role === 'Coordinador') {
        router.push('/CordinationHome');
    } else if (role === 'Admin') {
        router.push('/AdminHome');
    } else if (role === 'Director') {
        router.push('/DirectortHome');
    } else {
        router.push('/');
    }
};
</script>


<style scoped>

.layout {
    padding: 1rem;
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

.form__submit {
    background-color: var(--principal-color);
    color: white;
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
    padding: 5px 10px;
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
    gap: 10px;
    /*border: 1px solid black;*/
}

.motivo-container {
    display: flex;
    align-items: center;
}

#motivo {
    margin-right: 10px;
    font-weight: 700;
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

body {
    display: flex;
    flex-direction: column;
    background-color: white;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content_pass {
    width: 35%;
    background: white;
    padding: 1.5rem 3rem;
    border-radius: 8px;
    text-align: center;
}

.pContent_passH {
    font-size: 1.5rem;
}

.pContent_pass {
    font-size: 1rem;
}

.modal-content {
    width: 25%;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    text-align: center;
}

.modal-content p {
    margin-bottom: 1rem;
    font-size: 1.25rem;
}

.modal-content a {
    padding: 0.75rem 1.5rem;
    background-color: var(--grayy) !important;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 300ms ease-in-out;
}

.modal-content a:hover {
    background-color: var(--principal-color) !important;;
}
.form__button {
    border: none;
    width: 100%;
    cursor: pointer;
    padding: 0.8rem 3rem;
    font-size: 1.3rem;
    background-color: var(--principal-color);
    color: var(--white-color);
    border-radius: 6px;
    transition: all 200ms linear;
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