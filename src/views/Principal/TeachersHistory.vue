<template>
    <div class="layout">
        <div class="lay p-4">
            <header>
                <h1 class="header__title text-center">Empleados</h1>
            </header>
            <div class="main mt-5 h-75">
                <section class="main__policies w-100 h-100">
                    <table class="table shadow-sm">
                        <thead>
                            <tr>
                                <th class="col-1">Matrícula</th>
                                <th class="col-3">Nombre</th>
                                <th class="col-3">Email</th>
                                <th class="col-3">Dependencia</th>
                                <th class="col-3">Rol</th>
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
                <nav aria-label="Page navigation example" class="d-flex justify-content-end">
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

    <!--Ventana emergente para modificar política-->
    <div v-if="showModalEdit" class="modal">
        <div class="modal-content">
            <div class="close__modal">
                <span class="close" @click="toggleModalEdit">&#x2716;</span>
            </div>
            <h3 class="text-center">Modificar política</h3>
            <form @submit.prevent="editEmployee">
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
            <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
                {{ errorMessage }}
            </div>
            <div class="close__modal">
                <span class="close" @click="toggleModalNew">&#x2716;</span>
            </div>
            <h3 class="text-center">Agregar docente</h3>
            <form @submit.prevent="newEmployee">
                <div class="mb-3">
                    <label for="name" class="form-label">Nombre:</label>
                    <input v-model="name" id="name" type="text" class="form-control" placeholder="Nombre" required
                        pattern="[A-Za-z ]+" title="Solo letras y espacios, sin números ni símbolos"
                        @input="checkForSymbols">
                </div>
                <div class="mb-3">
                    <label for="lastName" class="form-label">Apellido:</label>
                    <input v-model="lastName" id="lastName" type="text" class="form-control" placeholder="Apellido"
                        required pattern="[A-Za-z ]+" title="Solo letras y espacios, sin números ni símbolos"
                        @input="checkForSymbols">
                </div>
                <div class="mb-3">
                    <label for="rol" class="form-label">Rol:</label>
                    <select v-model="rol" id="rol" class="form-control">
                        <option disabled value="">Seleccione un rol</option>
                        <option value="Director">Director</option>
                        <option value="Docente">Docente</option>
                        <option value="Coordinador">Coordinador de carrera</option>
                        <option value="Admin">Coordinador administrativo</option>
                        <option value="Administrativo">Administrativo</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="quantityPermissions" class="form-label">Cantidad de Permisos:</label>
                    <input v-model.number="quantityPermissions" id="quantityPermissions" type="number"
                        class="form-control" placeholder="Cantidad de Permisos" min="0" max="10" required>
                </div>
                <div class="mb-3">
                    <label for="matricula" class="form-label">Número de empleado:</label>
                    <input v-model="matricula" id="matricula" type="number" class="form-control" placeholder="Matrícula"
                        required>
                </div>
                <div class="mb-3">
                    <label for="dependencyId" class="form-label">ID de Dependencia:</label>
                    <select v-model="dependencyId" id="dependencyId" class="form-control" required>
                        <option disabled value="">Seleccione una dependencia</option>
                        <option v-for="dependency in dependencies" :key="dependency.id" :value="dependency.id">
                            {{ dependency.name }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Correo Electrónico:</label>
                    <input v-model="email" id="email" type="email" class="form-control" placeholder="Correo Electrónico"
                        required>
                    <small v-if="email.value && !validarEmail()" class="text-danger">El correo electrónico no es
                        válido.</small>
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button :disabled="!formularioValido" type="submit" class="btn btn-primary">
                        <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        <span v-if="!loading">Enviar</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { APISEMPLOYEES, useEmployee } from '@/api/adminService.js';
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


<style>
.pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
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
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
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