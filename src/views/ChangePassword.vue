<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const email = ref('');
const newPassword = ref('');
const showSuccessMessage = ref(false);
const showFailMessage = ref(false);
const router = useRouter();

onMounted(() => {
    email.value = sessionStorage.getItem('email');
});

const ChangePassword = async () => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/Accounts/password/change`, {
            email: email.value,
            newPassword: newPassword.value,
        });
        if (response.status === 200) {
            showSuccessMessage.value = true;
            showFailMessage.value = false;
            sessionStorage.setItem('email', email.value);
            router.push('/');
        } else {
            showFailMessage.value = true;
            showSuccessMessage.value = false;
        }
        console.log(response.data);
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
                <p class="alert alert-success text-center">Contraseña cambiada.</p>
            </div>
            <div v-if="showFailMessage">
                <p class="alert alert-danger text-center">eu</p>
            </div>
          <h1 class="layout__title">Ingresar a Zeleris</h1>
        </div>
        <form @submit.prevent="ChangePassword" class="login__form">
          <div class="form__group">
            <input v-model="newPassword" type="password" class="form__input" name="contraseña " required placeholder="Contraseña">
            <label for="contraseña" class="form__label">Contraseña</label>
          </div>
          <div class="form__group">
            <input type="password" class="form__input" name="contraseña " required placeholder="Contraseña">
            <label for="contraseña" class="form__label">Confirmar contraseña</label>
          </div>
          <input type="submit" value="Continuar" class="form__button">
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img__container{
  pointer-events: none;
  position: absolute;
  height: 100px;
  width: 100px;
}
.eye{
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
}
.form__recover{
  display: inline-block;
  transition: all 200ms ease-in-out;
  text-decoration: underline;
}
.container__recover{
  text-align: right;
  margin-bottom: 10px;
}
.form__recover:hover{
  color: #FCBF12;
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