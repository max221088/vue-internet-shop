<template>
  <div class="card" style="width: 16rem;">
    <img :src="product.avatar" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{product.title}}</h5>
      <p class="card-text">{{product.short}}</p>
      <p>Price:</p>
      <p class="card-price">{{ product.price.value }} {{ product.price.unit }}</p>
      <router-link :to="{name: 'product' , params:{id:product.id}}" class="btn btn-primary" >Details</router-link>
      <div class="btn btn-success buy" :data-id="product.id" @click="AddTobasket($event)">Buy</div>
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
      productData: [],
      amount: {},
      isShowAmount: false
    }
  },
  computed: {
    ListProd () {
      return this.$store.getters['getListProd']
    }
  },
  methods: {
    AddTobasket(event) {

       let id = null;
       id = event.target.getAttribute('data-id');
       let amount = [id, '1']
        this.$store.commit('ListProductAmountUpdate', amount)
       this.$store.commit('ListProductIDUpdate', id)
      // this.productData.push(id);
      // console.log(this.productData)
      // console.log(this.ListProd)
      // let add = {[id]: '1'}
      // this.amount[id] = '1';
      // Object.assign(this.amount, add)
      // console.log(this.amount)
      this.isShowAmount = true;


    },
    onChange (id) {
      let amount = [id, this.valueInput]
      this.$store.commit('ListProductAmountUpdate', amount )
       //this.amount[id] = this.valueInput
       //console.log(this.amount)
       console.log(this.ListProd, id)
     }
  },
  
}
</script>

