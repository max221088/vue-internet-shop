<template>
  <div class="wrop-info container">
    <h4>Welcome <span class="title-name">{{ userData.name }}</span> !!!</h4>
    <h3>Here you can change your account details</h3>
      <div class="row mb-3">
        <div class="col-3">
          User Name, First Name
        </div>
        <div class="col-3">
          <input v-model="userData.name" class="form-control form-control-sm" type="text">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-3">
          Contact Number
        </div>
        <div class="col-3">
          <input v-model="userData.tel" class="form-control form-control-sm" type="text">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-3">
          User Email
        </div>
        <div class="col-3">
          <input v-model="userData.email" class="form-control form-control-sm" type="text" disabled>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-3">
          User Delivery Address
        </div>
        <div class="col-3">
          <input v-model="userData.address" class="form-control form-control-sm" type="text">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-3">
          User Orders
        </div>
        <div class="col-3">
          <div v-if="!userData.history" class="form-control form-control-sm info-container">
            You don't have any orders yet
          </div>
          <div v-if="userData.history" class="form-control form-control-sm info-container">
            Total orders - {{ userData.history.length }}
          </div>
        </div>
        <div class="col-2">
          <router-link to='/user-orders/' type="button" 
            class="btn btn-primary btn-sm mx-2">Show Orders
          </router-link>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-3">
          <button type="button" class=" btn btn-danger btn-sm mx-2"
            data-bs-toggle="modal" data-bs-target="#ModalConfirmSaveUser">Save changes
          </button>
        </div>
      </div>
      <ModalConfirm id="ModalConfirmSaveUser" :msg="'Save changes?' " 
      :btnText="'Yes'" @delProduct="saveUserData">
      </ModalConfirm>
  </div>
</template>
  
<script>
  import ModalConfirm from '../components/ModalConfirm.vue'

  export default {
    name: 'userSetting',
    components: {
      ModalConfirm
    },
    methods: {
      saveUserData() {
        this.$store.dispatch('addUserDataToDB', this.userData);
      }
    },
    computed: {
      userData () {
        return this.$store.getters['getUserData'];
      },
    },
  }
</script>