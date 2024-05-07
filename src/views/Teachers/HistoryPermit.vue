<script setup>

</script>

<template>
  <div class="layout">
    <header class="header__cordinacion p-4 mb-5">
      <h1 class="text-center">Historial de permísos</h1>
    </header>
    <div class="layout__table">
      <table class="table shadow-sm">
        <thead>
        <tr>
          <th scope="col" class="col-auto"></th>
          <th scope="col" class="col-5">Nombre</th>
          <th scope="col" class="col-2 text-center">Días solicitados</th>
          <th scope="col" class="col-2 text-center">Fechas</th>
          <th scope="col" class="col-2 text-center">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr class="align-content-center">
          <td class="text-lg-center align-content-center fw-bold text-body-secondary">
            <i class="bi bi-file-earmark-check-fill"></i>
          </td>
          <td class="align-content-center hoverTabla">Kevin Chan</td>
          <td class="text-center align-content-center">3</td>
          <td class="text-center align-content-center"><span>13/12/2023</span><span> | 14/12/2023</span> <span> | 13/12/2023</span></td>
          <td class="text-center align-content-center">Aceptado</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>