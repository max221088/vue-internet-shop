<template>
    <nav  class="pagination-bar navbar-light bg-light">
        <ul class="pagination pagination-sm" >
            <li class="page-item" aria-current="page" v-for="(item, index) in Products" :key="index" 
            @click="pageNumber = index, selectedPage()">
                <span class="page-link" v-bind:class="{ active: pageNumber === index }" >
                    {{index + 1}}
                </span>
            </li>           
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'PaginationBar',
    props: ['Products'],
    data: function () {
        return {
            pageNumber: 0,
        }
    },
    methods: {
        selectedPage: function () {
            this.$emit('renderPage', this.pageNumber);
        }
    },
    computed: {
        
    }
}
</script>