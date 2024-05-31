<script setup>
import Footer from "@/components/Footer.vue";
import TableHistory from "@/components/Teacher/TableHistory.vue";
import { ref, onMounted } from 'vue';
import PendingPermissions from "@/components/Teacher/PendingPermissions.vue";

const history = ref({});
const noHistory = ref(false);


</script>

<template>
  <div class="layout">
    <header class="header__cordinacion p-4 mb-0">
      <h2 class="text-center">Historial de permisos</h2>
    </header>
      <main class="d-flex flex-column p-3  scrollable-content">
          <div class="pending">
              <header class="history__header">
                  <h1 class="fs-3" style="margin-bottom: 10px;">Permisos pendientes</h1>
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
      <Footer></Footer>
  </div>
</template>

<style scoped>
.scrollable-content {
  max-height: 400px; /* Ajusta la altura máxima según tus necesidades */
  overflow-y: auto;
}
</style>