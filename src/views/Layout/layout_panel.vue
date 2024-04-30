<script setup>
import Header from "@/views/Layout/header.vue";
import router from "@/router/index.js";
import {onMounted, ref, watchEffect} from "vue";

const botonActivo = ref(null)

onMounted(()=>{
  obtenerBotonActivo();
})
const irHomeCordinacion = () => {
  router.push('/HomeCordinacion')
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
    case "HomeCordinacion":
      verBotonActivo("HomeCordinacion");
      break;
  }
});

</script>

<template>
  <div class="container-fluid">
    <div class="row vh-100 ">
      <nav class="col-1 d-flex flex-column justify-content-between layout__aside" style="padding: 80px 0 0 0 ;">
        <ul class="menu__list">
          <li class="botonNavegacion menu__option" @click="irHomeCordinacion" :class="{ active: botonActivo === 'HomeCordinacion' }">
            <i class="menu__icon bi bi-person-circle"></i>
            <span class="menu__overlay">Inicio</span>
          </li>
          <li class="botonNavegacion2 menu__option" @click="ir" :class="{ active: botonActivo === 'Personas' }">
            <i class="menu__icon bi bi-folder2"></i>
            <span class="menu__overlay">Permisos</span>
          </li>
          <li class="botonNavegacion menu__option" @click="irCalendario" :class="{ active: botonActivo === 'Calendario' }">
            <i class="menu__icon bi bi-journal-x"></i>
            <span class="menu__overlay">Políticas</span>
          </li>
        </ul>
        <div class="botonSingOff">
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 10.5323C12.2252 10.5324 12.4481 10.4882 12.6562 10.4021C12.8642 10.316 13.0532 10.1897 13.2125 10.0305C13.3717 9.8713 13.4979 9.68227 13.584 9.47423C13.6701 9.26619 13.7144 9.04322 13.7143 8.81807V1.96107C13.7143 1.50643 13.5337 1.0704 13.2122 0.748918C12.8907 0.427434 12.4547 0.246826 12 0.246826C11.5454 0.246826 11.1093 0.427434 10.7879 0.748918C10.4664 1.0704 10.2858 1.50643 10.2858 1.96107V8.81807C10.2856 9.04322 10.3299 9.26619 10.416 9.47423C10.5021 9.68227 10.6284 9.8713 10.7876 10.0305C10.9468 10.1897 11.1358 10.316 11.3438 10.4021C11.5519 10.4882 11.7749 10.5324 12 10.5323Z" fill="#0062FF"/>
            <path d="M20.0021 6.81088C19.6632 6.51043 19.2193 6.35625 18.7672 6.38202C18.315 6.40778 17.8915 6.6114 17.589 6.94841C17.2865 7.28541 17.1296 7.72842 17.1527 8.18068C17.1757 8.63295 17.3768 9.05773 17.7119 9.36226C18.6103 10.1504 19.3301 11.1213 19.8232 12.2099C20.3163 13.2986 20.5713 14.48 20.5712 15.6751C20.5712 17.9483 19.6682 20.1285 18.0608 21.7359C16.4534 23.3433 14.2732 24.2463 12 24.2463C9.72676 24.2463 7.54664 23.3433 5.93922 21.7359C4.3318 20.1285 3.42876 17.9483 3.42876 15.6751C3.42865 14.48 3.68366 13.2986 4.17676 12.2099C4.66985 11.1212 5.38966 10.1503 6.28807 9.36217C6.62324 9.05764 6.82429 8.63286 6.84733 8.1806C6.87036 7.72833 6.7135 7.28532 6.41101 6.94832C6.10851 6.61132 5.68496 6.4077 5.23284 6.38193C4.78072 6.35616 4.33677 6.51034 3.99794 6.8108C2.18705 8.43126 0.910812 10.5633 0.338067 12.9249C-0.234678 15.2865 -0.076935 17.7664 0.790427 20.0364C1.65779 22.3064 3.19389 24.2596 5.19551 25.6375C7.19713 27.0154 9.56993 27.7532 12 27.7532C14.4301 27.7532 16.8029 27.0154 18.8045 25.6375C20.8061 24.2596 22.3422 22.3064 23.2096 20.0364C24.0769 17.7664 24.2347 15.2865 23.6619 12.9249C23.0892 10.5633 21.8129 8.43134 20.0021 6.81088Z" fill="#0062FF"/>
          </svg>
        </div>
      </nav>
      <div class="col p-0">
        <Header></Header>
        <main class="row w-100 m-0 p-0 " style="height: calc(100% - 58px)">
          <router-view/>
        </main>
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
  background-color: #0d6efd;
  transition: .2s;
}
.botonSingOff:hover svg path{
  fill: white;
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
  color: var(--principal-color);
  opacity: 0;
  background-color: var(--secondary-color);
  white-space: nowrap;
  transition: all 300ms ease-in-out;
  z-index: 3;
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