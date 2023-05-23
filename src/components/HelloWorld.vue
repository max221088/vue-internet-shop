<template>
  <div class="card" style="width: 18rem;">
  <img :src="product.avatar" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{product.title}}</h5>
    <p class="card-text">{{product.description}}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['product']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
