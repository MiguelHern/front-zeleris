<script setup>
import { computed, onMounted, ref } from 'vue';
import { APIS, APISDEPENDENCE, useDependencies, useEmployee } from "@/api/adminService.js";
import Swal from 'sweetalert2';

const { employees } = useEmployee();
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
    loading.value = true;
    const { data, success, error: fetchError } = await useDependencies();
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
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Dependencia creada con éxito",
        showConfirmButton: true,
        confirmButtonText: 'Cerrar',
        customClass: {
            popup: 'swal2-popup',
            confirmButton: 'swal2-confirm'
        }
    });
    await loadDependencies();
};

const deleteDependence = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "¿Estás seguro de eliminarlo?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await APISDEPENDENCE.deleteDependence(id);
            if (response.success) {
                swalWithBootstrapButtons.fire(
                    "Eliminado!",
                    "La dependencia ha sido eliminada.",
                    "success"
                );
                await loadDependencies();
            } else {
                console.error('Error al eliminar la dependencia:', response.data);
                error.value = response.data;
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                "Cancelado",
                "La dependencia está a salvo",
                "error"
            );
        }
    });
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
.swal2-popup .swal2-title, .swal2-popup .swal2-content {
  font-size: 19px !important;
  color: black;
}
.swal2-popup{
    width: 340px !important; /* Ancho de la alerta */
  height: 240px !important; /* Alto de la alerta */
  align-items: center!important;
  align-content: center !important;
  padding-bottom: 30px  !important;
}
.swal2-confirm {
  background-color: #fae3a0 !important;
  border-radius: 6px;
  color: black !important;
  border: none !important;
  box-shadow: none !important; /* Eliminar la sombra del botón */
  font-size: 15px !important;
  transition: .3s ease-in !important;
  margin-bottom: 10px;
}
.swal2-confirm:hover {
  background-color: #FCBF12 !important;
  border: none !important;
  color: black !important;
}
.swal2-cancel{
    background-color: #758CA3;
    border-radius: 6px;
    color:white;
    border: none !important;
  box-shadow: none !important; /* Eliminar la sombra del botón */
  font-size: 15px !important;
  transition: .3s ease-in !important;
  margin-bottom: 10px;
  margin-right: 15px;
}
.swal2-cancel:hover {
background-color: #1B365D !important;
  border: none !important;
  color:white !important;
}
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