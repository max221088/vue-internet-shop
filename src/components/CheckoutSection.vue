<template>
  <div class="wrop-chekout container" id="check">
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
      <textarea v-model="order.clientComment" class="form-control"></textarea>
    </div>
    <div class="checkout checkout-btn mt-2" v-if="formFill">
      <button type="button" @click="checkout"
      class="btn btn-success">Checkout</button>
    </div>
    <div class="checkout checkout-btn mt-2" v-if="!formFill">
      <button aria-disabled="true" 
      type="button" class="btn btn-secondary disabled">Checkout</button>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: 'CheckoutView',
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
          clientComment: '',
          status: 'new',
          serviseComment: ''
        },
        isFormFill: false,
      }
    },
    methods: {
      scroll () {
        document.getElementById('check').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      },
      checkout () {
        this.order.products = this.productForCart;
        this.order.id = 'order-' + Date.now().toString();
        if (this.isLogin) {
          this.order.idClient = this.userData.uid;
          this.$store.commit('addOrderToUserHistory', this.order.id);
          this.$store.dispatch('addUserDataToDB', this.userData);
        } else {
          this.order.idClient = 'anonymous-' + Date.now().toString();
        }
        this.$store.dispatch('addOrderToDB', this.order);
        this.$store.commit('cartEmpty');
        this.$emit('order', this.order);
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
      userData () {
        return this.$store.getters['getUserData'];
      },
      isLogin () {
        return this.$store.getters['getIsLogin'];
      },
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
      if (this.isLogin) {
        this.order.address = this.userData.address;
        this.order.tel = this.userData.tel;
        this.order.clientName = this.userData.name;
      }
    }
  } 
</script>