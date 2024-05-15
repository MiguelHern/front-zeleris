<script setup>

import RequestTray_coordinacion from "@/components/requestTray_coordinacion.vue";
import SeePermit_coordinacion from "@/components/seePermit_coordinacion.vue";
import PendingApprovedTable from "@/components/PendingApprovedTable.vue";
</script>

<template>
  <div class="layout d-flex">
    <PendingApprovedTable></PendingApprovedTable>
    <!--<div class="left col-3">
      <request-tray_coordinacion></request-tray_coordinacion>
    </div>
    <div class="layout__right col-9">
      <see-permit_coordinacion></see-permit_coordinacion>
    </div>-->
  </div>
</template>

<style scoped>

</style>