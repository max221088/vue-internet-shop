<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld v-for="(product , index) in getProductsFromDB" :product="product" :key="index"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  computed: {
    getProductsFromDB () {
          return this.$store.getters['getProductsFromDB'];
      },
  },
  created: function () {
    this.$store.dispatch('fetchProducts');
  }
}
</script>
