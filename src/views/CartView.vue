<template>
    <div class="cart-wrop">
        <div class="container">
            <div v-if="!productForCart.length"><h2>Cart is Empty</h2></div>
            <table class="table" v-if="!!productForCart.length">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product in Cart</th>
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
            <div class="checkout" v-if="!!productForCart.length">
                <button type="button" class="btn btn-success">Checkout</button>
            </div>
            <div class="checkout" v-if="!productForCart.length">
                <router-link to='/' teg="button" 
                type="button" class="btn btn-success">Return to Products</router-link>
            </div>
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
        return this.$store.getters['getCartProducts'];
    },
    },
    created: function () {
        this.$store.dispatch('fetchProducts');
  }
}
  </script>