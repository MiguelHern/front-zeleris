<script setup>

</script>

<template>
  <div class="layout">
    <div class="lay p-4">
      <header>
        <h1 class="header__title text-center">
          Políticas
        </h1>
      </header>
      <div class="main">
        <div class="main__header text-end">
          <button href="TeachersHome/GenerarPermiso" class="btn btn__new d-inline-block" @click="">Generar nuevo permiso</button>
        </div>
        <section class="main__policies w-100">
          <table class="table shadow-sm">
            <thead>
            <tr>
              <th scope="col" class="col-10"></th>
              <th scope="col" class="col-1"></th>
              <th scope="col" class="col-1 text-center"></th>
            </tr>
            </thead>
            <tbody>
            <tr class="align-content-center">
              <td class="">
                <span class="">Deberá informar cuando sea posible debido a que aja se portó mal porque debió haber ido.....</span>
              </td>
              <td class="align-content-center text-center" role="button">
                <i class="bi bi-pencil-square"></i>
              </td>
              <td class="align-content-center text-center" role="button">
                <i class="bi bi-trash3-fill"></i>
              </td>
            </tr>
            </tbody>
          </table>
        </section>
      </div>
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
.bi{
  transition: color 200ms ease-in-out;
}
td:hover .bi{
  color: var(--secondary-color);
}
</style>