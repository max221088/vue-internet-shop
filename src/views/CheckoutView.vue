<template>
    <div class="wrop container">
        <div>You can <span class="login-btn link-success">Login</span> or fill in the details</div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Telephone</span>
            <input v-model="order.tel" type="text" class="form-control" placeholder="+(380) 111-11-11" 
            aria-label="Имя пользователя" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Name, First Name</span>
            <input v-model="order.clientName" type="text" class="form-control" 
            placeholder="Enter Name and First Name" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Delyvery Address</span>
            <input v-model="order.address" type="text" class="form-control" 
            placeholder="Enter City, street, house" aria-describedby="basic-addon1">
        </div>
        <div class="input-group">
            <span class="input-group-text">Add order comment</span>
            <textarea v-model="order.comment" class="form-control"></textarea>
        </div>
        <div class="checkout checkout-btn mt-2" v-if="formFill">
                <button type="button" @click="checkout"
                class="btn btn-success">Checkout</button>
        </div>
        <div class="checkout checkout-btn mt-2" v-if="!formFill">
                <button aria-disabled="true" 
                type="button" class="btn btn-secondary disabled">Checkout</button>
        </div>
         <AlertSuccess ref="success"></AlertSuccess>
    </div>
</template>
  
<script>

import AlertSuccess from '../components/alerts/AlertSuccess.vue'

export default {
  name: 'CheckoutView',
  components: {
    AlertSuccess
  },
  data: function() {
      return {
          delProd: '',
          index: '',
          order: {
            address: '',
            clientName: '',
            id: '',
            tel: '',
            idClient: '',
            comment: ''
          },
          isFormFill: false,
      }
  },
  methods: {
    checkout () {
        this.order.products = this.productForCart;
        this.order.id = 'order-' + Date.now().toString();
        this.order.idClient = 'anonymous-' + Date.now().toString();
        this.$store.dispatch('addOrderToDB', this.order);
        this.$refs.success.show();
        this.$router.push({name: 'orderShow' , params:{id: this.order.id}});
        this.$store.commit('cartEmpty');
    },
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
        formFill () {
            if (this.order.tel && this.order.clientName) {
                if (this.order.address) {
                    return true
                } else {
                    return false
                }
            } else {
                    return false
                }
        }
    },
  created: function () {
      this.$store.dispatch('fetchProducts');
}
}
  
</script>