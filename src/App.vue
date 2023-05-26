<template>
  <div id="app">
    <FilterBox @filtByQuery="filteredProducts"/>
    <CategoryBar @filtByCategory="filteredProducts"/>
    <PaginationBar @renderPage="filteredProducts"/>
    <router-view/>
  </div>
</template>

<script>
import FilterBox from './components/FilterBox.vue'
import CategoryBar from './components/CategoryBar.vue'
import PaginationBar from './components/PaginationBar.vue'

export default {
  components: {
    FilterBox,
    CategoryBar,
    PaginationBar,
  },
  data: function () {
    return {
      
    }
  },
  methods: {
    filteredProducts() {
      let products = [];
      let paginatedProducts = [[]];
      let index = 0;
      products = (this.selectedCategory.length || this.query)
      ? this.productsForSearch.filter(product => {
          return ((this.selectedCategory.length) 
        ? product.category.some(category =>{
          return (this.selectedCategory.indexOf(category) != (-1))
          }) : true)
        && ~product.title.toLowerCase().indexOf(this.query.toLowerCase());
      })
      : this.productsForSearch
      for (let i = 0; i < products.length; i++) {
        if (i % this.ProductsOnPage == 0 && i != 0) {
          index ++;
          paginatedProducts[index] = []
        }
        paginatedProducts[index].push(products[i]);
      }
      this.$store.commit('filteredProducts', paginatedProducts);
    },
  },
  computed: {
    query () {
        return this.$store.getters['getQuery'];
    },
    selectedCategory () {
        return this.$store.getters['getSelectedCategory'];
    },
    productsForSearch () {
        return this.$store.getters['getProductsForSearch'];
    },
    CurrentPage () {
      return this.$store.getters['getCurrentPage'];
    },
    ProductsOnPage () {
      return this.$store.getters['getProductsOnPage'];
    },
  },
  created: function () {
    this.$store.dispatch('fetchProductsForSearch');
    this.$store.commit('filteredProducts', this.productsForSearch);
  }
}

</script>

<style lang="less">
@import './assets/less/style.less';
</style>
