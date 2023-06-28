<template>
    <div class="wrop-info container">
        Your Orders
        <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item" v-for="order, index in orders" :key="index">
                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" 
                        aria-controls="panelsStayOpen-collapseOne">
                        Date - {{ getDate(order.id) }}  Status- {{ order.status }} 
                        Summmary -  {{ sumOrder(order.products) }} UAH
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <div class="accordion-body">
                        <div class="row"> 
                            <div class="col">
                                #
                            </div>
                            <div class="col">
                                Avatar
                            </div>
                            <div class="col-4">
                                Product Title
                            </div>
                            <div class="col">
                                Quantity
                            </div>
                            <div class="col">
                                Price
                            </div>
                            <div class="col">
                                Total
                            </div>
                        </div>
                        <div class="row" v-for="product, index in order.products" :key="index"> 
                            <div class="col">
                                {{ index+1 }}
                            </div>
                            <div class="col">
                                <img class="prod-avatar" :src="product.avatar">
                            </div>
                            <div class="col-4">
                                <router-link :to="{name: 'product' , params:{data:product}}" >{{ product.title }}</router-link>
                            </div>
                            <div class="col">
                                {{ product.amount }}
                            </div>
                            <div class="col">
                                {{ product.price.value }} UAH
                            </div>
                            <div class="col">
                                {{ product.price.value * product.amount }} UAH
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  
  export default {
      name: 'userOrders',
      components: {
      
      },
      data: function() {
          return {
          }
      },
      methods: {
        sumOrder (products) {
            let sum = 0;
            for (let i = 0; i < products.length; i++) {
                sum = sum +(products[i].price.value * products[i].amount) 
            }
            return sum
        },
        getDate (id) {
            let dateNow = Number(id.split('-').pop());
            let date =  new Date(dateNow).toLocaleString();
            return date
        },
      },
      computed: {
        orders () {
            return this.$store.getters['getUserOrders'];
        },
      },
      created: function () {
      this.$store.dispatch('fetchUsersOrders');
    }
  }
  
  
  </script>