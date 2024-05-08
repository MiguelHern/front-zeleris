<template>
  <div class="popup-container" v-if="showPopup">
    <div class="popup">
      <img src="/src/assets/img/i.png" alt="Imagen" class="popup-image">
      <div class="popup-text">
        <p style="font-weight: bold; color: #000;">¿Estás segur@ de confirmar los datos?</p>
      </div>
      <div class="popup-buttons">
        <button class="popup-button yes" @click="confirm">Sí</button>
        <button class="popup-button no" @click="cancel">No</button>
      </div>
    </div>
  </div>
  <button @click="togglePopup">Abrir Pop-up</button>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false
    };
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    confirm() {
      // Lógica para confirmar los datos
      this.togglePopup();
    },
    cancel() {
      // Lógica para cancelar la operación
      this.togglePopup();
    }
  }
};
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.popup-image {
  display: block;
  margin: 0 auto; /* Centro la imagen horizontalmente */
  width: 60px; /* Tamaño reducido de la imagen */
}

.popup-text {
  border: 2px solid #2F6FEC; /* Cambio de color del borde */
  border-radius: 15px;
  margin: 10px 0;
  padding: 10px;
}

.popup-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10%; /* Separación entre los botones y el texto */
}

.popup-button {
  margin: 0 15%; /* Separación entre los botones */
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold; /* Texto en negrita */
  transition: background-color 0.3s; /* Transición de color de fondo */
}

.popup-button.yes {
  background-color: #5f99f2;
  color: white;
}

.popup-button.yes:hover {
  background-color: #2F6FEC;
}

.popup-button.no {
  background-color: #f27474; /* Cambio de color de fondo */
  color: white; /* Texto en blanco */
}

.popup-button.no:hover {
  background-color: #CF0000; /* Cambio de tono más claro al pasar el mouse */
}
</style>
