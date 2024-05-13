<script setup>
import { ref, onMounted } from 'vue';

const API_BASE_URL = 'https://service-teacher-zeleris.onrender.com';
const email = ref('');
const showSuccessMessage = ref(false);
const showFailMessage = ref(false);

const handleSubmit = async () => {
    try {
        const url = `${API_BASE_URL}/Accounts/password/recover/${email.value}`;
        const response = await fetch(url, {
            method: 'POST',
        });

        if (response.ok) {
            showSuccessMessage.value = true;
            showFailMessage.value = false;
        } else {
            showFailMessage.value = true;
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
    }
};
</script>

<template>
    <div class="background">
        <div class="img__container">
            <img class="img__zeleris" src="/src/assets/img/Zeleris.jpg" alt="">
        </div>
        <div class="content d-flex flex-column align-items-center justify-content-center">
            <div class="layout">
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
                        <input v-model="email" type="email" class="form__input" name="email" required placeholder="Email">
                        <label for="email" class="form__label">Email</label>
                    </div>
                    <input type="submit" value="Enviar" class="form__button">
                </form>
                <a href="/EnterCode" class="cancelar">Insertar código</a>
                <a href="/" class="cancelar">Cancelar</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border: none;
    border-bottom: 1px solid var(--grayy);
    position: relative;
    width: 100%;
    display: block;
    font-size: 1rem;
    padding: 1rem 3rem 1rem 1.5rem;
    border-radius: 0.5rem;
    outline: none;
    line-height: 2.1rem;

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
    border-radius: 1rem;
    transition: all 200ms linear;
}
.form__button:hover{
    background-color: var(--principal-color);
}
.form__button:active{
    background-color: var(--grayy);
}
</style>