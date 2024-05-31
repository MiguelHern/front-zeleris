<script setup>
import Header from "@/views/Layout/header.vue";
import router from "@/router/index.js";
import { onMounted, ref, watchEffect } from "vue";

const botonActivo = ref(null);
const loading = ref(false); // Variable para controlar la ventana de carga

onMounted(() => {
    obtenerBotonActivo();
});

const irHomeTeachers = () => {
    router.push('/TeachersHome');
};

const irPoliticas = () => {
    router.push('/Teacher/Policies');
};

const irHistorial = () => {
    router.push('/Teacher/History');
};

const verBotonActivo = (button) => {
    botonActivo.value = button;
    localStorage.setItem('botonActivo', button);
};

const obtenerBotonActivo = () => {
    const botonSaved = localStorage.getItem('botonActivo');
    botonActivo.value = botonSaved;
};

const cerrarSesion = async () => {
    loading.value = true;
    try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación de espera de 1 segundo
        localStorage.removeItem('token');
        if (!localStorage.getItem('token')) {
            console.log('Token eliminado correctamente.');
        } else {
            console.error('Error al eliminar el token.');
        }
        router.replace('/');
        history.replaceState(null, '', '/');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    } finally {
        loading.value = false;
    }
};

watchEffect(() => {
    const rutaActual = router.currentRoute.value.path;
    const primerPath = rutaActual.split('/')[1];
    switch (primerPath) {
        case "TeachersHome":
            verBotonActivo("TeachersHome");
            break;
        case "Teacher":
            if (rutaActual.includes("Policies")) {
                verBotonActivo("PoliciesTeacher");
            } else if (rutaActual.includes("History")) {
                verBotonActivo("History");
            }
            break;
    }
});
</script>


<template>
    <div class="container-fluid">
        <!-- Ventana de carga -->
        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
        </div>
        <div class="row vh-100 flex-nowrap">
            <nav class="col-1 d-flex flex-column justify-content-between layout__aside" style="padding: 80px 0 0 0 ;">
                <img src="/src/assets/img/UACLogo.jpg" class="logouac" style="max-width: 60px; max-height: 60px;">
                <ul class="menu__list">
                    <li class="text-center botonNavegacion menu__option" @click="irHomeTeachers"
                        :class="{ active: botonActivo === 'TeachersHome' }">
                        <i class="menu__icon bi bi-house"></i>
                        <span class="menu__overlay">Inicio</span>
                    </li>
                    <li class="text-center botonNavegacion menu__option" @click="irHistorial"
                        :class="{ active: botonActivo === 'History' }">
                        <i class="menu__icon bi bi-folder2"></i>
                        <span class="menu__overlay">Permisos</span>
                    </li>
                    <li class="text-center botonNavegacion menu__option" @click="irPoliticas"
                        :class="{ active: botonActivo === 'PoliciesTeacher' }">
                        <i class="menu__icon bi bi-journal-x"></i>
                        <span class="menu__overlay">Políticas</span>
                    </li>
                </ul>
                <a class="botonSingOff" @click.prevent="cerrarSesion">
                    <svg class="signOff__icon" width="20" height="20" viewBox="0 0 20 20" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.9995 13.9995L18.9995 9.9995M18.9995 9.9995L14.9995 5.99951M18.9995 9.9995H6.99946M10.9995 18.9995H4.20024C3.08014 18.9995 2.52009 18.9995 2.09226 18.7815C1.71594 18.5898 1.40998 18.2838 1.21823 17.9075C1.00024 17.4797 1.00024 16.9196 1.00024 15.7995V4.19951C1.00024 3.07941 1.00024 2.51935 1.21823 2.09153C1.40998 1.71521 1.71594 1.40925 2.09226 1.2175C2.52009 0.999512 3.08014 0.999512 4.20024 0.999512H10.9995"
                            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </nav>
            <div class="col p-0">
                <Header></Header>
                <div class="contenedor__router p-3">
                    <div class="card router__card">
                        <router-view/>
                    </div>
                </div>
                <div class="main-footer">
                    <div class="footer_">
                        <div class="footer-content">
                            <div class="footer-text">
                                <div>© 2024 Copyright Universidad Autónoma de Campeche.</div>
                                <div>Desarrollado por Zeleris Team</div>
                            </div>
                            <div class="containerContact">
                                <div id="contactmail" style="display: flex;">
                                    <i id="iconContact" class="bi bi-envelope-at"></i>
                                    <label id="labelContact_1">Contactanos: al066225@uacam.mx</label>
                                </div>
                                <div id="contactphone" style="display: flex;">
                                    <i class="bi bi-telephone"></i>
                                    <label id="labelContact_2">Llamanos: +52 1 938 255 2500</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.contenedor__router {
    height: calc(100vh - 100px);
}
.router__card {
    background-color: #F5F5F5;
    height: 100%;
}
.logouac {
    margin-left: 5px;
    margin-top: -74px;
    text-align: start;
    justify-self: flex-start;
}

.col-1 {
    width: 70px;
}

.botonNavegacion.active .menu__icon {
    cursor: default;
    color: var(--principal-color);
}
.botonNavegacion.active{
    cursor: default;
}
.botonNavegacion.active .menu__overlay{
    display: none;
}

.botonNavegacion.active:hover svg path {
    fill: #758CA3;
}

.botonSingOff {
    width: 70px;
    height: 60px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.botonSingOff svg path {
    stroke: var(--grayy);
}

.botonSingOff:hover svg path {
    stroke: var(--principal-color);
}

.layout__aside {
    position: relative;
    border-right: 1px solid var(--grayy);
    height: 100%;
    min-height: 100%;
}

.menu__list {
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    /* Eliminar el margen predeterminado de la lista */
    padding: 0;
    align-items: center;
}

.menu__overlay {
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

.menu__option {
    width: 100%;
    cursor: pointer;
}

.menu__option:hover .menu__overlay {
    opacity: 1;
    left: 100%;
}

.menu__icon {
    color: var(--grayy);
    font-size: 2rem;
    transition: all 300ms ease-in-out;
}

.menu__option:hover .menu__icon,
.menu__link--active .menu__icon {
    color: var(--principal-color);
}

/* Estilos para la ventana de carga */
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