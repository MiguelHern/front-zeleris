<script setup>

import Header__docente from "@/views/Layout/header.vue";
import GeneEcoPer_docente from "@/components/geneEcoPer_docente.vue";
import Sidebar_docente from "@/views/Layout/sidebar_docente.vue";
import Enter_code from "@/views/EnterCode.vue";
import Change_password from "@/views/change_password.vue";
import Recover__password from "@/views/ForgotPassword.vue";
import Menu_cordinacion_administrativa from "@/components/menu_cordinacion_administrativa.vue";
import Home_cordinacion_administrativa from "@/views/home_cordinacion_administrativa.vue";

import view_teachers_administration from "./views/CordinacionAdministrativa/view_teachers_administration.vue";
</script>

<template>
<Header__docente></Header__docente>
<view_teachers_administration></view_teachers_administration>
</template>

<style scoped>

</style>
