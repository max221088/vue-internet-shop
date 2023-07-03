<template>
  <div class="wrop-info container">
    <div class="article" v-for="article, index in content" :key="index">
      <h3 class="title">{{ article.title }}</h3>
      <p class="content">{{ article.content }}</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'AboutView',
    components: {
    
    },
    data: function() {
      return {
      
      }
    },
    computed: {
      content () {
        return this.$store.getters['getInfo'];
      },
    },
    created: function () {
      this.$store.dispatch('fetchAbout', 'Contacts');
    }
  }


</script>