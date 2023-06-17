<template>
    <div class="cart-wrop">
        <div class="container">
            <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product Title</th>
      <th scope="col">Amount</th>
      <th scope="col">Price</th>
      <th scope="col">Subtotal</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row, index in productForCart" :key="index">
      <th scope="row">{{ index + 1 }}</th>
      <td><router-link :to="{name: 'product' , params:{id:row.id}}" >{{ row.title }}</router-link></td>
      <td>{{ row.amount }}</td>
      <td>{{ row.price.value }} 
        <span class="case-up">{{ row.price.unit }}</span></td>
      <td>{{ row.price.value * row.amount }}
        <span class="case-up">{{ row.price.unit }}</span></td>
    </tr>
    <tr scope="row" class="table-success">
      <th scope="col" colspan="4">Estimated total</th>
      <th scope="col">{{ sumOrder }} UAH</th>
    </tr>
  </tbody>
</table>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'CartView',
    components: {
    
    },
    data: function() {
        return {
        unit: 'uah'
        }
    },
    methods: {
        
    },
    computed: {
        sumOrder () {
            let sum = 0;
            this.productForCart.forEach(prod => {
                sum = sum +(prod.price.value * prod.amount) 
            })
            return sum
        },
        productForCart () {
        return this.$store.getters['getCartRenderData'];
    },
    },
    created: function () {
        this.$store.dispatch('fetchProducts');
  }
}
  </script>