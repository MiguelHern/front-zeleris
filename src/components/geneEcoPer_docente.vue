<template>
  <body>
  <div class="applicantDetails">
    <p> Solicitar Permiso Económico</p>
    <div class="teacherDetails">
      <h1>
        <i class="bi bi-person-square"></i>
      </h1>
      <div id="nameMail">
        <label>Julio A Gutiérrez Gonzáles</label><br>
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

  <div class="fillingArea">
    <div id="selectedDays"> Fecha del permiso:
      <input id="datePermit" type="date"></input>
      <input id="datePermit" type="date"></input>
      <input id="datePermit" type="date"></input>
    </div>
    <div id="reasons"> Motivo de la solicitud:</div>
    <div id="textBox">
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
.applicantDetails, .fillingArea, .submissionArea{
  display: flex;
  top: 3rem;
  margin-left: 15px;
  margin-right: 15px;
  padding: 5px;
}

.applicantDetails{
  flex-direction:column;
  min-height: 150px;
  background-color: white;
}

p{
  background-color: #C8C8C8;
  min-height: 43px;
  width: 100%;
  border-radius: 6px;
  padding-left: 15px;
  align-content: center;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 18px;
  margin: 0;
}

h1{
  margin-top: 8px;
}

.applicant, .teacherDetails{
  display: flex;
  width: 100%;
  border-radius: 6px;
  /*border: 1px solid black;*/
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 14px;
  margin-top: 10px;
}

.teacherDetails{
  min-height: 40px;
  /*border: 1px solid black;*/
}

.applicant{
  background-color: #EDEDED;
  min-height: 38px;
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
  margin-right: 80px;
  margin-left: 20px;
  border-radius: 6px;
  background-color: #EDEDED;
  /*border: 1px solid black;*/
  min-width: 22%;
  text-align: center;
  align-content: center;
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
}

.fillingArea{
  display: flex;
  flex-direction:column;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
  font-size: 14px;
  height: 60%;
  background-color: #EDEDED;
  padding-left: 15px;
}

#textBox{
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 35px;
  /*background-color: green;*/
  height: 250px;
}

.reasonsTexts{
  margin-top: 10px;
  min-height: 200px;
}

.submissionArea{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
  height: 10%;
  background-color: white;

}

.signButton, .cancelButton{
  height: 40px;
  width: 250px;
  border: 1px solid black;
  border-radius: 6px;
  font-size: 17px;
  cursor: pointer;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, .3);
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.signButton{
  background-color: #FCBF12;
  color:black;
  margin-right: 30px;
}
.signButton:hover {
  box-shadow: inset 0 0 4px , 0 0 4px #e0aa13;
  text-shadow: 1px 1px 15px #e0aa13;
}
.cancelButton{
  background-color: #1B365D;
  color:white;
}
.cancelButton:hover {
  box-shadow: inset 0 0 4px , 0 0 4px black;
  text-shadow: 1px 1px 10px black;
}

body{
  display: flex;
  flex-direction:column;
  min-width: calc(100% - 50px);
  background-color: white;
}
</style>