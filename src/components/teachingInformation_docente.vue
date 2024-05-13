<template>
    <div id="cuerpo">
        <div class="detail">
            <p id="nameCareer">Ingeniería en sistemas computacionales</p>
            <div class="applicant_Details">
                <h1 id="perfilIcon">
                    <i class="bi bi-person-square"></i>
                </h1>
                <div id="nameMailD">
                    <label>Julio A Gutiérrez Gonzáles</label>
                    <label>JulioGutierrez@uacam.mx</label>
                  </div>
                <div id="IDApplicant"> ID1234 </div>
                <div id="roleApplicant"> Docente </div>
            </div>
        </div>

        <div class="requestsMade"> Días económicos solicitados: 3
            <!--Contenido del usuario-->
            
            <div id="requestsHead">
                <label class="labelrd" id="labelrDate"> Fecha: </label>
                <label class="labelrd" id="labelrReason">Motivo: </label>
                <label class="labelrd" id="labelrStatus">Estatus: </label>
                <label class="labelrd" id="labelrB"></label>
            </div>
            
            <div id="requestsDay">
              <div class="day">06/03/2024</div>
              <div class="reason">Motivos personales</div>
              <div class="status">Aprobado</div>
              <input class="viewPermiButton" type="submit" value="Ver permiso"></input>
            </div>

            <div id="requestsDay">
              <div class="day">06/03/2024</div>
              <div class="reason">Motivos personales</div>
              <div class="status">Aprobado</div>
              <input class="viewPermiButton" type="submit" value="Ver permiso"></input>
            </div>

            <div id="requestsDay">
              <div class="day">06/03/2024</div>
              <div class="reason">Motivos personales</div>
              <div class="status">Aprobado</div>
              <input class="viewPermiButton" type="submit" value="Ver permiso"></input>
            </div>
            
        </div>

        <div class="managementArea">
          <input class="deleteButton" type="submit" name="Boton1" value="Eliminar"  @click="openPopup"></input>
          <input class="updateButton" type="submit" name="Boton2" value="Actualizar"></input>
        </div>
        
      <!-- Popup -->
      <div class="overlay" v-show="showPopup">
        <div class="popup_One">
          <p id="popUp_P">¿Está seguro de “Eliminar” al docente?</p>
          <div id="popUp_AreaBtn">
            <button class="popUpMADBottonYes" @click="confirmAction(true)">Sí</button>
            <button class="popUpMADBottonNo" @click="confirmAction(false)">No</button>
          </div>
        </div>
      </div>

    </div>
</template>


<script>
/*export default {
  name: 'teachingInformation_docente',
  props: {
    msg: String
  }
}*/

export default {
  name: 'teachingInformation_docente',
  props: {
    msg: String
  },
  data() {
    return {
      showPopup: false
    };
  },
  methods: {
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    confirmAction(confirmed) {
      if (confirmed) {
        // Aquí puedes ejecutar la acción de eliminar
        alert('Elemento eliminado!');
      } else {
        // El usuario canceló
        alert('Eliminación cancelada');
      }
      this.closePopup();
    }
  }
}
</script>

<style scoped>
.overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5); /* Gris transparente */
}
.popup_One{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 30%; /* Ancho del popup */
  min-height: 25%; /* Alto del popup */
  background-color: white; /* Fondo blanco */
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 6px;
}
#popUp_P{
  padding-left: 13px;
  padding-right: 13px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 17px;
  text-align: center;
}
#popUp_AreaBtn{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#cuerpo{
  display: flex;
  flex-direction:column;
  width: 100%;
  min-height: 100vh;
  background-color: white;
  /*border: 3px solid red;*/
}

p[id="nameCareer"]{
    
  background-color: #758CA3;
  min-height: 35px;
  width: 100%;
  border-radius: 6px;
  padding-left: 20px;
  align-content: center;
  text-align: center;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
  color: white;
  /*font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;*/
  font-size: 15px;
}

