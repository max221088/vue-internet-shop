<template>
  <div>
    <CategoryBar @filtByCategory="filteredProducts" @filtByQuery="filteredProducts"/>
    <SortPanel/>
    <div class="product-container">
      <ProductCard v-for="product in productsRender[CurrentPage]" :product="product" :key="product.id"/>
      <PaginationBar @renderPage="SelectPage" :Products="productsRender"/>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '/src/components/ProductCard.vue'
import CategoryBar from '/src/components/CategoryBar.vue'
import PaginationBar from '/src/components/PaginationBar.vue'
import SortPanel from '/src/components/SortPanel.vue'


export default {
  name: 'HomeView',
  components: {
    ProductCard,
    CategoryBar,
    PaginationBar,
    SortPanel
  },
  data: function () {
    return {
      CurrentPage: 0
    }
  },
  methods: {
    filteredProducts(selectedCategory, query ) {
      let products = [];
      products = (selectedCategory.length || query)
      ? this.productsForSearch.filter(product => {
          return ((selectedCategory.length) 
        ? product.category.some(category =>{
          return (selectedCategory.indexOf(category) != (-1))
          }) : true)
        && ~product.title.toLowerCase().indexOf(query.toLowerCase());
      })
      : this.productsForSearch
      this.$store.commit('ProductSearch', products);
    },
    SelectPage(data) {
      this.CurrentPage = data;
    }
  },
  computed: {
    productsForSearch () {
        return this.$store.getters['getProductsForSearch'];
    },
    productsRender () {
        return this.$store.getters['getProductsForRender'];
    },
  },
  created: function () {
    this.$store.dispatch('fetchProducts');
    this.$store.dispatch('fetchCategories');
  }
}
</script>
