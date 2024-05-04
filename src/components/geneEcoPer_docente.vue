<template>
  <body>
  <div class="applicant_Details">
    <p id="p_ad"> Solicitar Permiso Económico</p>
    <div class="teacherDetails">
      <h1>
        <i class="bi bi-person-square"></i>
      </h1>
      <div id="nameMail">
        <label>Julio A Gutiérrez Gonzáles</label>
        <label>JulioGutierrez@uacam.mx</label>
      </div>
      <div class="numberDays">Cantidad de dias a solicitar:
        <span class="minus">-</span>
        <span class="num">3</span>
        <span class="plus">+</span>

      </div>
      <div id="availablePermissions">Permisos disponibles: 3</div>
    </div>
    <div class="applicant">
      <div id="category">Docente</div>
      <div id="collegeName">Ingenieria en Sistemas Computacionales</div>
      <div id="todaysDate">Fecha:</div>
    </div>
  </div>

  <div class="filling_Area">
    <div id="selectedDays"> Fecha del permiso:
      <input id="datePermit" type="date"></input>
      <input id="datePermit" type="date"></input>
      <input id="datePermit" type="date"></input>
    </div>
    <div id="reasons"> Motivo de la solicitud:</div>
    <div id="text_Box">
      <textarea class="reasonsTexts" placeholder=" Coloca el motivo de la solicitud" ></textarea>
    </div>
  </div>

  <div class="submissionArea">
    <input class="signButton" type="submit" name="Boton1" value="Firmar"></input>
    <input class="cancelButton" type="submit" name="Boton2" value="Crear"></input>
  </div>
  </body>
</template>

<script>
export default {
  name: 'geneEcoPer_docente',
  props: {
    msg: String
  }
}

/* SCRIPT DEL INCRMENTO (NO FUNCIONA)
const plus= document.querySelector(".plus"),
minus= document.querySelector(".minus"),
num= document.querySelector(".num");

let a=1;

plus.addEventListener("click", ()=>{
  a++;
  a= (a<10)? "0"+ a: a;
  num.innerText =a;
  console.log(a);
});*/

</script>

<style scoped>
.applicant_Details, .filling_Area, .submissionArea{
  display: flex;
  top: 3rem;
  width: calc(100%-30px);
  
  margin-right: 15px;
  padding: 5px;
}

.applicant_Details{
  flex-direction:column;
  min-height: 25%;
  margin-left: 15px;
  background-color: white;
  margin-bottom: 10px;
}

p[id="p_ad"]{
  background-color: #C8C8C8;
  min-height: 50px;
  width: 100%;
  border-radius: 6px;
  padding-left: 20px;
  align-content: center;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
  /*font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;*/
  font-size: 18px;
}

h1{
  align-content: center;
  text-align: center;
  height: 50px;
  width: 50px;
  margin-left: 10px
}

.applicant, .teacherDetails{
  display: flex;
  width: 100%;
  border-radius: 6px;
  /*border: 1px solid black;*/
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 14px;

}

.teacherDetails{
  max-height: 35%;
  margin-top: -5px;
  /*border: 1px solid black;*/
}

.applicant{
  background-color: #EDEDED;
  /*border: 1px solid black;*/
  max-height: 45px;
  margin-top: 7px;
  padding-top: 10px;
  padding-bottom: 10px;
}

#category{

  padding-left: 15px;
  width: 25%;
  align-content: center
}

#nameMail{
  /*border: 1px solid black;*/
  padding-left: 15px;
  width: 50%;
  align-content: center
}

#collegeName{
  min-width: 50%;
  text-align: center;
  align-content: center
}

.numberDays{
  margin-right: 20px;
  margin-left: 10px;
  border-radius: 6px;
  background-color: #EDEDED;
  /*border: 1px solid black;*/
  min-width: 22%;
  text-align: center;
  align-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
}

.numberDays span{
  margin-right: 5px;
  margin-left: 5px;
  font-size: 16px;
}

.numberDays span.plus, span.minus {
  cursor: pointer;
}

.numberDays span.num{
  padding-left: 5px;
  padding-right: 5px;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, .2);
  border-radius: 6px;
}

#availablePermissions{
  background-color: #EDEDED;
  border-radius: 6px;
  /*border: 1px solid black;*/
  min-width: 23%;
  text-align: center;
  align-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
}

#todaysDate{
  background-color: #EDEDED;
  border-radius: 6px;
  /*border: 1px solid black;*/
  padding-right: 15px;
  min-width: 25%;
  text-align: right;
  align-content: center;
}

#selectedDays{
  display: flex;
  padding: 15px;
  
  padding-bottom: 5px;
  padding-right: 35px;
  justify-content: right;
}

#datePermit{
  margin-left: 20px;
  border-radius: 6px;
  border: 1px solid black;
  padding: 5px;
}

.filling_Area{
  display: flex;
  flex-direction:column;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
  font-size: 14px;
  height: 45%;
  background-color: #EDEDED;
  padding-left: 15px;
  margin-top: 15px;
  margin-left: 20px;
  margin-right: -10px;
  border-radius: 5px;
}

#text_Box{
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 35px;
  /*background-color: green;*/
  height: 170px;
}

.reasonsTexts{
  margin-top: 10px;
  min-height: 130px;
  padding: 5px;
  border-radius: 5px;
}

div[id="reasons"]{
  margin-top: 10px;
  margin-left: 10px;
}

.submissionArea{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
  margin-left: 45px;
  height: 10%;
  background-color: white;

}

.signButton, .cancelButton{
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 1px;
  height: 40px;
  width: 250px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  transition: .3s ease-in;
  border: none;
}
.signButton{
  background-color: #fae3a0;
  color:black;
  margin-right: 30px;
}
.signButton:hover {
  background-color: #FCBF12;
  text-shadow: 1px 1px 5px #e2aa11;
}
.cancelButton{
  background-color: #758CA3;
  color:white;
}
.cancelButton:hover {
  background-color: #1B365D;
  text-shadow: 1px 1px 5px #0f1e33;
}

body{
  display: flex;
  flex-direction:column;
  min-width: calc(100% - 50px);
  min-height: 100vh;
  background-color: white;
}
</style>