<script setup>
import Footer from "@/components/Footer.vue";
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useEmployee } from '@/api/adminService.js';
import { deleteEmployee } from '@/api/adminService.js';
import {APIS} from "@/scripts/Consumibles.js";

const dependencyService = new DependencyService(); // Instancia de DependencyService
const dependencyId = ref("");
const dependencies = ref([]); // Variable reactiva para las dependencias
const { employees } = useEmployee();
const loading = ref(true);
const name = ref("")
const lastName = ref("")
const quantityPermissions = ref(0)
const rol = ref()
const matricula = ref(0)
const dependencyId = ref(0)
const email = ref("")
const password = ref("")
const showModalNew = ref(false);
const showModal = ref(false);

const toggleModalNew = () => {
  showModalNew.value = !showModalNew.value;
};

const checkForSymbols = () => {
  const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const numberRegex = /\d/;

  if (regex.test(name.value) || regex.test(lastName.value) || numberRegex.test(name.value) || numberRegex.test(lastName.value)) {
    symbolOrNumberEntered.value = true;
    alert("No se permiten símbolos o números en el nombre y apellido.");
    // Puedes limpiar el valor del campo aquí si lo deseas
  } else {
    symbolOrNumberEntered.value = false;
  }
};

const validarEmail = () => {
  // Expresión regular para validar el formato del correo electrónico
  const emailPattern = /^[^\s@]+@(uacam\.mx|gmail\.com|outlook\.com)$/i;
  return emailPattern.test(email.value);
};

const formularioValido = computed(() => {
  return (
    name.value &&
    lastName.value &&
    rol.value &&
    quantityPermissions.value &&
    matricula.value &&
    dependencyId.value &&
    validarEmail() &&
    !symbolOrNumberEntered.value // Agregar la condición para verificar si no se ha ingresado ningún símbolo o número
  );
});

watchEffect(() => {
  if (employees.value.length > 0) {
    loading.value = false;
  }
});

onMounted(() =>{

})

const crearDocente = async () => {
    var response = await APIS.CrearDocente(name.value, lastName.value, rol.value, quantityPermissions.value, matricula.value, dependencyId.value, email.value, password.value);
    if (response.success) {
        toggleModalNew();
        showModal.value = true;
    } else {
        console.error('Error al crear el docente:', response.message);
    }
}

</script>

