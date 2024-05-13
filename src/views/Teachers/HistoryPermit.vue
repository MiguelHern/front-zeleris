<script setup>
import TableHistory from "@/components/Teacher/TableHistory.vue";
import { ref, onMounted } from 'vue';

const history = ref({});
const noHistory = ref(false);

onMounted(async () => {
    try {
        const response = await fetch('https://service-teacher-zeleris.onrender.com/Documents/history', {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            },
        });
        const data = await response.json();
        if (data && data.success === false && data.message === "No leave history found for the specified employee") {
            console.log("No hay documentos pendientes en este momento.");
            noHistory.value = true;
            console.log(('No jalo'))
        }
        history.value = data.data;
        console.log(data)
    } catch (error) {
        console.error('Error al obtener la información del empleado:', error);
    }
});
</script>

<template>
  <div class="layout">
    <header class="header__cordinacion p-4 mb-5">
      <h1 class="text-center">Historial de permisos</h1>
    </header>
    <div class="layout__table">
        <table-history></table-history>
    </div>
  </div>
</template>

<style scoped>

</style>