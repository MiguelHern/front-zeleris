<script setup>
import Header__docente from "@/views/Layout/header.vue";
import Sidebar_docente from "@/views/Layout/sidebar_docente.vue";
import Menu_cordinacion_administrativa from "@/components/menu_cordinacion_administrativa.vue";

</script>

<template>
  <div class="background">
  <div class="container">
    <div class="header">
      <header__docente></header__docente>
    </div>
    <div class="sidebar">
      <sidebar_docente></sidebar_docente>
    </div>
    <div class="menu">
      <menu_cordinacion_administrativa></menu_cordinacion_administrativa>
    </div>
    <div class="bodyh">
      <enter_code></enter_code>
    </div>
  </div>
  </div>
</template>

<style scoped>
.background{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.container {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto 100%; /* Cambié el tercer valor a 1fr para que ocupe el resto del espacio */
  grid-template-rows: auto auto 1fr;
  grid-auto-flow: row;
  grid-template-areas:
    "header header header"
    "sidebar menu bodyh";
}

.header { grid-area: header; }

.sidebar { grid-area: sidebar; }

.menu { grid-area: menu;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  width: 350px;
}

.bodyh {
  grid-area: bodyh;
  background-color: #1B365D;
}

</style>
