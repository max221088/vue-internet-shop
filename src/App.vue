<template>
  <div id="app">
    <FilterBox @filtByQuery="filteredProducts"/>
    <CategoryBar @filtByCategory="filteredProducts"/>
    <router-view/>
  </div>
</template>

<script>
import FilterBox from './components/FilterBox.vue'
import CategoryBar from './components/CategoryBar.vue'

export default {
  components: {
    FilterBox,
    CategoryBar,
  },
  data: function () {
    return {
      //productsOnPage: 1,
    }
  },
  methods: {
    filteredProducts() {
      let products = [];
      //let paginatedProducts = [[]];
      //let index = 0;
      products = (this.selectedCategory.length || this.query)
      ? this.productsForSearch.filter(product => {
        return ((this.selectedCategory.length) 
        ? product.category.some(category =>{
          return (this.selectedCategory.indexOf(category) != (-1))
        }) : true)
        // ~this.selectedCategory.indexOf(product.category.toString()) : true)
         && ~product.title.toLowerCase().indexOf(this.query.toLowerCase());
      })
      : this.productsForSearch
      // for (let i = 0; i < products.length; i++) {
      //   if (i % this.productsOnPage == 0 && i != 0) {
      //     index ++;
      //     paginatedProducts[index] = []
      //   }
      //   paginatedProducts[index].push(products[i]);
      // }
      //return paginatedProducts;
      //console.log(paginatedProducts)
      this.$store.commit('filteredProducts', products);
      
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
    },
    created: function () {
        this.$store.dispatch('fetchProductsForSearch');
    }
}

</script>

<style lang="less">
@import './assets/less/style.less';
</style>
