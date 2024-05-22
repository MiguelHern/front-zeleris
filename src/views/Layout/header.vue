<script setup>

</script>

<template>
<header>
  <div class="container__img">
  <img src="/src/assets/img/ISCLogo.jpg" class="logo" style="max-width: 44px; max-height: 44px;">
  </div>
  <h1 class="header__company">Zeleris</h1>
  <h1 class="header__tipo">Coordinación de Ingeniería en Sistemas Computacionales</h1>
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