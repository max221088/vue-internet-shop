<template>
  <div id="app">
    <NavBar/>
    <router-view/>
    <ModalSendNewPass id="ModalConfirmSentPass" 
      class="modal fade" tabindex="-1" ria-hidden="true">
    </ModalSendNewPass>
    <DownFooter/>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import DownFooter from './components/DownFooter.vue'
  import ModalSendNewPass from './components/ModalSendNewPass.vue'

  export default {
    components: {
      NavBar,
      DownFooter,
      ModalSendNewPass
    },
  }
</script>

<style lang="less">
@import './assets/less/index.less';
</style>
