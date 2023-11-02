<template>
  <div>
    <head-bar pageTitle="Login">
    <v-container
      fluid
    
    >
      <v-row 
        class="d-flex justify-center align-center"
        style="height: 90vh;"
      >
        <v-col 
          
          cols="12"
          sm="6"
          md="4"
        >
          <div class="text-center ma-2 mb-6">
            <h5>{{ $t('logInParagraph') }}</h5>
          </div>
          <validation-observer
            ref="observer"
            v-slot="{ invalid }"
          >
          
            <form @submit.prevent="submit">
              <validation-provider
                name="phoneNumber"
                :rules="{
                  required: true,
                  
                  regex: '^[0-9]',
                  max: 10,
                  min: 9
                }"
              >
                <v-text-field
                  v-model="phoneNumber"
                  :counter="10"
                  :label="$t('phoneNumber')"
                  required
                  outlined
                  append-icon="mdi-backspace-outline"
                  @click:append="phoneNumber = null"
                  rounded
                  prefix="+213"
                  type="number"
                >
                  <template v-slot:prepend-inner>
                    <div style="width:30px">
                      <v-img style="margin: auto 0" max-height="25" max-width="30" src="@/assets/flags/ar.png"/>
                    </div>
                  </template>
                </v-text-field>
              </validation-provider>

              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                :label="$t('password')"
                required
                outlined
                rounded
              >
              </v-text-field>

              <div class="ma-2">
                <v-alert
                    dense
                    outlined
                    type="error"
                    v-if="err"
                >
                    {{ $t(err) }}
                </v-alert>
              </div>

              <v-dialog v-model="dialog" max-width="500px">
                  <v-card color="next" dark>
                    <v-card-title class="text-h5">{{ $t('SignUp') }}</v-card-title>
                    <v-card-text>
                      Le numéro de téléphone que vous avez saisi n'est pas enregistré. Cliquez sur S'inscrire ou annuler
                    </v-card-text>
                    <v-card-actions>
    
                      <v-spacer></v-spacer>
                      <v-btn color="error" text @click="close">Cancel</v-btn>
                      <v-btn color="success" text @click="confirm">{{ $t('SignUp') }}</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

              <div class="text-center ma-2">
                <v-btn
                  type="submit"
                  color="next"
                  block
                  rounded
                  dark
                  :loading="loading"
                >
                  {{ $t('next') }}
                </v-btn>
              </div>
            </form>
          </validation-observer>
        </v-col>
      </v-row>
    </v-container>
    </head-bar>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import HeadBar from '@/components/HeadBar.vue'
  import { required, digits, max, min, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('digits', digits)

  extend('required', required)

  extend('max', max) 

  extend('min', min) 

  extend('regex', regex)

  export default {
    components: {
      'head-bar': HeadBar,
      ValidationProvider,
      ValidationObserver
    },
    data: () => ({
      phoneNumber: '',
      err: '',
      password: '',
      show: false,
      loading: false,
      dialog: false
    }),
    methods: {
      ...mapActions(['auth/account_sign_in']),
      async logIn(){
        try {
          let phoneNumber = '+213' + this.phoneNumber
          await this.$store.dispatch('auth/account_sign_in', {  
            phone: phoneNumber,
            password: this.password,
            role: 'client'
          })
        } catch (error) {
          // this.err = error.message
          if(error.message === 'data and hash arguments required'){
            this.dialog = true
          }
          console.log('error phone number', error.message)
        }
        this.loading = false
      },
      submit () {
        this.$refs.observer.validate().then(v => {
          if(v){
            this.loading = true
            this.logIn()
          }else{
            this.err = 'phoneNumberValidation'
          }
        })
      },
       close(){
        this.dialog = false
      },
      async confirm(){
        this.$router.push('/signup')
        this.dialog = false
      },
    }
  }
</script>

<style scoped>
  :deep(.mdi-backspace-outline::before) {
    color: #DC143C !important;
  }
  :deep(.v-input__icon--append .v-icon) { 
    color: #008B8B;
  }
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>