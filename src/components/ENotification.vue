<script setup>

</script>

<template>
  <div class="layoutt">
  <header>
    <div class="header-content">
      <div class="title">
        <h1>Zeleris</h1>
      </div>
      <div class="logo">
        <img width="150px" alt="Logo Zeleris" src="/src/assets/img/Zeleris.jpg"/>
      </div>
    </div>
  </header>
  <section class="frame">
    <div class="frame-content">
      <div class="text1">
        <p>Acabas de recibir un Permiso Económico.</p>
      </div>
      <div class="text2">
        <p>[nombre del solicitante] ha solicitado un Permiso Económico.</p>
      </div>
      <div class="text3">
        <p>Revisa con detalle el contenido del <span>permiso económico</span> que te
          ha sido asignado y confirmar tu aceptación mediante la firma
          correspondiente. Haz clic en el siguiente botón para ver los
          <span>DETALLES.</span></p>
      </div>
      <button>Ver Detalles</button>
      <div class="text4">
        <p>[AVISO DE PRIVACIDAD]</p>
      </div>
    </div>
  </section>
  </div>
</template>

<style scoped>
.layoutt {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #03F0F0;
  width: 700px;
  height: 188px;
  padding: 20px 0;
  margin: 0 auto;
}
.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo img {
  width: 256px;
}

.title {
  margin-top: 10px;
}

.title h1 {
  margin: 0;
  font-size: 64px;
  color: #ffffff;
}

.frame {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  padding: 60px 0;
}

.frame-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text {
  margin: 10px 0;
}

.text1 p {
  /*text-transform: capitalize;*/
  font-size: 40px;
  text-align: center;
  font-weight: 900;
}

.text2 p{
  font-size: 40px;
  text-align: center;
  font-weight: 600;
}

.text3 p{
  font-size: 36px;
  text-align: center;
  font-weight: 600;
}
.text3 p span {
  color: red;
}


button {
  background-color: #1B365D;
  color: white;
  padding: 10px 20px;
  font-size: 48px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 10px;
}

button:hover {
  background-color: #03F0F0;
  transition: 0.3s;
}

.text4 p{
  font-size: 35px;
  text-align: center;
  font-weight: 600;
}
</style>