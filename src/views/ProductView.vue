<template>
    <div class="wrop">
      <div class="container left-side">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button"  data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="'Slide 1"></button>
                <button type="button" v-for="item, index in product.gallery" :key=index data-bs-target="#carouselExampleIndicators" :data-bs-slide-to=index+1 :aria-label="'Slide'+' '+index+2"></button>
                <!-- <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button> -->
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img :src=product.avatar class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item" v-for="item, index in product.gallery" :key="index">
                    <img :src=item class="d-block w-100" alt="...">
                </div>
                <!-- <div class="carousel-item">
                    <img src="" class="d-block w-100" alt="...">
                </div> -->
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Prev</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <div class="container right-side">
        <div class="container title">
            <p class="container title-product">{{ product.title }}</p>
            <p class="container short"> {{ product.short }}</p>
        </div>
        <div class="container description"> {{ product.description }}</div>
        <div class="container price" v-if="product.title">
            <p class="value case-up">{{ product.price.value }} {{ product.price.unit }}</p>
        </div>
    </div>
  </div>
  </template>

<script>

  export default {
    name: 'ProductView',
    components: {
    
    },
    data: function() {
        return {
        product: this.$route.params.data
        }
    },
    methods: {
        
    },
    computed: {
       
    },
    created: function () {
    
  }
}
  </script>