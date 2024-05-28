<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const inputs = ref([]);
const isButtonActive = ref(false);
const codeInputs = ref(['', '', '', '', '', '']);

onMounted(() => {
    inputs.value = document.querySelectorAll("input");
    inputs.value[0].focus();
});

const handleKeyUp = (index, event) => {
    const currentInput = inputs.value[index];
    const nextInput = inputs.value[index + 1];
    const prevInput = inputs.value[index - 1];

    // Limit input value to one character
    currentInput.value = currentInput.value.slice(0, 1);

    // Append entered character to codeInputs array
    codeInputs.value[index] = currentInput.value;

    // Focus the next input if not empty and enabled
    if (nextInput && currentInput.value !== "") {
        nextInput.removeAttribute("disabled");
        nextInput.focus();
    }

    // Handle backspace functionality
    if (event.key === "Backspace") {
        if (index > 0) {
            currentInput.value = "";
            prevInput.focus();
        }
    }

    // Update button state based on codeInputs array
    isButtonActive.value = codeInputs.value.every(input => input !== '');
};


const loading = ref(false);
const code = computed(() => codeInputs.value.join(''));
/* API */
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
const showSuccessMessage = ref(false);
const showFailMessage = ref(false);
const router = useRouter();

const handleSubmit = async () => {
    loading.value = true;
    try {
        const url = `${API_BASE_URL}/Accounts/validate/code/${code.value}`;
        const response = await fetch(url, {
            method: 'POST',
        });
        const data = await response.json();
        if (data.success === true) {
            showSuccessMessage.value = true;
            showFailMessage.value = false;
            router.push('/ChangePassword');
        } else {
            showFailMessage.value = true;
            showSuccessMessage.value = false;
            console.error('Error en la respuesta del servidor:', data.message || response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
            showFailMessage.value = true;
            showSuccessMessage.value = false;
        }
    finally {
        loading.value = false;
    }
};

</script>


<template>
    <div class="background">
        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
        </div>
        <div class="img__container">
            <img src="/src/assets/img/UACLogo.jpg" class="logouacfp" style="max-width: 75px; max-height: 75px;">
        </div>
        <div class="content d-flex flex-column align-items-center justify-content-center">
            <div class="container">
                <div class="layout__header">
                    <div v-if="showFailMessage">
                        <p class="alert alert-danger text-center w-100">No hay coincidencias</p>
                    </div>
                    <h1 class="header__text">Ingresa el código que fue enviado a tu correo</h1>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="input_field">
                        <input class="form-control" v-for="(input, index) in 6" :key="index" type="text" v-model="codeInputs[index]" @keyup="handleKeyUp(index, $event)" :disabled="index !== 0" maxlength="1">
                    </div>
                    <button class="button__recover" :class="{ active: isButtonActive }" :disabled="!isButtonActive">Recuperar contraseña</button>
                </form>
                <a href="/" class="cancelar">Cancelar</a>
            </div>
        </div>
    </div>
</template>


<style scoped>
.logouacfp{
  margin-left: 20px;
  margin-top: 20px;
  text-align:start;
  justify-self:flex-start;
}
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
.container{
  width: 450px;
  height: auto;
  padding: 2rem 3rem;
  row-gap: 1rem;

  position: relative;
  border-radius: 6px;
  box-shadow: var(--bs-box-shadow);
}
.header__text{
  margin-bottom: 2rem;

  text-align: center;
  font-size: 1.8rem;
}
:where(.container, form, .input_field, header){
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
form .input_field{
  flex-direction: row;
  column-gap: 1rem;
}
.input_field input{
  height: 45px;
  width: 42px;
  border-radius: 5px;
  outline: none;
  text-align: center;
  font-size: 1.125rem;

}
.input_field input::-webkit-inner-spin-button,
input_field input::-webkit-outer-spin-button{
  display: none;
}
.button__recover, .button__rsend{
  margin-top: 35px;
  width: 100%;
  background-color: var(--grayy);
  color: var(--white-color);
  border-radius: 5px;
  transition: all 200ms linear;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  pointer-events: none;
  padding: 9px 0;
}
.button__rsend{
  margin-top: 0;
  width: auto;
  padding: 5px 30px;
  background: #B3A87A;
}

form button.active{
  background: var(--principal-color);
  pointer-events: auto;
}
form button:hover{
  box-shadow: var(--bs-box-shadow);
}

.content{
  height: 100%
}
.cancelar{
  color: #0056b3;
  text-align: center;
  transition: all 200ms ease-in-out;
}
.cancelar:hover{
  color: var(--secondary-color);
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