<template>
  <div class="product-container">
    <ProductCard v-for="product in Products[CurrentPage]" :product="product" :key="product.id"/>
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
  data: function () {
    return {

    }
  },
  computed: {
    Products () {
      return this.$store.getters['getProductsForRender'];
      },
    CurrentPage () {
      return this.$store.getters['getCurrentPage'];
    },
  },
  created: function () {
    this.$store.dispatch('fetchProducts');
  }
}
</script>
