<script setup>
import {computed, onMounted, ref} from 'vue';
import {APIS, APISDEPENDENCE, useDependencies, useEmployee} from "@/api/adminService.js";

const {employees} = useEmployee();
const selectedEmployeeId = ref(null);

const selectedEmployeeName = computed(() => {
    if (selectedEmployeeId.value === null) {
        return 'Ninguno';
    }
    const employee = employees.value.find(emp => emp.id === selectedEmployeeId.value);
    return employee ? employee.name : 'Ninguno';
});
const handleSelect = () => {
    console.log('Empleado seleccionado ID:', selectedEmployeeId.value);
};
const isPhoneValid = computed(() => phone.value.length >= 10);

const showModalEdit = ref(false);
const showModalNew = ref(false);
const selectedDependenceId = ref(null);
const error = ref(null);
const loading = ref(true);
const name = ref('');
const phone = ref('');
const description = ref('');

const toggleModalEdit = (id) => {
    selectedDependenceId.value = id;
    showModalEdit.value = !showModalEdit.value;
};

const toggleModalNew = () => {
    showModalNew.value = !showModalNew.value;
};

const dependencies = ref({});

const loadDependencies = async () => {
    loading.value = true
    const {data, success, error: fetchError} = await useDependencies();
    if (success) {
        dependencies.value = data.data;
        loading.value = false;
    } else {
        console.error('Error al obtener las políticas:', fetchError);
        error.value = fetchError;
    }
};

const newDependence = async () => {
    const response = await APISDEPENDENCE.newDependence(name.value, phone.value, selectedDependenceId.value);
    console.log(response);
    showModalNew.value = false;
    await loadDependencies();
};
/*
const editDependence = async () => {
    const response = await APISDEPENDENCE.editDependence(name.value, phone.value, selectedDependenceId.value);
    if (response.success) {
        showModalEdit.value = false;
        console.log('Política editada con éxito:', response.data);
        await loadDependencies();
    } else {
        console.error('Error al editar la política:', response.data);
        error.value = response.data;
    }
};
*/
const deleteDependence = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta política?')) {
        const response = await APISDEPENDENCE.deleteDependence(id);
        if (response.success) {
            console.log('Política eliminada con éxito:', response.data);
            await loadDependencies();
        } else {
            console.error('Error al eliminar la política:', response.data);
            error.value = response.data;
        }
    }
};

onMounted(async () => {
    await loadDependencies();
});

</script>

<template>
    <div class="accordion" id="accordionExample"></div>

    <div class="layout">
        <div class="lay p-4">
            <header>
                <h1 class="header__title text-center">Dependencias</h1>
            </header>
            <div class="main">
                <div class="main__header text-end">
                    <button class="btn btn__new d-inline-block" @click="toggleModalNew">Generar nueva dependencia
                    </button>
                </div>
                <section class="main__policies w-100">
                    <table class="table shadow-sm">
                        <thead>
                        <tr>
                            <th scope="col" class="col-10">Nombre</th>
                            <!--<th scope="col" class="col-1">Editar</th>-->
                            <th scope="col" class="col-1">Eliminar</th>
                        </tr>
                        </thead>
                        <tbody>
                        <i v-if="loading" class="c-inline-spinner"></i>
                        <tr v-for="dependence in dependencies" :key="dependence.id" class="align-content-center">
                            <td>
                                <p>{{ dependence.name }}</p>
                            </td>
                            <!--
                            <td class="align-content-center text-center" role="button"
                                @click="toggleModalEdit(dependence.id, )">
                                <i class="bi bi-pencil-square"></i>
                            </td>
                            -->
                            <td class="align-content-center text-center" role="button"
                                @click="deleteDependence(dependence.id)">
                                <i class="bi bi-trash3-fill"></i>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    </div>

    <!--Ventana emergente para modificar política
    <div v-if="showModalEdit" class="modal">
        <div class="modal-content">
            <div class="close__modal">
                <span class="close" @click="toggleModalEdit">&#x2716;</span>
            </div>
            <h3 class="text-center">Modificar política</h3>
            <form @submit.prevent="editDependence">
                <label for="name">Nombre:</label>
                <input class="form-control" id="name" v-model="name" type="text" required/>

                <label for="phone">Teléfono:</label>
                <input class="form-control" :class="{ 'is-invalid': !isPhoneValid, 'is-valid': isPhoneValid }" id="phone" v-model="phone" type="text" required/>
                <div v-if="!isPhoneValid" class="invalid-feedback">El teléfono debe tener al menos 10 caracteres.</div>

                <label for="employee-select">Seleccione un empleado:</label>
                <select class="form-select" id="employee-select" v-model="selectedEmployeeId">
                    <option :value="null">Ninguno</option>
                    <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                        {{ employee.name }}
                    </option>
                </select>
                <div class="mt-3 text-center">
                    <button class="btn__new btn" type="submit">Guardar</button>
                </div>
            </form>
        </div>
    </div>
    -->
    <!--Ventana emergente para agregar política-->
    <div v-if="showModalNew" class="modal">
        <div class="modal-content">

            <div class="close__modal">
                <span class="close" @click="toggleModalNew">&#x2716;</span>
            </div>
            <h3 class="text-center">Agregar dependencia</h3>
            <form @submit.prevent="newDependence">
                <label for="name">Nombre:</label>
                <input class="form-control" id="name" v-model="name" type="text" required/>

                <label for="phone">Teléfono:</label>
                <input class="form-control" :class="{ 'is-invalid': !isPhoneValid, 'is-valid': isPhoneValid }" id="phone" v-model="phone" type="text" required/>
                <div v-if="!isPhoneValid" class="invalid-feedback">El teléfono debe tener al menos 10 caracteres.</div>

                <label for="employee-select">Seleccione un empleado:</label>
                <select class="form-select" id="employee-select" v-model="selectedEmployeeId">
                    <option :value="null">Ninguno</option>
                    <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                        {{ employee.name }}
                    </option>
                </select>
                <div class="mt-3 text-center">
                    <button class="btn__new btn" type="submit">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>


<style scoped>
.btn__new {
    background-color: var(--grayy);
    color: var(--white-color);
}

.btn__new:hover {
    background-color: var(--principal-color);
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
    margin: 12% auto;
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