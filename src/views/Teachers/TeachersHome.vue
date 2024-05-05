<script>
export default{
  mounted() {
    console.log(localStorage.token);
  },
}
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
        <a href="TeachersHome/GenerarPermiso" class="btn btn__new  d-inline-block" style="margin-left: 30px" >Generar nuevo permiso</a>
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
          <td class="align-content-center hoverTabla" role="button">Kevin Chan</td>
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
.btn__new{
  background-color: var(--grayy);
  color: var(--white-color);
}
.btn__new:hover{
  background-color: var(--principal-color);
}
</style>
