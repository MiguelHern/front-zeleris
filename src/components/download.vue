<template>
  <div class="download-container">
    <button class="download-button yes" @click="downloadDocx">Descargar .docx</button>
  </div>
</template>

<script>
export default {
  methods: {
    downloadDocx() {
      // Cadena base64 de un archivo .docx vacío
      /*const base64String = 'UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==';*/ //ejemplo doc vacio

      // Decodificar la cadena base64
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Crear un Blob a partir del array de bytes
      const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

      // Crear un enlace temporal para descargar el archivo
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'documento.docx';

      // Añadir el enlace al DOM, hacer clic en él y luego removerlo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>

<style scoped>
.download-container {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100vh; /* Altura total de la ventana */
}

.download-button {
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  font-family:sans-serif;
  transition: background-color 0.3s;
  border: none;
}

.download-button.yes {
  
  background-color: var(--grayy);
  color: white;
}

.download-button.yes:hover {
  background-color: var(--principal-color);
}
</style>
