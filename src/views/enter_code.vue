<script setup>
import { ref, onMounted, computed } from 'vue';

const inputs = ref([]);
const isButtonActive = ref(false);

onMounted(() => {
  inputs.value = document.querySelectorAll("input");
  inputs.value[0].focus();
});

const handleKeyUp = (index, event) => {
  const currentInput = inputs.value[index],
      nextInput = inputs.value[index + 1],
      prevInput = inputs.value[index - 1];

  if (currentInput.value.length > 1) {
    currentInput.value = "";
  }
  if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
    nextInput.removeAttribute("disabled");
    nextInput.focus();
  }
  if (event.key === "Backspace") {
    if (index > 0) {
      currentInput.value = "";
      currentInput.setAttribute("disabled", true);
      prevInput.focus();
    }
  }
  isButtonActive.value = !inputs.value[5].disabled && inputs.value[5].value !== "";
};
</script>
<template>
  <div class="background">
    <div class="img__container">
      <img class="img__zeleris" src="/src/assets/img/Zeleris.jpg" alt="">
    </div>
    <div class="content d-flex flex-column align-items-center justify-content-center">
      <div class="container">
        <header>
          <h1 class="header__text">Ingresa el código que fué enviado a tu correo</h1>
        </header>
        <form action="#">
          <div class="input_field">
            <input ref="inputs" v-for="(input, index) in 6" :key="index" type="number" @keyup="handleKeyUp(index, $event)" :disabled="index !== 0">
          </div>
          <button class="button__recover" :class="{ active: isButtonActive }">Recuperar contraseña</button>
        </form>
        <button class="button__rsend">Reenviar código</button>
        <a href="/" class="cancelar">Cancelar</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
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
  border: 3px solid var(--secondary-color);
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
  transform: scale(1.04);
}

.content{
  height: 100%
}
.cancelar{
  color: #0056b3;
  text-align: center;
  transition: all 200ms ease-in-out;
  text-decoration: underline;
}
.cancelar:hover{
  color: var(--secondary-color);
}
</style>