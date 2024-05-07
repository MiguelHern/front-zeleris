<template>
  <div>
    <!-- Div de arriba -->
    <div class="top-container">
      <div>
        <span style="font-size: 24px; font-family: 'Jost', sans-serif;">Docentes</span>
      </div>
      <div class="input-container">
        <div class="search-box">
          <span class="search-icon">&#128269;</span>
          <input type="text" class="search-input" placeholder="Buscar Docente">
        </div>
        <select class="filter-select">
          <option disabled selected>Filtrar</option>
          <!-- opciones del combo box -->
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
                <button @click="pivotar('nombre')">v</button>
              </div>
            </th>
            <th>
              <div class="column-header">
                <span>Matricula</span>
                <button @click="pivotar('matricula')">v</button>
              </div>
            </th>
            <th>
              <div class="column-header">
                <span>Correo</span>
                <button @click="pivotar('correo')">v</button>
              </div>
            </th>
            <th>
              <div class="column-header">
                <span>Carrera</span>
                <button @click="pivotar('carrera')">v</button>
              </div>
            </th>
            <th>
              <div class="column-header">
                <span>Cargo</span>
                <button @click="pivotar('cargo')">v</button>
              </div>
            </th>
            <th></th> <!-- Celda vacía -->
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Julio A Gutiérrez Gonzales</td>
            <td>62587</td>
            <td>JulioGutierrez@uacam.mx</td>
            <td>I.S.C</td>
            <td>Docente</td>
            <td></td> <!-- Celda vacía -->
          </tr>
          <tr>
            <td>Julio A Gutiérrez Gonzales</td>
            <td>62587</td>
            <td>JulioGutierrez@uacam.mx</td>
            <td>I.S.C</td>
            <td>Docente</td>
            <td></td> <!-- Celda vacía -->
          </tr>
          <tr>
            <td>Julio A Gutiérrez Gonzales</td>
            <td>62587</td>
            <td>JulioGutierrez@uacam.mx</td>
            <td>I.S.C</td>
            <td>Docente</td>
            <td></td> <!-- Celda vacía -->
          </tr>
          <tr>
            <td>Julio A Gutiérrez Gonzales</td>
            <td>62587</td>
            <td>JulioGutierrez@uacam.mx</td>
            <td>I.S.C</td>
            <td>Docente</td>
            <td></td> <!-- Celda vacía -->
          </tr>
          <tr>
            <td>Julio A Gutiérrez Gonzales</td>
            <td>62587</td>
            <td>JulioGutierrez@uacam.mx</td>
            <td>I.S.C</td>
            <td>Docente</td>
            <td></td> <!-- Celda vacía -->
          </tr>
          <tr>
            <td>Julio A Gutiérrez Gonzales</td>
            <td>62587</td>
            <td>JulioGutierrez@uacam.mx</td>
            <td>I.S.C</td>
            <td>Docente</td>
            <td></td> <!-- Celda vacía -->
          </tr>
          <tr>
            <td>Julio A Gutiérrez Gonzales</td>
            <td>62587</td>
            <td>JulioGutierrez@uacam.mx</td>
            <td>I.S.C</td>
            <td>Docente</td>
            <td></td> <!-- Celda vacía -->
          </tr>
          <tr>
            <td>Julio A Gutiérrez Gonzales</td>
            <td>62587</td>
            <td>JulioGutierrez@uacam.mx</td>
            <td>I.S.C</td>
            <td>Docente</td>
            <td></td> <!-- Celda vacía -->
          </tr>
          <tr>
            <td>Julio A Gutiérrez Gonzales</td>
            <td>62587</td>
            <td>JulioGutierrez@uacam.mx</td>
            <td>I.S.C</td>
            <td>Docente</td>
            <td></td> <!-- Celda vacía -->
          </tr>
          <tr>
            <td>Julio A Gutiérrez Gonzales</td>
            <td>62587</td>
            <td>JulioGutierrez@uacam.mx</td>
            <td>I.S.C</td>
            <td>Docente</td>
            <td></td> <!-- Celda vacía -->
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
  margin-bottom: 20px; /* Espacio entre los divs */
}
.top-container div {
  display: flex;
  align-items: center;
}

.input-container {
  display: flex;
  align-items: center;
  height: 40px; /* Ajusta la altura de los elementos */
}

.input-container > * {
  margin-right: 10px; /* Añadir espacio entre elementos */
}

.bottom-container {
  display: flex;
  justify-content: center;
}

table {
  border-collapse: separate; /* Separa los bordes de las celdas */
  border-spacing: 0; /* Elimina el espacio entre las celdas */
  width: 90%; /* ajusta el tamaño de la tabla al 90% del contenedor */
  margin-top: 20px; /* espacio entre la parte superior de la tabla y el contenedor */
}

th, td {
  border-top: 1px solid #ccc; /* Borde superior gris */
  border-bottom: 1px solid #ccc; /* Borde inferior gris */
  padding: 8px;
  text-align: left;
}

th:first-child,
td:first-child {
  border-left: none; /* Elimina el borde izquierdo para la primera columna */
}

th:last-child,
td:last-child {
  border-right: none; /* Elimina el borde derecho para la última columna */
}

.column-header {
  display: flex;
  align-items: center;
}

.column-header span {
  margin-right: 5px; /* Espacio entre el texto y el botón */
}

th button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

th button:hover {
  text-decoration: underline;
}

.search-box {
  position: relative;
}

.search-box input[type="text"] {
  padding-left: 30px; /* Espacio para el icono de búsqueda */
  border-radius: 5px; /* Corner radius de 15px */
  height: 100%; /* Ajusta la altura del input */
  box-sizing: border-box; /* Incluye el padding en la altura total */
}

.search-box .search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa; /* Color del icono */
  font-size: 18px; /* Tamaño del icono */
}

.filter-select {
  font-size: 20px;
  font-family: 'Jost', sans-serif;
  border-radius: 50px;
  height: 100%; /* Ajusta la altura del select */
  background-color: #ddd; /* Fondo gris */
  padding-left: 10px; /* Ajusta el espacio entre el borde y el texto */
  font-weight: bold; /* Texto en negrita */
}

.add-button {
  font-size: 16px; /* Tamaño de fuente más pequeño */
  font-weight: 600; /* Semibold */
  font-family: 'Jost', sans-serif;
  color: white;
  background-color: #FCBF12; /* Color de fondo amarillo */
  border: none;
  border-radius: 5px;
  padding: 0 10px; /* Ajusta el padding horizontal */
  height: 100%; /* Ajusta la altura del botón */
  cursor: pointer;
}

.add-button {
  /* Otros estilos */
  transition: background-color 0.5s; /* Establece una transición suave para el color de fondo que dura 3 segundos */
}

.add-button:hover {
  background-color: #FFA500; /* Cambiar el color al pasar el mouse */
}
</style>