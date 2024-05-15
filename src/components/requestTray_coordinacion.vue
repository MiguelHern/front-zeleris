<template>
    <div id="body">
      <div id="trayHeader">Bandeja de Solicitudes</div>
      <div class="scrollContainer">
        <div class="pendienteHeader">
          <div id="pendienteReceived" @click="toggleContent('pendiente')">
            <div id="moment">Pendientes</div>
            <div id="number">2</div>
            <button>
              <i class="bi bi-chevron-double-down" :class="{ 'rotate': showContent.pendiente }"></i>
            </button>   
          </div>

          <div id="pendienteContent" v-show="showContent.pendiente">
            <!-- CONTENIDO PENDIENTE -->

            <div id="userContent">
              <div id="iconUser"></div>    
              <div id="userName">
                Heribe
              </div>
            </div>

            <div id="userContent">
              <div id="iconUser"></div>    
              <div id="userName">
                Julio
              </div>
            </div>

          </div>
        </div>

        <div class="oldHeader">
          <div id="oldReceived" @click="toggleContent('old')">
            <div id="moment">Antiguos</div>
            <div id="number">1</div>
            <button>
              <i class="bi bi-chevron-double-down" :class="{ 'rotate': showContent.old }"></i>
            </button>          
          </div>

          <div id="oldContent" v-show="showContent.old">
            <!-- CONTENIDO ANTIGUO -->

            <div id="userContent">
              <div id="iconUser"></div>    
              <div id="userName">
                  CANDY
              </div>
            </div>

            <div id="userContent">
              <div id="iconUser"></div>    
              <div id="userName">
                ALONDRA
              </div>
            </div>

            <div id="userContent">
              <div id="iconUser"></div>    
              <div id="userName">
                MIGUEL
              </div>
            </div>

            <div id="userContent">
              <div id="iconUser"></div>    
              <div id="userName">
                ALEX
              </div>
            </div>

          </div>

        </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'requestTray_coordinacion',
  props: {
    msg: String
  },
  data() {
    return {
      showContent: {
        pendiente: true,
        old: true
      }
    };
  },
  methods: {
    toggleContent(section) {
      this.showContent[section] = !this.showContent[section];
    }
  }
}
</script>

<style scoped>
.scrollContainer {
  overflow-y: auto;
  max-height: calc(100vh - 70px); /* Restamos el alto del trayHeader */
}

#body{
  display: flex;
  flex-direction:column;
  max-width: 280px;
  height: 100%;
  /*border: 3px solid blue;*/
  background-color:#EDEDED;
}

#trayHeader{
  height: 50px;
  background-color: #1B365D;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 650;
  font-size: 15px;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  margin: 7px;
  border-radius: 4px;
  text-align: left;
  align-content: center;
}

#pendienteReceived, #oldReceived{
  display: flex;
  height: 35px;
  background-color: #C8C8C8;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: black;
  padding-left: 15px;
  padding-right: 10px;
  border-radius: 6px;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 8px;
  margin-right: 8px;
}

#moment{
  text-align: left;
  align-content: center;
  /*border: 3px solid red;*/
  width: 180px;
}

#number{
  text-align: center;
  align-content: center;
  /*border: 3px solid blueviolet;*/
  width: 25px;
}

button{
  background-color: transparent;
  border-color: transparent;
  padding-left: 5px;
  padding-right: 5px;
  width: 30px;
  height: 35px;
  align-items: center;
  align-content: center;
}

#pendienteContent, #oldContent{
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  color: black;
  /*background-color: aqua;*/
}

#userContent{
  display: flex;
  /*border: 3px solid blueviolet;*/
  background-color: #e2e2e2;
  height: 45px;
  border-radius: 6px;
  margin-top: 5px;
  margin-left: 13px;
  margin-right: 10px;
}

#userName{
  text-align: left;
  align-content: center;
  padding-left: 3px;
}

#iconUser{
  background-color: #FCBF12;
  width: 34px;
  margin: 5px;
  border-radius: 6px;
}
</style>