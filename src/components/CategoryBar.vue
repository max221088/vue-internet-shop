<template>
    <div class="cat-bar navbar-light bg-light h-100" >
        <p class="title">Category</p>
        <div class="form-check" v-for="(item, index) in getCategories" :key="index">
            <input class="form-check-input" @input="filterCategory(item.id)" type="checkbox" value="" :id="'cl' + item.id">
            <label class="form-check-label" :for="'cl' + item.id">
                {{item.title}}
            </label>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'CategoryBar',
    components: {
    
    },
    data: function() {
        return {
            selectedCategory: []
        }
    },
    methods: {
        filterCategory(category) {
         let elementIndex = this.selectedCategory.indexOf(category);
        if (elementIndex != (-1)) {
          this.selectedCategory.splice(elementIndex, 1)
         } else {
           this.selectedCategory.push(category)
          }
            this.$store.commit('SelectedCategory', this.selectedCategory);
            this.$emit('filtByCategory');
        }
    },
    computed: {
        getCategories () {
          return this.$store.getters['getCategoriesFromDB'];
        },
    },
    created: function () {
        this.$store.dispatch('fetchCategories');
    }
}
  </script>