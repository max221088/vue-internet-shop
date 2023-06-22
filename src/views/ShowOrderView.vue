<template>
    <div class="wrop container">
      <h1>Thank You for Order</h1>
      <table class="table table-borderless">
  <tbody v-if="!!order.id">
    <tr>
      <td>Order - ID</td>
      <td>{{ order.id }}</td>
    </tr>
    <tr>
      <td>Client Name</td>
      <td>{{ order.clientName }}</td>
    </tr>
    <tr>
      <td>Address for delivery</td>
      <td>{{ order.address }}</td>
    </tr>
    <tr>
      <td>Contact number</td>
      <td>{{ order.tel }}</td>
    </tr>
    <tr>
        <td>Product in order</td>
        <td>
            <tr v-for="prod, index in order.products" :key="index">
                <th scope="row">{{ index+1 }} -</th>
                <td>{{ prod.title }}, </td>
                <td> quantity {{ prod.amount }}, </td>
                <td> Price {{ prod.price.value }} UAH</td>
            </tr>
        </td>
    </tr>
    <tr>
      <td>Estimated total</td>
      <td v-if="order.products" colspan="1">{{ sumOrder }} UAH</td>
    </tr>
  </tbody>
</table>
<div class="checkout">
    <router-link to='/' teg="button" 
    type="button" class="btn btn-success empty-cart">Return to Products</router-link>
</div>
    </div>
  </template>

<script>

export default {
    name: 'ShowOrder',
    components: {
        
    },
    data: function() {
        return {
            id: this.$route.params.id,
        }
    },
    methods: {
        
        
    },
    computed: {
        sumOrder () {
            let sum = 0;
            for (let i = 0; i < this.order.products.length; i++) {
                sum = sum +(this.order.products[i].price.value * this.order.products[i].amount) 
            }
            return sum
        },
        order () {
        return this.$store.getters['getShowOrder'];
    },
    },
    created: function () {
        this.$store.dispatch('fetchOrderFromID', this.id);
  }
}

</script>