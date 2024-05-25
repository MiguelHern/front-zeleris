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
      <h1 class="text-center">Historial de permisos</h1>
    </header>
      <main class="d-flex flex-column p-3">
          <div class="pending">
              <header class="history__header">
                  <h1 class="fs-3">Permisos pendientes</h1>
              </header>
              <div class="layout__table">
                  <pending-permissions></pending-permissions>
              </div>
          </div>
          <div class="history">
              <header class="history__header">
                  <h1 class="fs-3">Historial</h1>
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

</style>