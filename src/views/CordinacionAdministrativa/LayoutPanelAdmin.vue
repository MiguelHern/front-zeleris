<script setup>
import Header from "@/views/Layout/header.vue";
import router from "@/router/index.js";
import {onMounted, ref, watchEffect} from "vue";

const botonActivo = ref(null)

onMounted(()=>{
  obtenerBotonActivo();
})
const irHomeCordinacion = () => {
  router.push('/AdminHome')
}
const irPoliticas = () => {
  router.push('/Admin/Policies')
}
const irHistorial = () => {
  router.push('/Admin/History')
}

const verBotonActivo = (button) =>{
  botonActivo.value = button;
  localStorage.setItem('botonActivo', button)
}

const obtenerBotonActivo = () =>{
  const botonSaved = localStorage.getItem('botonActivo')
  botonActivo.value = botonSaved
}

watchEffect(() => {
  const rutaActual = router.currentRoute.value.path;
  const primerPath = rutaActual.split('/')[1]; // Corrección aquí
  switch (primerPath) { // Cambio de rutaActual a primerPath
    case "TeachersHome":
      verBotonActivo("TeachersHome");
      break;
    case "PoliciesTeacher":
      verBotonActivo("PoliciesTeacher");
      break;
    case "History":
      verBotonActivo("History");
      break;
  }
});

</script>

<template>
  <div class="container-fluid">
    <div class="row vh-100 flex-nowrap">
      <nav class="col-1 d-flex flex-column justify-content-between layout__aside" style="padding: 80px 0 0 0 ;">
        <ul class="menu__list">
          <li class="text-center botonNavegacion menu__option" @click="irHomeCordinacion" :class="{ active: botonActivo === 'TeachersHome' }">
            <i class="menu__icon bi bi-person-circle"></i>
            <span class="menu__overlay">Inicio</span>
          </li>
          <li class="text-center botonNavegacion menu__option" @click="irHistorial" :class="{ active: botonActivo === 'History' }">
            <i class="menu__icon bi bi-folder2"></i>
            <span class="menu__overlay">Permisos</span>
          </li>
          <li class="text-center botonNavegacion menu__option" @click="irPoliticas" :class="{ active: botonActivo === 'PoliciesTeacher' }">
            <i class="menu__icon bi bi-journal-x"></i>
            <span class="menu__overlay">Políticas</span>
          </li>
        </ul>
        <div class="botonSingOff">
          <svg class="signOff__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9995 13.9995L18.9995 9.9995M18.9995 9.9995L14.9995 5.99951M18.9995 9.9995H6.99946M10.9995 18.9995H4.20024C3.08014 18.9995 2.52009 18.9995 2.09226 18.7815C1.71594 18.5898 1.40998 18.2838 1.21823 17.9075C1.00024 17.4797 1.00024 16.9196 1.00024 15.7995V4.19951C1.00024 3.07941 1.00024 2.51935 1.21823 2.09153C1.40998 1.71521 1.71594 1.40925 2.09226 1.2175C2.52009 0.999512 3.08014 0.999512 4.20024 0.999512H10.9995" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </nav>
      <div class="col p-0">
        <Header></Header>
          <router-view/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.col-1{
  width: 70px;
}
.botonNavegacion:hover svg path {
  fill: #0d6efd;
  transition: .2s;
}
.botonNavegacion.active{
  cursor: default;
  color: var(--principal-color);
}

.botonNavegacion.active:hover svg path {
  fill: #758CA3;
}
.botonSingOff{
  width: 70px;
  height: 60px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.botonSingOff:hover{
}
.botonSingOff svg path{
  stroke: var(--grayy);
}
.botonSingOff:hover svg path{
  stroke: var(--principal-color);
}
.layout__aside{
  position: relative;
  border-right: 1px solid var(--grayy);
  height: 100%;
  min-height: 100%;
}
.menu__list{
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0; /* Eliminar el margen predeterminado de la lista */
  padding: 0;
  align-items: center;
}
.menu__overlay{
  position: absolute;
  left: 0;
  margin-top: -3rem;
  padding: 0.5rem 1rem;
  display: block;
  color: var(--white-color);
  opacity: 0;
  background-color: var(--principal-color);
  white-space: nowrap;
  transition: all 300ms ease-in-out;
  z-index: 3;
}
.menu__option{
  width: 100%;
  cursor: pointer;
}
.menu__option:hover .menu__overlay{
  opacity: 1;
  left: 100%;
}
.menu__icon{
  color: var(--grayy);
  font-size: 2rem;
  transition: all 300ms ease-in-out;
}
.menu__option:hover .menu__icon,
.menu__link--active .menu__icon{
  color: var(--principal-color);
}

</style>