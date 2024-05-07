<template>
    <div class="popup-container" v-if="showPopup">
      <div class="popup-simple">
        <p style="font-weight: bold; color: #000; margin-bottom: 20px; font-size: 18px;">Solicitando permiso</p>
        <img src="/src/assets/img/puntos.png" alt="Imagen" class="popup-image-simple">
      </div>
    </div>
    <button @click="togglePopup">Abrir Pop-up Simple</button>
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
  
  .popup-simple {
    background-color: white;
    padding: 40px; /* Aumentar el espacio interior */
    border-radius: 10px;
    text-align: center;
    width: 80%; /* Ajustar el ancho */
    max-width: 600px; /* Establecer un ancho máximo */
  }
  
  .popup-image-simple {
    display: block;
    margin: 0 auto; /* Centro la imagen horizontalmente */
    width: 100px; /* Ajusta el tamaño según sea necesario */
    margin-top: 20px; /* Espacio entre el texto y la imagen */
  }
  </style>
  