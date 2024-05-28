<template>
    <div class="accordion" id="accordionExample"></div>
    <div class="layout">
        <div class="lay p-4">
            <header>
                <h1 class="header__title text-center">Empleados</h1>
            </header>
            <div class="main">
                <div class="main__header text-end">
                    <button class="btn btn__new " @click="toggleModalNew">Agregar empleado</button>
                </div>
                <section class="main__policies w-100 h-75">
                    <table class="table shadow-sm">
                        <thead>
                        <tr>
                            <th class="col-1">Matrícula</th>
                            <th class="col-2">Nombre</th>
                            <th class="col-2">Email</th>
                            <th class="col-3">Dependencia</th>
                            <th class="col-3">Rol</th>
                            <th scope="col" class="col-1">Editar</th>
                            <th scope="col" class="col-1">Eliminar</th>
                        </tr>
                        </thead>
                        <i v-if="loading" class="c-inline-spinner"></i>
                        <tbody>
                        <tr v-for="employee in employees" :key="employee.id">
                            <td>{{ employee.matricula }}</td>
                            <td><span>{{ employee.name }}</span><span> {{ employee.lastName }}</span></td>
                            <td>{{ employee.email }}</td>
                            <td>{{ employee.dependency }}</td>
                            <td>{{ employee.rol }}</td>
                            <td class="align-content-center" role="button" @click="toggleModalEdit(police.id, police.description)">
                                <i class="bi bi-pencil-square"></i>
                            </td>
                            <td class="align-content-center" role="button" @click="deletePolice(police.id)">
                                <i class="bi bi-trash3-fill"></i>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example" class="d-flex justify-content-end">
                        <ul class="pagination">
                            <li  class="page-item"><button class="page-link" style="color: var(--principal-color)!important;" @click="previousPage" :disabled="currentPage === 1">Anterior</button></li>
                            <li class="page-item"><div class="page-link" style="color: var(--principal-color)!important;">{{ currentPage }}</div></li>
                            <li class="page-item"><div class="page-link" style="color: var(--principal-color)!important;">de</div></li>
                            <li class="page-item"><div class="page-link" style="color: var(--principal-color)!important;">{{ totalPages }}</div></li>
                            <li class="page-item"><button class="page-link" style="color: var(--principal-color)!important;" @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button></li>
                        </ul>
                    </nav>
                </section>
            </div>
        </div>
    </div>

    <!--Ventana emergente para modificar política-->
    <div v-if="showModalEdit" class="modal">
        <div class="modal-content">
            <div class="close__modal">
                <span class="close" @click="toggleModalEdit">&#x2716;</span>
            </div>
            <h3 class="text-center">Modificar política</h3>
            <form @submit.prevent="editPolice">
                <textarea v-model="description" class="form-control modal__edit-text"></textarea>
                <div class="buttons__edit">
                    <button type="button" @click="toggleModalEdit" class="btn__cancel btn">Cancelar</button>
                    <input type="submit" class="btn btn__submit" value="Guardar" />
                </div>
            </form>
        </div>
    </div>

    <!--Ventana emergente para agregar política-->
    <div v-if="showModalNew" class="modal">
        <div class="modal-content">
            <div class="close__modal">
                <span class="close" @click="toggleModalNew">&#x2716;</span>
            </div>
            <h3 class="text-center">Agregar política</h3>
            <form @submit.prevent=" newPolice">
                <textarea v-model="description" class="form-control modal__edit-text"></textarea>
                <div class="buttons__edit">
                    <button type="button" @click="toggleModalNew" class="btn__cancel btn">Cancelar</button>
                    <input type="submit" class="btn btn__submit" value="Guardar" />
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref, watchEffect} from 'vue';

const showModalEdit = ref(false);
const showModalNew = ref(false);
const description = ref('');
const selectedPolicyId = ref(null);
const error = ref(null);

const toggleModalEdit = (id, currentDescription) => {
    selectedPolicyId.value = id;
    description.value = currentDescription;
    showModalEdit.value = !showModalEdit.value;
};

const toggleModalNew = () => {
    showModalNew.value = !showModalNew.value;
};

import { useEmployee } from '@/api/adminService.js';

const currentPage = ref(1);
const itemsPerPage = 10;
const { employees, totalItems, totalPages, fetchEmployees, loading  } = useEmployee(currentPage.value, itemsPerPage);

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchEmployees();
    }
};

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchEmployees();
    }
};

// Use watchEffect to re-fetch employees when currentPage changes
watchEffect(() => {
    fetchEmployees();
});

</script>

<style>
.pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.pagination-controls button {
    margin: 0 5px;
}
.btn__new{
    background-color: var(--principal-color);
    color: var(--white-color);
}
.btn__new:hover{
    background-color: var(--grayy);
}
.bi{
    transition: color 200ms ease-in-out;
}
td:hover .bi{
    color: var(--secondary-color);
}

.modal {
    display: block!important;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.4);

}

.modal-content {
    background-color: #fefefe;
    margin: 12% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
}
.close__modal{
    text-align: right;
}
.close {
    text-align: right;
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
.modal__edit-text{
    height: 200px;
    margin: 20px 0;
    resize: none;
    box-shadow: var(--bs-box-shadow-inset);
}
.buttons__edit{
    display: flex;
    justify-content: space-around;
}
.btn__cancel{
    background-color: var(--grayy);
    color: var(--white-color);
}
.btn__cancel:hover{
    background-color: var(--cancel-red);
}
.btn__submit{
    background-color: #758CA3;
    color: var(--white-color);
}
.btn__submit:hover{
    background-color: var(--principal-color);
}
</style>
