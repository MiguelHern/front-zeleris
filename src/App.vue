<script setup>
import SeePermit_coordinacion from "@/components/seePermit_coordinacion.vue";
import Header__docente from "@/components/header__docente.vue";
import GeneEcoPer_docente from "@/components/geneEcoPer_docente.vue";
import RequestTray_coordinacion from "@/components/requestTray_coordinacion.vue";
import TeachingInformation_docente from "@/components/teachingInformation_docente.vue";


</script>

<template>
  <div>
    <!--<RequestTray_coordinacion/>-->
    <!--<gene-eco-per_docente></gene-eco-per_docente>-->
    <!--<SeePermit_coordinacion/>-->
    <TeachingInformation_docente/>
    
  </div>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;

  main{
    flex: 1 1 0;
    padding: 2rem;
    
  }
}
</style>
