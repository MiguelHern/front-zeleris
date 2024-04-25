<script setup>

</script>

<template>
  <div class="layout">
    <header class="header__cordinacion d-flex justify-content-between p-4 mb-5">
      <div class="header__left">
        <h1 class="header__user fs-4 fw-bold">
          Kevin Chan Guzman
        </h1>
      </div>
      <div class="header__right d-flex align-items-baseline">
        <h2 class="header__user fs-5 fw-bold">Permisos económicos disponibles: <span>2</span></h2>
        <button class="btn btn-primary d-inline-block" style="margin-left: 30px" @click="">Generar nuevo permiso</button>
      </div>
    </header>
    <div class="layout__table">
      <table class="table shadow-sm">
        <thead>
        <tr>
          <th scope="col" class="col-auto"></th>
          <th scope="col" class="col-5">Nombre</th>
          <th scope="col" class="col-2 text-center">Días solicitados</th>
          <th scope="col" class="col-2 text-center">Fecha</th>
          <th scope="col" class="col-2 text-center">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr class="align-content-center">
          <td class="text-lg-center align-content-center fw-bold text-body-secondary">
            <i class="bi bi-file-earmark-check-fill"></i>
          </td>
          <td class="align-content-center hoverTabla" role="button">Epson Dzec Cock</td>
          <td class="text-center">3</td>
          <td class="text-center">13/12/2023</td>
          <td class="text-center">Aceptado</td>

        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>