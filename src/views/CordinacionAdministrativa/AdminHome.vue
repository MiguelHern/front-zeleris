<script setup>

import Menu_cordinacion_administrativa from "@/components/menu_cordinacion_administrativa.vue";
import SeePermit_coordinacion from "@/components/seePermit_coordinacion.vue";
</script>

<template>
<div class="layout overflow-hidden d-flex">
  <div class="layout__left col-3 overflow-auto">
    <menu_cordinacion_administrativa></menu_cordinacion_administrativa>
  </div>
  <div class="layout__right col-9">
    <see-permit_coordinacion></see-permit_coordinacion>
  </div>
</div>
</template>

<style scoped>
.layout__left{
  scrollbar-width: thin;
}
</style>