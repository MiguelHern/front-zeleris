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
        <span class="num">1</span>
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
    <div id="selectedDay"> 
      <div id="sel_Day">Fecha del permiso:</div>
      <div id="selectedDays">
        <input id="datePermit" type="date"></input>

      </div>
    </div>
    <div id="reasons"> Motivo de la solicitud:</div>
    <div id="text_Box">
      <textarea class="reasonsTexts" placeholder=" Coloca el motivo de la solicitud" ></textarea>
    </div>
  </div>

  <div class="submissionArea">
    <input class="signButton" type="submit" name="Boton1" value="Firmar"></input>
    <input class="cancelButton" type="submit" name="Boton2" value="Crear" @click="openPopup"></input>
  </div>

  <!-- Popup -->
  <div class="overlay" v-show="showPopup">
        <div class="popup_Two">
          <p id="popUp_Display">
            <SeePermit_coordinacion/>
          </p>
          <div id="popUp_AreaBtn">
            <button class="popUpMADBottonEditDoc" @click="confirmAction(true)">Editar documento</button>
            <button class="popUpMADBottonConfirm" @click="confirmAction(false)">Confirmar</button>
          </div>
        </div>
      </div>
  </body>
</template>

<script>
import SeePermit_coordinacion from "@/components/seePermit_coordinacion.vue";
export default {
  name: 'geneEcoPer_docente',
   props: {
    msg: String
  },
  mounted() {
    const plusButton = document.querySelector('.plus');
    const minusButton = document.querySelector('.minus');
    const numberElement = document.querySelector('.num');

    let number = parseInt(numberElement.textContent);

    plusButton.addEventListener('click', () => {
      if (number < 6) { 
        number++;
        numberElement.textContent = number;
        updateDatePermitInputs(number);
      }
    });

    minusButton.addEventListener('click', () => {
      if (number > 1) {
        number--;
        numberElement.textContent = number;
        updateDatePermitInputs(number);
      }
    });

    function updateDatePermitInputs(number) {
      const datePermitContainer = document.getElementById('selectedDays');
      // Eliminar todos los inputs existentes
      datePermitContainer.innerHTML = '';
      // Crear nuevos inputs según el número
      for (let i = 0; i < number; i++) {
        const input = document.createElement('input');
        input.setAttribute('type', 'date');
        input.setAttribute('id', 'datePermit');
        input.style.borderRadius = '6px';
        input.style.border = '1px solid black';
        input.style.padding = '5px';
        input.style.height = '30px';
        input.style.marginRight = '5px';
        input.style.textAlign = 'center';
        datePermitContainer.appendChild(input);
      }
    }
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
  },
  components: {
    SeePermit_coordinacion // Importante agregar el componente aquí
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
.popup_Two{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 550px; /* Ancho del popup */
  min-height: 95%; /* Alto del popup */
  background-color: white; /* Fondo blanco */
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 7px;
}
#popUp_Display{
  display: flex;
  padding-left: 13px;
  padding-right: 13px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%; 
  height: 80vh;
  justify-content: center;
  background-color: #C8C8C8;
}
#popUp_AreaBtn{
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%; 
  /*background-color: aqua;*/
}

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

#selectedDays, #selectedDay{
  padding: 10px;
  padding-bottom: 5px;
  padding-top: 3px;
}
#selectedDays{
  display: flex;
  flex-direction: row;
  max-width: 80%;
  justify-content: right;
  align-items: center;
  /*border: 1px solid black;*/
}
#sel_Day{
  display: flex;
  width: 130px;
  /*border: 1px solid yellow;*/
  align-items: center;
  text-align: center;
}
#selectedDay{
  display: flex;
  /*border: 1px solid blue;*/
  padding-right: 20px;
  margin-top: 10px;
  padding-top: 8px;
  justify-content: right;
}

#datePermit{
  border-radius: 6px;
  border: 1px solid black;
  padding: 5px;
  height: 30px;
  text-align: center;
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

.signButton, .cancelButton, .popUpMADBottonEditDoc, .popUpMADBottonConfirm{
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 1px;
  cursor: pointer;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  transition: .3s ease-in;
  border: none;
}
.signButton{
  background-color: #fae3a0;
  color:black;
  margin-right: 30px;
  font-size: 16px;
  border-radius: 5px;
  height: 40px;
  width: 250px;
}
.popUpMADBottonEditDoc{
  background-color: #fae3a0;
  font-size: 15px;
  color:black;
  width: 180px;
  border-radius: 15px;
  margin-right: 40px;
}
.signButton:hover, .popUpMADBottonEditDoc:hover{
  background-color: #FCBF12;
  text-shadow: 1px 1px 5px #e2aa11;
}
.cancelButton{
  background-color: #758CA3;
  color:white;
  font-size: 16px;
  border-radius: 5px;
  height: 40px;
  width: 250px;
}
.popUpMADBottonConfirm{
  background-color: #758CA3;
  font-size: 15px;
  color:white;
  border-radius: 15px;
  width: 180px;
}
.cancelButton:hover, .popUpMADBottonConfirm:hover {
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