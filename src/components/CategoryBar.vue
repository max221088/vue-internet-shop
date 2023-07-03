<template>
    <div class="cat-bar navbar-light bg-light h-100" >
            <form class="d-flex">
                <input v-model="searchQuery"  @input="searchProduct()" 
                class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            </form>
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
            selectedCategory: [],
            searchQuery: '',
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
            this.$emit('filtByCategory', this.selectedCategory, this.searchQuery);
        },
        searchProduct () {
            this.$emit('filtByCategory', this.selectedCategory, this.searchQuery);
        }
    },
    computed: {
        getCategories () {
        return this.$store.getters['getCategoriesFromDB'];
        },
    },
}
</script>