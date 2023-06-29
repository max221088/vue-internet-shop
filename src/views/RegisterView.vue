<template>
    <div class="container wrop">
        <h3 class="title">
            Enter data for registration
        </h3>
        <div class="form-input">
            <div class="input-group input-group-sm mb-4">
                <span class="input-group-text" id="inputGroup-sizing-sm">Email</span>
                <input v-model="registerData.email" type="text" class="form-control" aria-describedby="inputGroup-sizing-sm">
            </div>
            <div v-if="!isEmailCorrect" class="mini-alert">please, enter correct email </div>
            <div class="input-group input-group-sm mb-4">
                <span class="input-group-text" id="inputGroup-sizing-sm">Password</span>
                <input v-model="registerData.pass" type="password" class="form-control" aria-describedby="inputGroup-sizing-sm">
            </div>
            <div v-if="!isPassCorrect" class="mini-alert pass">Password must contain at least 6 characters</div>
            <div class="input-group input-group-sm mb-4">
                <span class="input-group-text" id="inputGroup-sizing-sm">Repeat password</span>
                <input v-model="registerData.passConfirm" type="password" class="form-control" aria-describedby="inputGroup-sizing-sm">
            </div>
            <div v-if="!isPassCorrect" class="mini-alert pass-confirm">password does not match </div>
            <div class="input-group input-group-sm mb-4">
                <span class="input-group-text" id="inputGroup-sizing-sm">First Name, Name</span>
                <input v-model="registerData.name" type="text" class="form-control" aria-describedby="inputGroup-sizing-sm">
            </div>
            <div v-if="!isNameCorrect" class="mini-alert name">please, enter your Name</div>
            <div class="input-group input-group-sm mb-4">
                <span class="input-group-text" id="inputGroup-sizing-sm">Contact Number</span>
                <input v-model="registerData.tel" type="text" class="form-control" aria-describedby="inputGroup-sizing-sm">
            </div>
            <div v-if="!isTelCorrect" class="mini-alert number">please, enter your number</div>
            <div class="input-group input-group-sm mb-4">
                <span class="input-group-text" id="inputGroup-sizing-sm">Address for Delivery</span>
                <input v-model="registerData.address" type="text" class="form-control" aria-describedby="inputGroup-sizing-sm">
            </div>
            <div v-if="!isAddressCorrect" class="mini-alert address">please, enter deliver address</div>
        </div>
        <button v-bind:class="{disabled: !isDataCorrect}" @click="register()"
            class="btn btn-outline-success" type="submit">Register</button>
        <AlertRegisterSuccess ref="registerSuccess"></AlertRegisterSuccess>
    </div>
</template>

  
<script>

import AlertRegisterSuccess from '../components/alerts/AlertSuccess.vue'

  export default {
      name: 'RegisterView',
      components: {
        AlertRegisterSuccess
      
      },
      data: function() {
          return {
            registerData: {
                email: '',
                pass: '',
                passConfirm: '',
                name: '',
                tel: '',
                address: '',
            },
            
          }
      },
      methods: {
        register () {
            this.$store.dispatch('registerNewUser', this.registerData);
            this.$route.name['home'];
        }
          
      },
      computed: {
        isEmailCorrect () {
            return (this.registerData.email.includes('@') 
            && this.registerData.email.length >= 5) ? true : false 
        },
        isPassCorrect () {
            return (this.registerData.pass === this.registerData.passConfirm 
                && this.registerData.pass.length >= 6) ? true : false
        },
        isNameCorrect () {
            return (this.registerData.name.length > 3) ? true : false
        },
        isAddressCorrect () {
            return (this.registerData.address.length > 3) ? true : false
        },
        isTelCorrect () {
            return (this.registerData.tel.length > 9) ? true : false
        },
        isDataCorrect () {
            if (this.isEmailCorrect && this.isPassCorrect) {
                if (this.isPassCorrect && this.isNameCorrect) {
                    if (this.isAddressCorrect && this.isTelCorrect) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false 
                    }
                } else {
                    return false 
                }
        }
          
      
      },
      created: function () {
      
    }
  }
  
  
</script>