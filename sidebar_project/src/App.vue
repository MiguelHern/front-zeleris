<template>
  <fristComponent/>
  <HelloWorld msg="EXAMPLE"/>
</template>

<script>
import fristComponent from './components/fristComponent.vue'
import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    fristComponent,
    HelloWorld
  }
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

#app {
  display: flex;
  main{
    flex: 1 1 0;
    padding: 2rem;
  }

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
