<template>
    <div class="modal fade"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Are you sure ?</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
             </div>
             <div class="modal-body">
                Please enter your email
                <input v-model="email" class="form-control form-control-sm" type="text">
                We will send a new password to your email.
                Please, check the mail!!
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
               <button type="button" class="btn btn-primary" 
                 @click="confirm()" data-bs-dismiss="modal">Send</button>
             </div>
           </div>
       </div>
     </div> 
 </template>
 
 
 
 <script>
  export default {
    name: 'ModalSendNewPass',
    props: [],
    data: function () {
      return {
        email: ''
      }
    },
    methods: {
      confirm () {
        this.$emit('sendPass', this.email)
      
      }
    }
  }
 </script>