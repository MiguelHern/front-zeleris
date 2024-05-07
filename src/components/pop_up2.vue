<template>
    <div class="popup-container" v-if="showPopup">
      <div class="popup-rectangular">
        <p style="font-weight: bold; color: #000; margin-bottom: 20px; font-size: 18px;">Creando permiso</p>
        <img src="/src/assets/img/puntos.png" alt="Imagen" class="popup-image-rectangular">
        <div class="popup-footer">
          <button class="popup-button cancel" @click="cancel">Cancelar</button>
        </div>
      </div>
    </div>
    <button @click="togglePopup">Abrir Pop-up Rectangular</button>
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
  
  .popup-rectangular {
    background-color: white;
    padding: 40px; /* Aumentar el espacio interior */
    border-radius: 10px;
    text-align: center;
    width: 80%; /* Ajustar el ancho */
    max-width: 600px; /* Establecer un ancho máximo */
  }
  
  .popup-image-rectangular {
    display: block;
    margin: 0 auto; /* Centro la imagen horizontalmente */
    width: 100px; /* Ajusta el tamaño según sea necesario */
    margin-top: 20px; /* Espacio entre el texto y la imagen */
  }
  
  .popup-footer {
    margin-top: 20px; /* Espacio entre la imagen y el pie de página */
  }
  
  .popup-button {
    padding: 10px 0; /* Eliminar el relleno horizontal */
    width: 100%; /* Botón de ancho completo */
    cursor: pointer;
    border: 2px solid black; /* Borde negro */
    border-radius: 0; /* Sin bordes redondeados */
    font-weight: bold; /* Texto en negrita */
    transition: background-color 0.3s; /* Transición de color de fondo */
  }
  
  .popup-button.cancel {
    background-color: transparent; /* Botón sin color de fondo */
    color: black; /* Texto en negro */
  }
  
  .popup-button.cancel:hover {
    background-color: #f0f0f0; /* Cambio de tono más claro al pasar el mouse */
  }
  </style>
  