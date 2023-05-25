<template>
  <div class="product-container">
    <ProductCard v-for="(product , index) in Products" :product="product" :key="index"/>
  </div>
  
</template>

<script>
// @ is an alias to /src
import ProductCard from '/src/components/ProductCard.vue'


export default {
  name: 'HomeView',
  components: {
    ProductCard,

  },
  computed: {
    Products () {
          return this.$store.getters['getProductsForRender'];
      },
  },
  created: function () {
    this.$store.dispatch('fetchProducts');
    
  }
}
</script>
