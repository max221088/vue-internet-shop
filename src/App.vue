<template>
  <div id="app">
    <NavBar/>
    <router-view/>
    <DownFooter></DownFooter>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import DownFooter from './components/DownFooter.vue'


export default {
  components: {
    NavBar,
    DownFooter
    
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
