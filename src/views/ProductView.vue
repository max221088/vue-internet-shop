<template>
    <div class="wrop">
      <div class="container left-side">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button"  data-bs-target="#carouselExampleIndicators" 
                    data-bs-slide-to="0" class="active nav-btn" aria-current="true" aria-label="'Slide 1"></button>
                <button type="button" v-for="item, index in product.gallery" :key=index 
                    data-bs-target="#carouselExampleIndicators" :data-bs-slide-to=index+1 
                        :aria-label="'Slide'+' '+index+2" class="nav-btn"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img :src=product.avatar class="d-block img-fluid" alt="...">
                </div>
                <div class="carousel-item" v-for="item, index in product.gallery" :key="index">
                    <img :src=item class="d-block img-fluid" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" 
                data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon nav-btn-side-left" aria-hidden="true"></span>
                <span class="visually-hidden">Prev</span>
            </button>
            <button class="carousel-control-next" type="button" 
                data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon nav-btn-side-right" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <div class="container right-side col-8">
        <div class="container title">
            <p class="container title-product">{{ product.title }}</p>
            <p class="container short"> {{ product.short }}</p>
        </div>
        <h6 class="title-description">Description:</h6>
        <div class="container description"> {{ product.description }}</div>
        <div class="container price" v-if="product.title">
            <p v-if="!productFromDB" class="value case-up absent">
                {{ product.price.value }} {{ product.price.unit }}
            </p>
            <p v-if="!productFromDB">Sorry, product is out of stock</p>
            <div class="buy-container" v-if="productFromDB">
                <p  class="value">Price : </p>
                <p class="value case-up">{{ product.price.value }} {{ product.price.unit }}</p>
                <div class="btn btn-success buy" :data-id="product.id" @click="addToCart">Add to Cart</div>
            </div>
            <div class="container-fluid amount" v-if="isShowAmount">
                <div class="btn-lable-amount">Enter Amount</div>
                <input v-model="valueInput" @change="onChange"
                    class="form-control form-control-sm amount-in" type="text">
            </div>
        </div>
        <div class="reviews-block container">
            <div class="add-review container" v-if="productFromDB">
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" 
                    class="form-label add-review-title">Your Review</label>
                    <textarea v-model="review.content" 
                    class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                </div>
                <input v-model="review.email" class="form-control form-control-sm" type="text" placeholder="Email">
                <input v-model="review.name" class="form-control form-control-sm" type="text" placeholder="Your Name">
                <button type="button" v-if="fillform" @click.once="sentRewiev()"
                class="btn btn-info btn-review" >Send</button>
                <button type="button" v-if="!fillform"
                class="btn btn-info btn-review" disabled>Send</button>
            </div>
            <h5 class="reviews-title" v-if="!product.reviews.length">Product has no reviews</h5>
            <h5 class="reviews-title" v-if="product.reviews.length"> Product Reviews :</h5>
            <div class="container-fluid reviews" v-for="review, index in product.reviews" :key="index">
                <div class="review">
                    <p class="client-name">{{ review.name }}:</p>
                    <p class="reviews-content">{{ review.content }}</p>
                    <p class="date-review">{{ review.date }}</p>
                </div>
            </div>
        </div>
    </div>
    <AlertSuccess ref="successRev" :msg="'Your Reviews Sent'"></AlertSuccess>
  </div>
  </template>

<script>

import AlertSuccess from '../components/alerts/AlertSuccess.vue'

  export default {
    name: 'ProductView',
    components: {
        AlertSuccess
    },
    data: function() {
        return {
        product: this.$route.params.data,
        valueInput: '1',
        isShowAmount: false,
        review: {},
        isFill: false
        }
    },
    methods: {
        sentRewiev () {
            this.review.date = new Date(Date.now()).toLocaleString();
            this.product.reviews.push(this.review);
            this.$store.dispatch('addReviewToDB', this.product)
            this.$refs.successRev.show();
            this.review = {};
        },
        addToCart() {
            this.product.amount = "1";
            this.$store.commit('addProductToCard', this.product)
            this.isShowAmount = true;
        },
        onChange () {
            let amount = [this.productFromDB.id, this.valueInput]
            this.$store.commit('addAmountToCart', amount )
        }
        
    },
    computed: {
        fillform () {
            if (this.review.email && this.review.name) {
                if (this.review.content) {
                    return true
                }else {
                    return false
                } 
            } else {
                    return false
                }
        },
        productsDB () {
            return this.$store.getters['getProductsForSearch'];
        },
        productFromDB () {
            let prod = [];
            for (let i=0; i < this.productsDB.length; i++) {
                if (this.productsDB[i].id === this.product.id) {
                    prod.push(this.productsDB[i])
                }
            }
            if (prod.length) {
                return prod
            } else {
                return false
            }
        },
    },
    created: function () {
        
  }
}
  </script>