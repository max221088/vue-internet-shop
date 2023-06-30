<template>
  <div class="card" style="width: 14rem;">
    <img :src="product.avatar" class="card-img-top" >
    <div class="card-body">
      <router-link :to="{name: 'product' , params:{data:product}}" >
      <h5 class="card-title ">{{product.title}}</h5>
    </router-link>
      <p class="card-text my-1 fw-light">{{product.short}}</p>
      <p class="card-price my-1">
        <span class="fs-5 text-capitalize">Price:</span> 
        {{ product.price.value }} {{ product.price.unit }}
      </p>
      <router-link :to="{name: 'product' , params:{data:product}}" 
        class="btn btn-primary btn-sm" >Details
      </router-link>
      <div class="btn btn-sm btn-success buy" :data-id="product.id"
         @click="addToCart(product)">Add to Cart</div>
      <div class="container-fluid amount" v-if="isShowAmount">
        <div class="btn-lable-amount">Enter Amount</div>
        <input v-model="valueInput" @change="onChange(product.id)"
        class="form-control form-control-sm amount-in" type="text">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  data: () => {
    return {
      valueInput: '1',
      isShowAmount: false
    }
  },
  computed: {
    listProd () {
      return this.$store.getters['getListProd']
    }
  },
  methods: {
    addToCart(product) {
      product.amount = "1";
      this.$store.commit('addProductToCard', product)
      this.isShowAmount = true;
    },
    onChange (id) {
      let amount = [id, this.valueInput]
      this.$store.commit('addAmountToCart', amount )
     }
  },
  
}
</script>

