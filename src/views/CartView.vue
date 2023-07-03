<template>
    <div class="cart-wrop">
        <div class="container">
            <div v-if="!productForCart.length" class="empty-cart"><h2 class="center-block">Cart is Empty</h2></div>
            <table class="table" v-if="!!productForCart.length">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product in Cart</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Price</th>
                    <th scope="col">Subtotal</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row, index in productForCart" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td><router-link :to="{name: 'product' , params:{id:row.id}}" >{{ row.title }}</router-link></td>
                    <td><span class="btn-amount" @click="decrement(index)"> -</span>
                        {{ row.amount }}
                    <span class="btn-amount" @click="increment(index)"> + </span></td>
                    <td>{{ row.price.value }} 
                        <span class="case-up">{{ row.price.unit }}</span></td>
                    <td>{{ row.price.value * row.amount }}
                        <span class="case-up">{{ row.price.unit }}</span></td>
                    <td data-bs-toggle="modal" data-bs-target="#ModalConfirmDel"><span 
                            @click="delProduct(index)" 
                            class="btn btn-danger" >Delete</span>
                    </td>
                    </tr>
                    <tr scope="row" class="table-success">
                        <th scope="col" colspan="4">Estimated total</th>
                        <th scope="col">{{ sumOrder }} UAH</th>
                        <th></th>
                    </tr>
                </tbody>
            </table>
            <div class="checkout" v-if="!!productForCart.length">
                <router-link to="/cart/checkout" type="button" class="btn btn-success">Checkout</router-link>
            </div>
            <div class="checkout" v-if="!productForCart.length">
                <router-link to='/' teg="button" 
                type="button" class="btn btn-success empty-cart">Return to Products</router-link>
            </div>
            <ModalConfirm id="ModalConfirmDel" :msg="'Remove product '+delProd+' from cart ?' " 
                :btnText="'Delete'" @DelProduct="delProductFromCart"></ModalConfirm>
        </div>
    </div>
</template>

<script>
    import ModalConfirm from '../components/ModalConfirm.vue'

    export default {
        name: 'CartView',
        components: {
            ModalConfirm
        },
        data: function() {
            return {
                delProd: '',
                index: ''
            }
        },
        methods: {
            increment(index) {
                this.$store.commit('incrementAmount', index)
            },
            decrement(index) {
                this.$store.commit('decrementAmount', index)
                
            },
            delProduct(index) {
                this.index = index;
                this.delProd = this.productForCart[index].title;
            },
            delProductFromCart () {
                this.$store.commit('delProductFromCart', this.index);
                this.delProd = '';
                this.index = '';
            }
            
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