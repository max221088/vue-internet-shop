<template>
    <div class="sort-panel navbar-light bg-light">
        <div class="sort-box">
            <p class="title"> Sort </p>
            <select class="form-select" v-model="SortParam" @change="selelectedSort">
                <option selected value="1">by name A-Z</option>
                <option value="2">by name Z-A</option>
                <option value="3">by price min-max</option>
                <option value="4">by price max-min</option>
            </select>
        </div>
        <div class="sort-box">
            <p class="title"> Products on page </p>
            <select class="form-select" v-model="ProductsOnPage" @change="selectProductsOnPage">
                <option selected value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SortPanel',
    props: [],
    data: function () {
        return {
            SortParam: '1',
            ProductsOnPage: '10'
        }
    },
    methods: {
         selelectedSort: function () {
            this.products.sort(function (a, b) {
                if (this.SortParam == 1) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (a.title < b.title) {
                        return -1;
                    }
                }
                if (this.SortParam == 2) {
                    if (a.title < b.title) {
                        return 1;
                        }
                    if (a.title > b.title) {
                        return -1;
                    }
                }
                if (this.SortParam == 3) {
                    if (a.prices.uah.value > b.prices.uah.value) {
                        return 1;
                    }
                    if (a.prices.uah.value < b.prices.uah.value) {
                        return -1;
                    }
                }
                if (this.SortParam == 4) {
                    if (a.prices.uah.value < b.prices.uah.value) {
                        return 1;
                    }
                    if (a.prices.uah.value > b.prices.uah.value) {
                        return -1;
                    }
                }
                return 0;
            }.bind(this));
            this.$store.commit('ProductSearch', this.products);
        },
        selectProductsOnPage: function () {
            this.$store.commit('ProductsOnPage', this.ProductsOnPage);
        }
    },
    computed: {
        products () {
        return this.$store.getters['getProductsFromDB'];
    },
    }
}
</script>