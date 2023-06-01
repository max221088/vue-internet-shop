<template>
    <div class="container">
      <p>Show me {{ id }}</p>
  </div>
  </template>

<script>

  export default {
    name: 'ProductView',
    components: {
    
    },
    data: function() {
        return {
        id: this.$route.params.id
        }
    },
    methods: {
        
    },
    computed: {
    },
    
}
  </script>