<template>
  <div>
    <div v-if="showModal" class="modal">
        <div class="modal-content modal-contentt">
            <p class="fs-5">Usuario creado</p>
            <a class=" p-1 btn bg-primary text-body" href="/Admin/History">Aceptar</a>
        </div>
    </div>
    <div>
      <!-- Div de arriba -->
      <div class="top-container">
        <div>
          <span style="font-size: 24px; font-family: 'Jost', sans-serif; margin-left: 70px;">Docentes</span>
        </div>
        <div class="input-container" style="margin-right: 70px;">
          <div class="search-container">
            <input type="text" class="search-input" placeholder="Buscar...">
          </div>
          <select class="filter-select">
            <option disabled selected>Filtrar</option>
            <!-- opciones del combo box -->
            <option value="option1">Opción 1</option>
            <option value="option2">Opción 2</option>
            <option value="option3">Opción 3</option>
          </select>
          <button class="add-button" @click="toggleModalNew">Añadir Docente</button>
        </div>
      </div>

    <!-- Div de abajo -->
    <div class="bottom-container">
      <table>
        <thead>
          <tr>
            <th>
              <div class="column-header">
                <span>Nombre</span>
                <button @click="pivotar('nombre')"><i class="bi bi-caret-down-fill"></i></button>
              </div>
            </th>
            <th>
              <div class="column-header">
                <span>Número de empleado</span>
                <button @click="pivotar('Número de empleado')"><i class="bi bi-caret-down-fill"></i></button>
              </div>
            </th>
            <th>
              <div class="column-header">
                <span>Correo</span>
                <button @click="pivotar('correo')"><i class="bi bi-caret-down-fill"></i></button>
              </div>
            </th>
            <th>
              <div class="column-header">
                <span>Carrera</span>
                <button @click="pivotar('carrera')"><i class="bi bi-caret-down-fill"></i></button>
              </div>
            </th>
            <th>
              <div class="column-header">
                <span>Cargo</span>
                <button @click="pivotar('cargo')"><i class="bi bi-caret-down-fill"></i></button>
              </div>
            </th>
            <th>
              <div class="column-header">
                <span>Acciones</span>
                <button @click="pivotar('acciones')"><i class="bi bi-caret-down-fill"></i></button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="employee in employees" :key="employee.id">
            <td><span>{{employee.name}}</span><span>{{employee.lastName}}</span></td>
            <td>{{employee.matricula}}</td>
            <td>{{employee.email}}</td>
            <td>{{employee.dependency}}</td>
            <td>{{employee.rol}}</td>
            <td>
                <i class="bi bi-pencil-square"></i>
                <i class="bi bi-trash3" @click="deleteEmployee(employee.id)"></i>
                <i class="bi bi-person-gear"></i>
            </td>
        </tr>
        </tbody>
      </table>
        <div v-if="showModalNew" class="modal">
            <div class="modal-content">
                <div class="close__modal">
                    <span class="close" @click="toggleModalNew">&#x2716;</span>
                </div>
                <h3 class="text-center">Agregar docente</h3>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <input v-model="name" id="name" type="text" class="form-control" placeholder="Nombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">Apellido:</label>
                        <input v-model="lastName" id="lastName" type="text" class="form-control" placeholder="Apellido" required>
                    </div>
                    <div class="mb-3">
                        <label for="rol" class="form-label">Rol:</label>
                        <select v-model="rol" id="rol" class="form-control">
                            <option value="Docente">Docente</option>
                            <option value="Coordinador">Coordinador</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="quantityPermissions" class="form-label">Cantidad de Permisos:</label>
                        <input v-model="quantityPermissions" id="quantityPermissions" type="number" class="form-control" placeholder="Cantidad de Permisos" required>
                    </div>
                    <div class="mb-3">
                        <label for="matricula" class="form-label">Número de empleado:</label>
                        <input v-model="matricula" id="matricula" type="number" class="form-control" placeholder="Matrícula" required>
                    </div>
                    <div class="mb-3">
                        <label for="dependencyId" class="form-label">ID de Dependencia:</label>
                        <input v-model="dependencyId" id="dependencyId" type="number" class="form-control" placeholder="ID de Dependencia" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo Electrónico:</label>
                        <input v-model="email" id="email" type="email" class="form-control" placeholder="Correo Electrónico" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña:</label>
                        <input v-model="password" id="password" type="password" class="form-control" placeholder="Contraseña" required>
                    </div>
                    <button @click="crearDocente()" type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>
        </div>
    </div>
    <Footer></Footer>
  </div>


</template>


<style scoped>
.table-container {
  position: relative;
  max-height: 470px; /* Puedes ajustar esta altura según sea necesario */
  overflow: hidden;
  width: 90%;

}
.table-container table {
  width: 100%;
  border-collapse: collapse;
}
.table-body-container {
  max-height: 380px; /* Ajustar según la altura de thead */
  overflow-y: auto;
}
.table-body-container table {
  width: 100%;
  border-collapse: collapse;
}
.table-body-container table td {
  padding-left: 25px;
  padding-right: 25px;
  border: 1px solid #ddd;
}
.column-header {
  display: flex;
  align-items: center;  
}
#sort-button {
  transition: background-color 0.3s ease-in;
  border: none;
  background: none;
  cursor: pointer;
  padding: 5px;
}
#sort-button {
  background-color: #8099b3;  
  color: white;
}
#sort-button:hover {
  background-color: #556e8d;
  color: white;
}
.top-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  /* Espacio entre los divs */
  margin-top: 20px;
}

.top-container div {
  display: flex;
  align-items: center;
}

.input-container {
  display: flex;
  align-items: center;
  height: 40px;
  /* Ajusta la altura de los elementos */
}

.input-container>* {
  margin-right: 10px;
  /* Añadir espacio entre elementos */
}

.bottom-container {
  display: flex;
  justify-content: center;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  flex: 1;
  margin-right: 10px;
  border-color: #1B365D;
  outline: none;
  /* Elimina el borde predeterminado al enfocar el input */
  transition: border-color 0.3s ease;
  /* Agrega una transición suave al cambio de color del borde */
}

