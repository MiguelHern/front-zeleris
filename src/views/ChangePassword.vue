<template>
    <div class="background">
        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
        </div>
        <div class="img__container">
            <img class="img__zeleris" src="/src/assets/img/Zeleris.jpg" alt="">
        </div>
        <div class="content d-flex flex-column align-items-center justify-content-center">
            <div class="layout">
                <div class="layout__header">
                    <h1 class="layout__title">Cambiar contraseña</h1>
                </div>
                <form @submit.prevent="handleSubmit" class="login__form">
                    <div class="form__group">
                        <input v-model="newPassword" type="password" class="form__input" required placeholder="Contraseña">
                        <label for="contraseña" class="form__label">Contraseña</label>
                    </div>
                    <div class="form__group form__group2">
                        <input v-model="confirmPassword" type="password" class="form__input" required placeholder="Confirmar Contraseña">
                        <label for="confirmPassword" class="form__label">Confirmar Contraseña</label>
                    </div>
                    <ul class="password-criteria">
                        <li :class="{ 'criteria-met': criteria.length }">
                            <i class="bi bi-check-circle"></i> Al menos 8 caracteres
                        </li>
                        <li :class="{ 'criteria-met': criteria.upper }">
                            <i class="bi bi-check-circle"></i> Al menos una letra mayúscula
                        </li>
                        <li :class="{ 'criteria-met': criteria.lower }">
                            <i class="bi bi-check-circle"></i> Al menos una letra minúscula
                        </li>
                        <li :class="{ 'criteria-met': criteria.number }">
                            <i class="bi bi-check-circle"></i> Al menos un número
                        </li>
                        <li :class="{ 'criteria-met': criteria.special }">
                            <i class="bi bi-check-circle"></i> Al menos un carácter especial
                        </li>
                    </ul>
                    <div v-if="passwordsMismatch" class="password__match text-center mb-1">
                        Las contraseñas no coinciden.
                    </div>
                    <input type="submit" value="Continuar" class="form__button">
                </form>
            </div>
            <div v-if="showModal" class="modal">
                <div class="modal-content">
                    <p class="fs-5">Cambio de contraseña exitoso</p>
                    <a class="form__button p-1" href="/">Aceptar</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
const email = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const showModal = ref(false);
const loading = ref(false);

const passwordsMismatch = computed(() =>
    newPassword.value !== '' &&
    confirmPassword.value !== '' &&
    newPassword.value !== confirmPassword.value
);
const criteria = ref({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
});
const validatePassword = (password) => {
    criteria.value.length = password.length >= 8;
    criteria.value.upper = /[A-Z]/.test(password);
    criteria.value.lower = /[a-z]/.test(password);
    criteria.value.number = /[0-9]/.test(password);
    criteria.value.special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
};
watch(newPassword, (newValue) => {
    validatePassword(newValue);
});


onMounted(() => {
    email.value = sessionStorage.getItem('email');
});
const ChangePassword = async () => {
    loading.value = true;
    try {
        const response = await axios.patch(`${API_BASE_URL}/Accounts/password/change`, {
            email: email.value,
            newPassword: newPassword.value,
        });
        if (response.status === 200) {
            sessionStorage.setItem('email', email.value);
            console.log('cambiada perro')
            showModal.value = true;
        } else {
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
    }
    finally {
        loading.value = false;
    }
};
const handleSubmit = () => {
    if (!passwordsMismatch.value && Object.values(criteria.value).every(v => v)) {
        ChangePassword();
    }
};
</script>

<style scoped>
.img__container{
  pointer-events: none;
  position: absolute;
  height: 100px;
  width: 100px;
}
.background{
  width: 100%;
  height: 100vh;
}
.content{
  height: 100%
}
.layout{
  width: 450px;
  height: auto;
  padding: 3rem;

  position: relative;
  border-radius: 1rem;
  box-shadow: var(--bs-box-shadow);
}
.layout__title{
  font-weight: 700;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 4rem;
}
.form__group{
  position: relative;
  margin-bottom: 2.5rem;
}
.form__group2{
    margin-bottom: 1rem;
}
.form__input
{
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border: none;
  border-bottom: 1px solid var(--grayy);
  position: relative;
  width: 100%;
  display: block;
  font-size: 1rem;
  padding: 1rem 3rem 1rem 1.5rem;
  border-radius: 6px;
  outline: none;

}
.form__label{
  position: absolute;
  top: 1rem;
  left: 1.5rem;

  transition: all 250ms ease-in-out;
  pointer-events: none;
}
.form__input:focus~label,
.form__input:not(:placeholder-shown)~label
{
  top: -2rem;
  left: 0;
  z-index: 1;
  color: var(--principal-color);
}
.form__input::-webkit-input-placeholder{
  color: transparent;
}
.form__input::-moz-placeholder{
  color: transparent;
}
.form__button{
  border: none;
  width: 100%;
  cursor: pointer;
  padding: 1rem 3rem;
  font-size: 1.3rem;
  background-color: var(--grayy);
  color: var(--white-color);
  border-radius: 6px;
  transition: all 200ms linear;
}
.form__button:hover{
  background-color: var(--principal-color);
}
.form__button:active{
  background-color: var(--grayy);
}
.password__match {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.5rem;
}
.password-criteria {
    list-style-type: none;
    padding: 0;
    margin-bottom: 1rem;
}

.password-criteria li {
    color: red;
    font-size: 0.875rem;
}

.password-criteria .criteria-met {
    color: green;
}
.form__button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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
.modal-content button {
    padding: 0.75rem 1.5rem;
    background-color: var(--principal-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
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