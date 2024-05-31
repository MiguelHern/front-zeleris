<script setup>
import Footer from "@/components/Footer.vue";
import TableHistory from "@/components/Teacher/TableHistory.vue";
import { ref, onMounted } from 'vue';
import PendingPermissions from "@/components/Teacher/PendingPermissions.vue";

const history = ref({});
const noHistory = ref(false);


</script>

<template>
    <div class="contenedor__router p-3">
        <div class="card router__card">
        <header class="header__cordinacion p-4 mb-0">
            <h1 class="text-center">Historial de permisos</h1>
            <div class="d-flex justify-content-end">
                <a class="btn btn-primary" href="/Cordination/RequestPermit">
                    Pedir permisos
                </a>
            </div>
        </header>
        <main class="d-flex flex-column p-3 scrollable-content">
            <div class="pending">
                <header class="history__header">
                    <h1 class="fs-3"  style="margin-bottom: 10px;">Permisos pendientes</h1>
                </header>
                <div class="layout__table">
                    <pending-permissions></pending-permissions>
                </div>
            </div>
            <div class="history">
                <header class="history__header">
                    <h1 class="fs-3" style="margin-bottom: 10px; margin-top: 10px;">Historial</h1>
                </header>
                <div class="layout__table">
                    <table-history></table-history>
                </div>
            </div>

        </main>
    </div>
    </div>
</template>

<style scoped>
.contenedor__router {
    height: calc(100vh - 100px);
}
.router__card{
    background-color: #F5F5F5;
    height: 100%;
}
.scrollable-content {
  max-height: 400px; /* Ajusta la altura máxima según tus necesidades */
  overflow-y: auto;
}
</style>