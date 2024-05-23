<script setup>
import { ref, onMounted } from 'vue';

const userRole = ref(null);

onMounted(() => {
  // Obtener el rol del usuario del almacenamiento local
  const storedUserRole = localStorage.getItem('rol');
  if (storedUserRole) {
    userRole.value = storedUserRole;
  }
});
</script>

<template>
<header>
  <div class="container__img">
    <img src="/src/assets/img/ISCLogo.jpg" class="logo" style="max-width: 44px; max-height: 44px;">
  </div>
  <h1 class="header__company">Zeleris</h1>
  <!-- Mostrar el mensaje dependiendo del rol del usuario -->
  <h1 v-if="userRole === 'Docente'" class="header__tipo">Docente</h1>
  <h1 v-else-if="userRole === 'Admin'" class="header__tipo">Coordinador(a) administrativo(a)</h1>
  <h1 v-else-if="userRole === 'Coordinador'" class="header__tipo">Coordinador(a) de carrera</h1>
  <h1 v-else-if="userRole === 'Director'" class="header__tipo">Director de la Facultad</h1>
  <!-- Si el rol no coincide con ninguno de los anteriores, puedes mostrar un mensaje genérico -->
  <h1 v-else class="header__tipo">Rol no especificado</h1>
</header>
</template>


<style scoped>
header{
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--grayy);
}
.logo{
  pointer-events: none;
}
.container__img{
  padding: 3px 8px 3px 10px;
}
.header__company{
  font-size: 1.6rem;
  margin-right: 1.2rem;
}
.header__tipo{
  font-size: 1.4rem;
}

</style>