<template>
    <section>
        <div id="cuerpo">
            <div class="fillingArea"> 

                <div class="applicantDetails">
                    <div id="nameMail">
                        <label> <i class="bi bi-person-square"></i> Julio A Gutiérrez Gonzáles</label>
                    </div>
                    <div id="permitDate"> Permisos económicos disponibles: 5</div>
                    <button class="button_generate"> Generar nuevo permiso </button>
                </div>
               
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Días solicitados</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Dato 1</td>
                            <td>Dato 2</td>
                            <td>Dato 3</td>
                            <td>Dato 3</td>
                        </tr>
                        <tr>
                            <td>Dato 4</td>
                            <td>Dato 5</td>
                            <td>Dato 6</td>
                            <td>Dato 3</td>
                        </tr>
                        <tr>
                            <td>Dato 4</td>
                            <td>Dato 5</td>
                            <td>Dato 6</td>
                            <td>Dato 3</td>
                        </tr>
                        <tr>
                            <td>Dato 7</td>
                            <td>Dato 8</td>
                            <td>Dato 9</td>
                            <td>Dato 3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'home_teacher',
  props: {
    msg: String
  }
}
</script>

<style>
#cuerpo{
  display: flex;
  flex-direction:column;
  width: 100%;
  min-height: 100vh;
  /*border: 3px solid red;*/
}

.details{
  flex-direction:column;
  min-height: 140px;
  /*background-color: lightgreen;*/
  background-color:white;
  display: flex;
  width: calc(100%-30px);
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 10px;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
}

.applicantDetails{
  max-height: 50px;
  /*border: 2px solid green;*/
  display: flex;
  width: 100%;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 15px;
  /*margin-top: 0px;*/
}

table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid #000;
    margin-top: 10px;
}

th, td {
    border-color: 1px solid black;
    padding: 8px;
    text-align: left;
}

th, tbody tr {
   border-bottom: 1px solid black;
}

th {
    background-color: #f2f2f2;
}
td:first-child, th:first-child {
    border-left: none;
}
td:last-child, th:last-child {
    border-right: none;
}
tbody tr:last-child td {
    border-bottom: none;
}

/* Redondea las esquinas de la tabla solo en la parte superior izquierda y superior derecha */
table thead tr:first-child th:first-child {
  border-top-left-radius: 10px;
}

table thead tr:first-child th:last-child {
  border-top-right-radius: 10px;
}

/* Redondea las esquinas de la tabla solo en la parte inferior izquierda y inferior derecha */
table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}

table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}

#nameMail{
  /*border: 3px solid yellow;*/
  padding-left: 15px;
  padding-right: 10px;
  width: 72%;
  align-content: center;
  margin-bottom: 0px;
}

#permitDate{
  background-color: #EDEDED;
  border-radius: 6px;
  min-width: 24%;
  margin-right: 10px;
  text-align: center;
  align-content: center;
}

.button_generate{
    background-color: #1B365D;
    border-radius: 6px;
    min-width: 24%; 
    margin-right: 10px;
    text-align: center;
    align-content: center;
    padding: 10px 15px;
    border: 1px solid #1B365D;
    color: #fff;
  }

.button_generate:hover{
    background-color: #223857;
    transition: 0.5s;
  }

.fillingArea{
  display: flex;
  flex-direction:column;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  font-size: 15px;
  height: 250px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: calc(100%-30px);
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-right: 13px;
  padding-left: 27px;
}

#textBox{
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 35px;
  margin-bottom: 25px;
  /*background-color: green;*/
  background-color: #EDEDED;
  max-height: 150px;
}

.submissionArea{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
  height: 10%;
  /*background-color: blue;*/
  background-color: #EDEDED;
  margin-left: 30px;
  margin-right: 30px;
}

.remainingDays{
  text-align: center;
  align-content: center;
  background-color: #EDEDED;
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 10px;
  padding-left: 80px;
  padding-right: 80px;
  padding-bottom: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>