.search-input:focus {
  border-color: #007bff;
  /* Cambia el color del borde al enfocar el input */
}


table {
  border-collapse: separate;
  /* Separa los bordes de las celdas */
  border-spacing: 0;
  /* Elimina el espacio entre las celdas */
  width: 90%;
  /* ajusta el tamaño de la tabla al 90% del contenedor */
  margin-top: 20px;
  /* espacio entre la parte superior de la tabla y el contenedor */
}

th,
td {
  border-top: 1px solid #ccc;
  /* Borde superior gris */
  border-bottom: 1px solid #ccc;
  /* Borde inferior gris */
  padding: 8px;
  text-align: left;
}

th:first-child,
td:first-child {
  border-left: none;
  /* Elimina el borde izquierdo para la primera columna */
}

th:last-child,
td:last-child {
  border-right: none;
  /* Elimina el borde derecho para la última columna */
}

.column-header {
  display: flex;
  align-items: center;
}

.column-header span {
  margin-right: 5px;
  /* Espacio entre el texto y el botón */
}

th button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

th button:hover {
  text-decoration: underline;
}

.filter-select {
  font-size: 16px;
  /* Tamaño de fuente más pequeño */
  font-weight: 600;
  /* Semibold */
  font-family: 'Jost', sans-serif;
  color: #ffffff;
  background-color: #758CA3;
  /* Color de fondo amarillo */
  border: none;
  border-radius: 8px;
  /* Borde redondeado */
  padding: 0px 10px;
  /* Ajusta el padding */
  height: 100%;
  cursor: pointer;
  outline: none;
  /* Quita el borde de enfoque predeterminado */
  transition: .4s;
}

.filter-select:hover {
  background-color: #1B365D;
  /* Cambiar el color al pasar el mouse */
}

.filter-select:focus {
  box-shadow: 0 0 0 3px rgba(39, 62, 154, 0.5);
  /* Sombra al enfocarse */
}

.filter-select option {
  background-color: #ffffff;
  /* Fondo blanco para las opciones */
  color: #000000;
  /* Color del texto negro para las opciones */
}

/* Estilo para la opción deshabilitada y seleccionada */
.filter-select option[disabled][selected] {
  color: #b5b5b5;
  /* Color gris para la opción deshabilitada */
}

/* Estilo para eliminar la flecha del select para poder personalizarlo */
.filter-select::-ms-expand {
  display: none;
  /* Eliminar la flecha en Internet Explorer y Edge */
}

/* Estilo contenedor para el select personalizado */
.select-wrapper {
  position: relative;
  display: inline-block;
}

/* Estilo para la flecha personalizada */
.select-wrapper::after {
  content: '\25BC';
  /* Unicode para la flecha hacia abajo */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  /* Permite hacer clic en el select a través de la flecha */
  color: #ffffff;
  font-size: 12px;
}

td .bi {
  margin-right: 10px;
  /* Espacio entre los iconos */
  font-size: 1.5em;
  /* Tamaño del icono */
  cursor: pointer;
}

td .bi:last-child {
  margin-right: 0;
  /* Elimina el margen derecho del último icono */
}

td .bi:hover {
  color: #495d71;
  /* Color de icono al pasar el mouse */
}

.add-button {
  font-size: 16px;
  /* Tamaño de fuente más pequeño */
  font-weight: 600;
  /* Semibold */
  font-family: 'Jost', sans-serif;
  color: white;
  background-color: #f3d97e;
  /* Color de fondo amarillo */
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  /* Ajusta el padding horizontal */
  height: 100%;
  /* Ajusta la altura del botón */
  cursor: pointer;
  transition: .4s;
}

.add-button:hover {
  background-color: #FCBF12;
  /* Cambiar el color al pasar el mouse */
}

.add-button:focus {
  box-shadow: 0 0 0 3px rgba(252, 191, 18, 0.5);
  /* Sombra al enfocarse */
}

.modal {
  display: block !important;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
}

.modal-contentt {
  margin: 20% auto;
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
</style>