.detail{
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

.applicant_Details{
  max-height: 50px;
  /*border: 2px solid green;*/
  display: flex;
  width: 100%;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 15px;
  margin-top: 5px;
}

h1[id="perfilIcon"]{
  /*border: 2px solid green;*/
  margin-left: 10px;
  align-content: center;
  text-align: center;
  height: 50px;
  width: 50px;
}

#nameMailD{

  /*border: 3px solid yellow;*/
  padding-left: 15px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 70%;
  align-content: center;
  margin-bottom: 0px;
  /*background-color: #5bb904;*/
  background-color: #EDEDED;
  border-radius: 6px;
  height: 60px;
  align-self: center;
  margin-right: 10px;
  margin-left: 8px;
}

#roleApplicant, #IDApplicant{

  /*background-color: #f5b642;*/
  background-color: #EDEDED;
  border-radius: 6px;
  height: 40px;
  min-width: 15%;
  /*min-width RECUERDA MODIFICAR CUANDO HAGAS LA BANDEJA*/ 
  margin-right: 10px;
  text-align: center;
  align-content: center;
  align-self: center;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}

.requestsMade{

  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  font-size: 16px;
  min-height: 250px;
  /*background-color: #f762be;*/
  background-color: #EDEDED;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: calc(100%-30px);
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 18px;
  padding-bottom: none;
  padding-right: 13px;
  padding-left: 27px;
}
#requestsHead{
    display: flex;
    justify-content: center;
    margin-top: 10px;
    /*background-color: lightseagreen;*/
}

#requestsDay{
  /*background-color: lightpink;*/
  font-size: 15px;
  font-weight: 550;
  display: flex;
  padding-bottom: 15px;
  padding-top: 13px;
  justify-content: center;
}

label[class="labelrd"]{
  /*border: 1px solid black;
  background-color: lightpink;*/
  text-align: center;
  align-content: center;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 650;
  font-size: 15px;
  padding-left: 10px;
  padding-right: 10px;
}
label[id="labelrDate"]{
    min-width: 17%;
    margin-left: 4px;
    margin-right: 27px;
}
label[id="labelrReason"]{
    min-width: 19%;
    margin-right: 27px;
}
label[id="labelrStatus"]{
    min-width: 16%;   
    margin-right: 27px;
}
label[id="labelrB"]{
    min-width: 115px;
    margin-right: 6px;
}

.day, .reason, .status{

  border: 1px solid rgba(0, 0, 0, 0.753);
  background-color: white;
  border-radius: 5px;
  height: 30px;
  /*min-width RECUERDA MODIFICAR CUANDO HAGAS LA BANDEJA*/ 
  margin-left: 12px;
  margin-right: 12px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  align-content: center;
  overflow: hidden;
}
.day{
    min-width: 17%;
}
.reason{
    min-width: 19%;
}
.status{
    min-width: 15%;
}

.managementArea{

  display: flex;
  align-items: center;
  justify-content: right;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-right: 50px;
  height: 13%;
  /*background-color: blue;*/
  background-color: #EDEDED;
  margin-left: 30px;
  margin-right: 30px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}


.deleteButton, .updateButton, .popUpMADBottonYes, .popUpMADBottonNo{
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 1px;
  height: 37px;
  width: 160px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  transition: .3s ease-in;
  border: none;
}

.viewPermiButton{
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 1px;
  margin-left: 15px;
  margin-right: 15px;
  min-height: 35px;
  min-width: 115px;
  background-color: #1b375dc7;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  transition: .3s ease-in;
}

.deleteButton{
  background-color: #fae3a0;
  color:black;
  margin-left: 50px;
  margin-right: 30px;
}
.popUpMADBottonYes{
  background-color: #fae3a0;
  color:black;
  width: 100px;
  margin-right: 30px;
}
.deleteButton:hover, .popUpMADBottonYes:hover{
  background-color: #FCBF12;
  text-shadow: 1px 1px 5px #e2aa11;
}

.updateButton{
  background-color: #758CA3;
  color:white;
}
.popUpMADBottonNo{
  background-color: #758CA3;
  color:white;
  width: 100px;
}
.updateButton:hover, .popUpMADBottonNo{
  background-color: #1B365D;
  text-shadow: 1px 1px 5px #0f1e33;
}

.viewPermiButton:hover {
  background-color: #1b375d;
  color:#EDEDED;
  text-shadow: 1px 1px 5px #0f1e33;
  border: 1px solid #0a1524;
}
</style>