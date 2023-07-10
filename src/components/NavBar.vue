<template>
  <div class="filter-box">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Brand</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
          data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/news" class="nav-link">News</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" 
              role="button" data-bs-toggle="dropdown" aria-expanded="false">
              For Client
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><router-link to="/waranty" class="nav-link">Warranty Terms</router-link></li>
                <li><router-link to="/contacts" class="nav-link">Contacts</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="user-nav">
        <div class="cart">
          <span class="qantiti-index" v-if="productForCart.length">
            {{ productForCart.length }}
          </span>
          <router-link to="/cart">
            <button type="button" class="btn btn-outline-info cart-btn">
              <img src="../assets/img/shopping_cart_icon.svg" class="cart-icon">
            </button>
          </router-link>
        </div>
        <div class="login">
          <div class="btn-group">
            <button v-if="!isLogin" type="button" class="btn btn-link" 
                data-bs-toggle="dropdown" aria-expanded="false">
                Login
            </button>
            <ul class="dropdown-menu">
              <li class="p-2"><input v-model="userCred.email" type="text" 
                  class="form-control login-input" placeholder="Email"></li>
              <li class="p-2"><input v-model="userCred.pass" type="password" 
                class="form-control login-input" placeholder="Password"></li>
              <li class="p-2"><button type="button" 
                data-bs-toggle="modal" data-bs-target="#ModalConfirmSentPass"
                    class="btn btn-light btn-sm">Forgot password</button></li>
              <li class="p-2"><button @click="login()" v-bind:class="{disabled: !userCred.pass}" 
                type="button" class="btn btn-success">Enter</button></li>
            </ul>
          </div>
          <div class="btn-group" v-if="isLogin">
            <div class="btn user-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" type="button">
              <img class="user-ava" src="../assets/img/face_avatar_account_icon.svg">
              <div>User Cabinet</div>
            </div>
            <ul class="dropdown-menu">
              <li><router-link to='/user-orders/' class="dropdown-item" >My orders</router-link></li>
              <li><router-link to="/user-setting/" class="dropdown-item">Setting</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li class="p-2">
                <button v-if="isLogin" @click="logout()" 
                class="btn btn-outline-success" type="submit">Exit</button>
              </li>
            </ul>
          </div>
          <router-link to="/register">
            <button v-if="!isLogin" class="btn btn-outline-success" type="submit">Register</button>
          </router-link>
        </div>
      </div>
    </nav>
    <ModalSendNewPass id="ModalConfirmSentPass" 
      class="modal fade" tabindex="-1" ria-hidden="true" @sendPass="sendPass"></ModalSendNewPass>
  </div>
</template>
  
<script>

import ModalSendNewPass from './ModalSendNewPass.vue';

  export default {
    name: 'FilterBox',
    components: {
      ModalSendNewPass
    },
    data: function() {
      return {
        userCred: {
          email: '',
          pass: ''
        }
      }
    },
    methods: {
      sendPass (email) {
        this.$store.dispatch('sendPasswordOnEmail', email);
      },
      logout() {
        this.$store.dispatch('logout');
        window.sessionStorage.clear();
        this.userCred = {
          email: '',
          pass: ''
        }
      },
      login () {
        this.$store.dispatch('login', this.userCred);
      }   
    },
    computed: {
      userData () {
        return this.$store.getters['getUserData'];
      },
      isLogin () {
        return this.$store.getters['getIsLogin'];
      },
      productForCart () {
        return this.$store.getters['getCartProducts'];
      },
    },
    created: function () {
    if (window.sessionStorage.login) {
      this.userCred = JSON.parse(window.sessionStorage.login);
      this.login()
    }
    if (window.sessionStorage.cart) {
      this.$store.commit('fetchCartFromSession', JSON.parse(window.sessionStorage.cart))
    }
  }
}
</script>