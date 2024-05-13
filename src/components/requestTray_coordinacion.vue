<template>
    <div id="body">
      <div id="trayHeader">Bandeja de Solicitudes</div>
      <div class="scrollContainer">
        <div class="todayHeader">
          <div id="todayReceived" @click="toggleContent('today')">
            <div id="moment">Hoy</div>
            <div id="number">2</div>
            <button>
              <i class="bi bi-chevron-double-down" :class="{ 'rotate': showContent.today }"></i>
            </button>   
          </div>

          <div id="todayContent" v-show="showContent.today">
            <!-- Contenido del DIA DE HOY -->

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

        <div class="yesterdayHeader">
          <div id="yesterdayReceived" @click="toggleContent('yesterday')">
            <div id="moment">Ayer</div>
            <div id="number">1</div>
            <button>
              <i class="bi bi-chevron-double-down" :class="{ 'rotate': showContent.yesterday }"></i>
            </button>          
          </div>

          <div id="yesterdayContent" v-show="showContent.yesterday">
            <!-- Contenido del DIA DE AYER -->

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
        <div class="lastweekHeader">
          <div id="lastweekReceived" @click="toggleContent('lastweek')">
            <div id="moment">La semana pasada</div>
            <div id="number">5</div>
            <button>
              <i class="bi bi-chevron-double-down" :class="{ 'rotate': showContent.lastweek }"></i>
            </button>          
          </div>

          <div id="lastweekContent" v-show="showContent.lastweek">
            <!-- Contenido de la SEMANA PASADA-->
              
            <div id="userContent">
              <div id="iconUser"></div>    
              <div id="userName">
                KEVIN
              </div>
            </div>

          </div>
        </div>

        <div class="lastmonthHeader">

        <div id="lastmonthReceived" @click="toggleContent('lastmonth')">
          <div id="moment">El mes pasado</div>
          <div id="number">2</div>
          <button>
            <i class="bi bi-chevron-double-down" :class="{ 'rotate': showContent.lastmonth }"></i>
          </button>          
        </div>

        <div id="lastmonthContent" v-show="showContent.lastmonth">
        <!-- Contenido del MES PASADO -->

        <div id="userContent">
          <div id="iconUser"></div>    
          <div id="userName">
            EDGAR
          </div>
        </div>

        <div id="userContent">
          <div id="iconUser"></div>    
          <div id="userName">
            DEVANY
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
        today: true,
        yesterday: true,
        lastweek: true,
        lastmonth: true
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
  min-width: 275px;
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

#todayReceived, #yesterdayReceived, #lastweekReceived, #lastmonthReceived{
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

#todayContent, #yesterdayContent, #lastweekContent, #lastmonthContent{
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