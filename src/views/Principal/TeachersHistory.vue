<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import {APIS, APISEMPLOYEES, useEmployee} from '@/api/adminService.js';
import DependencyService from '@/scripts/Dependency.js';

// Estados para los modales y validaciones
const showModalEdit = ref(false);
const showModalNew = ref(false);
const errorMessage = ref(null);
const loading = ref(false);

// Estado de paginación y datos
const { employees, totalItems, totalPages, fetchEmployees, page } = useEmployee();
const currentPage = computed(() => page.value);
const itemsPerPage = 10;

// Funciones de paginación
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        page.value++;
    }
};

const previousPage = () => {
    if (currentPage.value > 1) {
        page.value--;
    }
};

// Servicios y validaciones adicionales
const dependencyService = new DependencyService();
const dependencies = ref([]);
const name = ref("");
const lastName = ref("");
const quantityPermissions = ref(0);
const rol = ref("");
const email = ref("");
const matricula = ref("");
const dependencyId = ref("");

const symbolOrNumberEntered = ref(false);

const toggleModalNew = () => {
    showModalNew.value = !showModalNew.value;
    if (errorMessage.value) {
        errorMessage.value = null; // Limpiar el mensaje de error si se abre el modal nuevamente
    }
    resetForm();
};

const checkForSymbols = () => {
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;
    if (symbolRegex.test(name.value) || symbolRegex.test(lastName.value)) {
        symbolOrNumberEntered.value = true;
        errorMessage.value = "No se permiten símbolos o números en el nombre y apellido.";
    } else {
        symbolOrNumberEntered.value = false;
        errorMessage.value = null; // Limpiar el mensaje de error si no hay símbolos o números
    }
};

const resetForm = () => {
    name.value = "";
    lastName.value = "";
    quantityPermissions.value = 0;
    rol.value = "";
    email.value = "";
    matricula.value = "";
    dependencyId.value = "";
    loading.value = false;
};

const validarEmail = () => {
    const emailPattern = /^[^\s@]+@(uacam\.mx|gmail\.com|outlook\.com)$/i;
    return emailPattern.test(email.value);
};

const formularioValido = computed(() => {
    return (
        name.value &&
        lastName.value &&
        rol.value &&
        quantityPermissions.value >= 0 && quantityPermissions.value <= 10 &&
        matricula.value &&
        dependencyId.value &&
        validarEmail() &&
        !symbolOrNumberEntered.value
    );
});

const searchQuery = ref('');

// Función para buscar empleado
const searchEmployee = async (nombre) => {
    const resultado = await APISEMPLOYEES.searchEmployee(nombre);
    if (resultado.success) {
        console.log('Datos del empleado:', resultado.data);
        employees.value = resultado.data.data;
    } else {
        console.error('Error al buscar el empleado:', resultado.data);
    }
};

const buscarEmpleado = () => {
    if (searchQuery.value.trim() === '') {
        fetchEmployees();
    } else {
        searchEmployee(searchQuery.value);
    }
};


const editEmployee = async () => {
    const response = await APIS.editPolice(selectedPolicyId.value, description.value);
    if (response.success) {
        showModalEdit.value = false;
        console.log('Política editada con éxito:', response.data);
        await fetchEmployees();
    } else {
        console.error('Error al editar la política:', response.data);
        error.value = response.data;
    }
};

const deleteEmployee = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
        const response = await APISEMPLOYEES.deleteEmployee(id);
        if (response.success) {
            console.log('Política eliminada con éxito:', response.data);
            await fetchEmployees();
        } else {
            console.error('Error al eliminar la política:', response.data);
            error.value = response.data;
        }
    }
};

onMounted(async () => {
    await fetchEmployees();
    const response = await dependencyService.getDependencies();
    dependencies.value = response.data;
});

const newEmployee = async () => {
    loading.value = true;
    try {
        const response = await APISEMPLOYEES.newEmployee(
            name.value,
            lastName.value,
            rol.value,
            quantityPermissions.value,
            matricula.value,
            dependencyId.value,
            email.value
        );
        if (response && response.success) {
            toggleModalNew();
            await fetchEmployees();
        } else {
            errorMessage.value = response ? response.message : 'Error al crear el docente';
        }
    } catch (error) {
        errorMessage.value = 'Error en la solicitud';
    } finally {
        loading.value = false;
    }
};

watch(quantityPermissions, (newVal) => {
    if (newVal > 10) {
        quantityPermissions.value = 10;
        errorMessage.value = 'No se pueden colocar más de 10 permisos';
    } else if (newVal < 0) {
        quantityPermissions.value = 0;
        errorMessage.value = 'No se permiten números negativos en la cantidad de permisos';
    } else {
        errorMessage.value = null; // Limpiar el mensaje de error si la cantidad de permisos es válida
    }
});
</script>

<template>
    <div class="layout">
        <div class="lay p-4">
            <header>
                <h1 class="header__title text-center">Empleados</h1>
            </header>
            <div class="main">
                <div class="main__header d-flex justify-content-between">
                    <input
                        v-model="searchQuery"
                        @input="buscarEmpleado"
                        placeholder="Buscar empleado por nombre"
                        class="form-control w-25"
                    />
                </div>
                <section class="main__policies w-100 mt-4">
                    <table class="table shadow-sm">
                        <thead>
                        <tr>
                            <th class="col-1">Matrícula</th>
                            <th class="col-2">Nombre</th>
                            <th class="col-2">Email</th>
                            <th class="col-2">Dependencia</th>
                            <th class="col-1">Rol</th>
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
                        </tr>
                        </tbody>
                    </table>
                </section>
                <nav aria-label="Page navigation example" class="mt-3 d-flex justify-content-end">
                    <ul class="pagination">
                        <li class="page-item">
                            <button class="page-link" style="color: var(--principal-color)!important;"
                                    @click="previousPage" :disabled="currentPage === 1">Anterior</button>
                        </li>
                        <li class="page-item">
                            <div class="page-link" style="color: var(--principal-color)!important;">{{ currentPage
                                }}</div>
                        </li>
                        <li class="page-item">
                            <div class="page-link" style="color: var(--principal-color)!important;">de</div>
                        </li>
                        <li class="page-item">
                            <div class="page-link" style="color: var(--principal-color)!important;">{{ totalPages }}
                            </div>
                        </li>
                        <li class="page-item">
                            <button class="page-link" style="color: var(--principal-color)!important;"
                                    @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>




<style>
.main__policies{
    height: 475px;
}


.pagination-controls button {
    margin: 0 5px;
}

.btn__new {
    background-color: var(--principal-color);
    color: var(--white-color);
}

.btn__new:hover {
    background-color: var(--grayy);
}

.bi {
    transition: color 200ms ease-in-out;
}

td:hover .bi {
    color: var(--secondary-color);
}

.modal {
    display: block !important;
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
    margin: 2% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
}

.close__modal {
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

.modal__edit-text {
    height: 200px;
    margin: 20px 0;
    resize: none;
    box-shadow: var(--bs-box-shadow-inset);
}

.buttons__edit {
    display: flex;
    justify-content: space-around;
}

.btn__cancel {
    background-color: var(--grayy);
    color: var(--white-color);
}

.btn__cancel:hover {
    background-color: var(--cancel-red);
}

.btn__submit {
    background-color: #758CA3;
    color: var(--white-color);
}

.btn__submit:hover {
    background-color: var(--principal-color);
}
</style>
