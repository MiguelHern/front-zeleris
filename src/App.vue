<script setup>

<<<<<<< HEAD
import Header__docente from "@/views/Layout/header.vue";
import GeneEcoPer_docente from "@/components/geneEcoPer_docente.vue";
import Sidebar_docente from "@/views/Layout/sidebar_docente.vue";
import Enter_code from "@/views/EnterCode.vue";
import Change_password from "@/views/change_password.vue";
import Recover__password from "@/views/ForgotPassword.vue";
import Menu_cordinacion_administrativa from "@/components/menu_cordinacion_administrativa.vue";
import Home_cordinacion_administrativa from "@/views/home_cordinacion_administrativa.vue";
import View_of_a_teacher from "@/views/view_of_a_teacher.vue";

</script>

<template>
<router-view></router-view>
=======
import Header__docente from "@/components/header__docente.vue";
import geneEcoPerComponent from "@/components/geneEcoPer_docente.vue";
</script>

<template>
  <router-view></router-view>
  <geneEcoPer_docente></geneEcoPer_docente>
>>>>>>> d56b26a974151a4c57d02663d55fc49432d73ad7
</template>

<style scoped>

</style>
