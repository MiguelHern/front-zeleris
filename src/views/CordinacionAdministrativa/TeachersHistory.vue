<template>
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
        <button class="add-button" @click="agregarDocente">Añadir Docente</button>
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
                <span>Matricula</span>
                <button @click="pivotar('matricula')"><i class="bi bi-caret-down-fill"></i></button>
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
          <tr>
            <td>Julio A Gutiérrez Gonzales</td>
            <td>62587</td>
            <td>JulioGutierrez@uacam.mx</td>
            <td>I.S.C</td>
            <td>Docente</td>
            <td>
              <i class="bi bi-pencil-square" @click="alertar('Editar información del Docente')"></i>
              <i class="bi bi-trash3" @click="alertar('eliminar el registro del Docente')"></i>
              <i class="bi bi-person-gear" @click="alertar('modificar el rol del Docente')"></i>
            </td>
          </tr>
          <tr>
            <td>Julio A Gutiérrez Gonzales</td>
            <td>62587</td>
            <td>JulioGutierrez@uacam.mx</td>
            <td>I.S.C</td>
            <td>Docente</td>
            <td>
              <i class="bi bi-pencil-square"></i>
              <i class="bi bi-trash3"></i>
              <i class="bi bi-person-gear"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    agregarDocente() {
      // Lógica para añadir un docente
    },
    pivotar(columna) {
      // Lógica para pivotar la tabla por la columna seleccionada
    },
    alertar(accion) {
      if (confirm(`¿Estás seguro de que deseas ${accion}?`)) {
        this.realizarAccion(accion);
      } else {
        console.log('Acción cancelada');
      }
    },
    realizarAccion(accion) {
      // Aquí va la lógica para la funcionalidad que quieres ejecutar después de la confirmación
      console.log(`Realizando acción: ${accion}`);
      // Por ejemplo, podrías tener diferentes funcionalidades según la acción
      if (accion === 'Editar') {
        // Lógica para editar
      } else if (accion === 'Eliminar') {
        // Lógica para eliminar
      } else if (accion === 'Configurar') {
        // Lógica para configurar
      }
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para esta vista */
.top-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  /* Espacio entre los divs */
  margin-top: 8px;
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
</style>