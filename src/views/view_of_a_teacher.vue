<script setup>

</script>

<template>
  <div class="header">
    <p class="name"> Kevin Chan Guzman </p>
    <div class="content">
      <p class="text">Permisos Economicos disponibles: 5</p>
      <button class="button">Generar nuevo permiso</button>
    </div>
  </div>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th class="name-column">Nombre</th>
          <th>Dias solicitados</th>
          <th>Fecha</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="name-column">
            <i class="bi bi-file-earmark-text"></i>Kevin Chan Guzman
          </td>
          <td>5</td>
          <td>18/03/2024</td>
          <td>Aprobado</td>
        </tr>
        <tr>
          <td class="name-column">
            <i class="bi bi-file-earmark-text"></i>Kevin Chan Guzman
          </td>
          <td>5</td>
          <td>18/03/2024</td>
          <td>Aprobado</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
}

.name {
  margin-right: 15px;
}

.content {
  display: flex;
  align-items: center;
}

.text {
  margin-right: 15px;
}

.button {
  padding: 8px 16px;
  background-color: #034286;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

/*
  estilo tabla
*/
.container {
  width: 800px;
  margin: 0 auto;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 5px;
  text-align: center;
}

th {
  background-color: #ffffff;
}

.name-column {
  width: 250px; /* Ajuste del ancho de columna "nombre" */
  padding-right: 100px; /* padding del contenido */
  border-left: 1px solid black; /* Borde derecho para la separación */
}

tr td:last-child, tr th:last-child {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  /*Status*/
}

tr:first-child th {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  /*header days and date*/
}

tr:last-child td {
  border-bottom: 1px solid black;
  border-top: 1px solid black;
}

</style>