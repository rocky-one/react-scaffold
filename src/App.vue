<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div id="actBox"></div>
    <div id="actBox2"></div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import create from './components/activity3/index.js'
import './components/activity3/index.css'
import Activity1 from './components/activity1';
import './components/activity1/index.css'; 
export default {
  name: 'App',
  components: {
    
  },
  mounted() {
    create('#actBox');
    Activity1.create(document.getElementById('actBox2'));
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
