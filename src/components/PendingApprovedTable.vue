<template>
    <div id="bodyPAT">
        <div class="headPAT">
            <!-- Buscador de matrículas -->
            <div id="spc"></div>
            <i id="searchIcon" class="bi bi-search"></i>
            <input id="searchMatri" type="text" placeholder="Buscar por matrícula" v-model="searchMatricula">

            <!-- Filtro por carrera -->
            <div id="spc"></div>
            <div id="searchCarrera">
                Buscar por Carrera:
                <select id="filterCarrer" v-model="selectedCarrera"> 
                    <option value="AllCarreras">Todas las carreras</option>
                    <option value="Carrera1">Carrera1</option>
                    <option value="Carrera2">Carrera2</option>
                </select>
            </div>
            <div id="spc"></div>

            <!--Filtro por fecha -->
            <div id="searchFecha">
                Buscar por Fecha:
                <input id="filterDate" type="date" v-model="selectedDate">
            </div>
            <div id="spc"></div>
        </div>

        <div id="bodyTABLE">
            <label id="labelTableP">Pendientes</label>
            <table class="table">
                <thead>
                <tr id="headTableP">
                    <th scope="col" id="nameTableP" class="col-4 text-center">Nombre</th>
                    <th scope="col" id="matriTableP" class="col-2 text-center">Matrícula</th>
                    <th scope="col" id="mailTableP" class="col-2 text-center">Correo</th>
                    <th scope="col" id="carrerTableP" class="col-2 text-center">Carrera</th>
                    <th scope="col" id="dateTableP" class="col-2 text-center">Fecha de recibido</th>
                </tr>
                </thead>
                <tbody>
                <tr class="align-content-center">
                    
                    <td scope="row" class="text-center">eeeeeeee</td>
                    <td scope="row" class="text-center">eeeeeeee</td>
                    <td scope="row" class="text-center">eeeeeeee</td>
                    <td scope="row" class="text-center">eeeeeeee</td>
                    <td scope="row" class="text-center">eeeeeeee</td>
                </tr>
                </tbody>
            </table>

            <label id="labelTableA">Aprobados</label>
            <table class="table">
                <thead>
                <tr id="headTableA">
                    <th scope="col" id="nameTableA" class="col-4 text-center">Nombre</th>
                    <th scope="col" id="matriTableA" class="col-2 text-center">Matrícula</th>
                    <th scope="col" id="mailTableA" class="col-2 text-center">Correo</th>
                    <th scope="col" id="carrerTableA" class="col-2 text-center">Carrera</th>
                    <th scope="col" id="dateTableA" class="col-2 text-center">Fecha de recibido</th>
                </tr>
                </thead>
                <tbody>
                <tr class="align-content-center">
                    
                    <td scope="row" class="text-center">eeeeeeee</td>
                    <td scope="row" class="text-center">eeeeeeee</td>
                    <td scope="row" class="text-center">eeeeeeee</td>
                    <td scope="row" class="text-center">eeeeeeee</td>
                    <td scope="row" class="text-center">eeeeeeee</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PendingApprovedTable',
  props: {
    msg: String
  }
}
  
</script>

<style>
#bodyPAT{
  /*display: flex;
  flex-direction:column;*/
  min-width: 100%;
  height: 100%;
  /*border: 3px solid red;*/
  padding: 15px;
}

.headPAT{
    display: flex;
    flex-direction:row;
    min-width: 92%;
    height: 80px;
    /*border: 3px solid green;*/
    border-radius: 6px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 15px;
    margin-bottom: 10px;
    
    justify-content: center;
    align-items: center;
}

#searchMatri{
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    padding-left: 8px;
    padding-right: 5px;
    padding-bottom: 2px;
    margin-top: 23px;
    height: 35px;
    max-width: 200px;
    border: 1px solid gray;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
}
i[id="searchIcon"]{
    margin-top: 23px;
    border: 1px solid gray;
    background-color: #758CA3;
    height: 35px;
    padding-left: 12px;
    padding-right: 7px;
    padding-top: 6px;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    cursor: pointer;
    color: white;
}
    

#spc{
    min-width: 6%;
    height: 100%;
    
    /*border: 3px solid gray;*/
}
#searchCarrera, #searchFecha{
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    
    /*border: 3px solid yellow;*/
}
#filterCarrer{
    border-radius: 12px;
    padding-left: 5px;
    padding-right: 5px;
    margin-top: 5px;
    height: 30px;
    min-width: 200px;
    border: 1px solid gray;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
}
#filterDate{
    border-radius: 12px;
    padding-left: 10px;
    padding-right: 5px;
    margin-top: 5px;
    height: 30px;
    max-width: 135px;
    border: 1px solid gray;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
}
#bodyTABLE{
    background-color:#EDEDED;
    border-radius: 6px;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 15px;
    padding-bottom: 15px;
}
#labelTableP, #labelTableA{
    color: black;
    font-family:'Segoe UI medium', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    padding-bottom: 2px;
    
}
.table{
    /*border: 1px solid black;*/
    margin-top: 10px;
    
}
#nameTableP, #matriTableP, #mailTableP, #carrerTableP, #dateTableP, #nameTableA, #matriTableA, #mailTableA, #carrerTableA, #dateTableA{
    background-color: #758CA3;
    color:white;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
}
#nameTableP, #matriTableP, #mailTableP, #carrerTableP, #nameTableA, #matriTableA, #mailTableA, #carrerTableA{
    border-right: 1px solid #395674;
}
#nameTableP, #nameTableA{
    border-top-left-radius: 6px;
}
#dateTableP, #dateTableA{
    border-top-right-radius: 6px;
}
</style>