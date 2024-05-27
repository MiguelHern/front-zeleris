<script setup>
import {onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
const email = ref('');
const showSuccessMessage = ref(false);
const showFailMessage = ref(false);
const router = useRouter();
const loading = ref(false);

const handleSubmit = async () => {
    loading.value = true;
    try {
        const url = `${API_BASE_URL}/Accounts/password/recover/${email.value}`;
        const response = await fetch(url, {
            method: 'POST',
        });
        if (response.ok) {
            showSuccessMessage.value = true;
            showFailMessage.value = false;
            router.push('/EnterCode');
            sessionStorage.setItem('email', email.value);
        } else {
            showFailMessage.value = true;
            showSuccessMessage.value = false;
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
    }
    finally {
        loading.value = false;
    }
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSubmit();
    }
});
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
            <div class="layout card">
                <div class="layout__header">
                    <div v-if="showSuccessMessage">
                        <p class="alert alert-success text-center">Código enviado.</p>
                    </div>
                    <div v-if="showFailMessage">
                        <p class="alert alert-danger text-center">No hay coincidencias</p>
                    </div>
                    <h1 class="layout__title">Ingresar tu correo para recuperar tu contraseña</h1>
                </div>
                <form @submit.prevent="handleSubmit" class="login__form">
                    <div class="form__group">
                        <input v-model="email" type="email" class="form__input card" name="email" required placeholder="Email">
                        <label for="email" class="form__label">Email</label>
                    </div>
                    <input type="submit" value="Enviar" class="form__button">
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
.cancelar{
    text-align: center;
    transition: all 200ms ease-in-out;
    margin-top: 1rem;
    text-decoration: underline;
}
.cancelar:hover{
    color: #FCBF12;
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
.content{
    height: 100%
}
.layout{
    width: 450px;
    height: auto;
    padding: 3rem;

    position: relative;
    border-radius: 6px;
    box-shadow: var(--bs-box-shadow);
}
.layout__title{
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 3rem;
}
.form__group{
    position: relative;
    margin-bottom: 2.5rem;
}
.form__input
{
    position: relative;
    width: 100%;
    display: block;
    font-size: 1rem;
    padding: 1rem 3rem 1rem 1.5rem;
    border-radius: 0.5rem;
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