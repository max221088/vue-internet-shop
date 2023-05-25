<template>
  <div class="card" style="width: 16rem;">
  <img :src="product.avatar" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{product.title}}</h5>
    <p class="card-text">{{product.short}}</p>
    <p>Price:</p>
    <p class="card-price">{{ product.prices.uah.value }} {{ product.prices.uah.unit }}</p>
    <a :href=product.id class="btn btn-primary">Details</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product']
}
</script>

