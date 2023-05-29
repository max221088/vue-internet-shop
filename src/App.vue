<template>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'


export default {
  components: {
    NavBar
  },
  data: function () {
    return {
      
    }
  },
  methods: {
    
  },
  computed: {
    
  },
  created: function () {
    
  }
}

</script>

<style lang="less">
@import './assets/less/style.less';
</style>
