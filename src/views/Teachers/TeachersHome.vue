<template>
    <div class="layout">
        <header class="header__cordinacion d-flex justify-content-between p-4 mb-5">
            <div class="header__left">
                <a href="TeachersHome/Settings" class="header__settings">
                    <h1 class="header__user fs-4 fw-bold">
                        {{ employee.name }} {{ employee.lastName }}
                    </h1>
                    <i class="bi bi-gear-fill"></i>
                </a>
            </div>
            <div class="header__right d-flex align-items-baseline">
                <h2 class="header__user fs-5 fw-bold">Permisos económicos disponibles: <span>{{ employee.quantityPermissions }}</span></h2>
                <a href="TeachersHome/GenerarPermiso" class="btn btn__new  d-inline-block" style="margin-left: 30px" >Generar nuevo permiso</a>
            </div>
        </header>
        <div class="layout__table">
            <pending-permissions></pending-permissions>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PendingPermissions from "@/components/Teacher/PendingPermissions.vue";

const employee = ref({});

onMounted(async () => {
    try {
        const response = await fetch('https://service-teacher-zeleris.onrender.com/Employees/id', {
            headers: {
                Authorization: 'Bearer ' + localStorage.token
            },
        });
        const data = await response.json();
        employee.value = data.data;
    } catch (error) {
        console.error('Error al obtener la información del empleado:', error);
    }
});
</script>


<style scoped>
.btn__new{
  background-color: var(--grayy);
  color: var(--white-color);
}
.btn__new:hover{
  background-color: var(--principal-color);
}
.header__settings{
  display: flex;
  align-items: center;
  gap: 10px;
}
.header__settings:hover{
  color: var(--principal-color);
}

</style>
