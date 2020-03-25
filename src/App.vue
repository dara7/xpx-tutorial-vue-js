<template>
  <div id="app">
    <SampleSdk msg="XPX-Tutorial-Vue-JS"/>
  </div>
</template>

<script>
import SampleSdk from './components/sample-sdk/SampleSdk'

export default {
  name: 'App',
  components: {
    SampleSdk
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
  margin-top: 0px;
}
</style>
