<template>
    <div id="cuerpo">
        <div class="details">
            <p> Detalles del Permiso Económico</p>
            <div class="applicantDetails">
                <h1 id="perfil_Icon">
                    <i class="bi bi-person-square"></i>
                </h1>
                <div id="nameMail">
                    <label>Julio A Gutiérrez Gonzáles</label>
                    <label>JulioGutierrez@uacam.mx</label>
                  </div>
                <div id="permitDate"> Fecha de la solicitud: 06/03/2024</div>
            </div>
        </div>

        <div class="fillingArea"> Cantidad de día(s) solicitada(s): 2
            <div id="selectedDays"> 
              <div class="days">06/03/2024</div>
              <div class="days">07/03/2024</div>
            </div>
            <div id="reasons"> Motivo de la solicitud:</div>
              <div id="textBox">
              <textarea class="reasonsText" placeholder="Coloca el motivo de la solicitud" ></textarea>
            </div>
        </div>

        <div class="submissionArea">
          <input class="declineButton" type="submit" name="Boton1" value="Rechazar"></input>
          <input class="acceptButton" type="submit" name="Boton2" value="Aceptar"></input>
        </div>
        <div class="remainingDays">
          Le quedan 8 días, como permiso económico en el año
        </div>
    </div>
</template>

<script>
export default {
  name: 'seePermit_coordinacion',
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

p{
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

.details{
  flex-direction:column;
  min-height: 140px;
  /*background-color: lightgreen;*/
  background-color:white;
  display: flex;
  width: calc(100%-30px);
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}

.applicantDetails{
  min-height: 40px;
  /*border: 2px solid green;*/
  display: flex;
  width: 100%;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 15px;
  margin-bottom: 2px;
  /*margin-top: 0px;*/
}

h1[id="perfil_Icon"]{
  /*border: 2px solid green;*/
  margin-top: 3px;
  margin-left: 15px;
  align-content: center;
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
  /*background-color: #f5b642;*/
  background-color: #EDEDED;
  border-radius: 6px;
  min-width: 28%;
  /*min-width RECUERDA MODIFICAR CUANDO HAGAS LA BANDEJA*/ 
  margin-right: 15px;
  text-align: center;
  align-content: center;
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
}

.fillingArea{
  display: flex;
  flex-direction:column;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  font-size: 15px;
  height: 250px;
  /*background-color: #f762be;*/
  background-color: #EDEDED;
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

#selectedDays{
  display: flex;
  padding-bottom: 15px;
  padding-top: 13px;
  justify-content: center;
}

.days{
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
  min-width: 24%;
  /*min-width RECUERDA MODIFICAR CUANDO HAGAS LA BANDEJA*/ 
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  align-content: center;
}

#textBox{
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 35px;
  margin-bottom: 25px;
  /*background-color: green;*/
  background-color: #EDEDED;
  height: 250px;
}

.reasonsText{
  margin-top: 5px;
  min-height: 110px;
  padding: 5px;
  border-radius: 5px;
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

.declineButton, .acceptButton{
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 1px;
  height: 37px;
  width: 150px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  /*box-shadow: 3px 3px 6px rgba(0, 0, 0, .3);*/
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  transition: .3s ease-in;
}

.declineButton{
  background-color: #fae3a0;
  color:black;
  margin-right: 30px;
  border: none;
}
.declineButton:hover{
  background-color: #FCBF12;
  text-shadow: 1px 1px 5px #e2aa11;
  border: none;
}

.acceptButton{
  background-color: #758CA3;
  color:white;
  border: none;
}
.acceptButton:hover {
  background-color: #1B365D;
  text-shadow: 1px 1px 5px #0f1e33;
  border: none;
}
</style>