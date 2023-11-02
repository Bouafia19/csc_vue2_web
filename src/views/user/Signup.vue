<template>
  <div>
    <head-bar pageTitle="SignUp" :progress="progress">
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
            <h5>{{ $t('signUpParagraph') }}</h5>
          </div>

          <div class="text-center ma-2">
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
                    type="number"
                    :label="$t('phoneNumber')"
                    required
                    outlined
                    append-icon="mdi-backspace-outline"
                    @click:append="clear"
                    rounded
                    prefix="+213"
                  >
                    <template v-slot:prepend-inner>
                      <div style="width:30px">
                        <v-img style="margin: auto 0" max-height="25" max-width="30" src="@/assets/flags/ar.png"/>
                      </div>
                    </template>
                  </v-text-field>
                </validation-provider>

                <v-dialog v-model="dialogConfirme" max-width="500px">
                  <v-card color="next" dark>
                    <v-card-title class="text-h5">{{ phone }}</v-card-title>
                    <v-card-text>
                      Êtes-vous sûr que c'est bien votre numéro
                    </v-card-text>
                    <v-card-actions>
    
                      <v-spacer></v-spacer>
                      <v-btn color="error" text @click="closeDialog">Cancel</v-btn>
                      <v-btn color="success" text @click="confirmDialog">ok</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <div class="text-center ma-2" v-if="err != 'paiu'">
                  <v-alert
                    dense
                    rounded
                    type="error"
                    v-if="err"
                  >
                    {{ $t(err) }}
                  </v-alert>
                </div>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card color="next" dark>
                    <v-card-title class="text-h5">{{ $t(err) }}</v-card-title>
                    <v-card-text>
                      le numéro de téléphone lequel vous essayer de vous inscrire existe déjà
                      veuillez appuyer sur le button connexion pour vous connecter à votre compte ou annuler
                      
                    </v-card-text>
                    <v-card-actions>
    
                      <v-spacer></v-spacer>
                      <v-btn color="error" text @click="close">Cancel</v-btn>
                      <v-btn color="success" text @click="confirm">{{ $t('Login') }}</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <div class="text-center text-justify ma-2">
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
          </div>

          <div class="text-center ma-2 mt-6">
            <v-checkbox v-model="checkbox">
              <template v-slot:label>
                <h5 class="text-center">{{ $t('termsConditionsParagraph') }}
                  <router-link to="/terms&conditions">{{ $t('termsConditions') }}</router-link>
                </h5>
              </template>
            </v-checkbox>
          </div>
          
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

  export default ({
    components: {
      'head-bar': HeadBar,
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      phoneNumber: '',
      err: '',
      progress: 0,
      dialog: false,
      dialogConfirme: false,
      phone: '',
      loading: false,
      checkbox: false
    }),

    methods: {
      ...mapActions(['auth/account_verify_phone', 'auth/verifyUser']),
      async verifyPhone () {
        try {
          await this.$store.dispatch('auth/account_verify_phone',  {  
            phonenumber: this.phone,
            channel: 'sms',
            role: 'client' 
          })
        } catch (error) {
          this.err = error.response.data.error
          if(this.err === 'paiu'){
            this.dialog = true
          }
          console.log('error phone number', error.response.data.error)
        }
        this.loading = false
      },
      async submit () {
        if(this.checkbox == true){
          this.$refs.observer.validate().then(v => {
            if(v){
              this.loading = true
              this.phone = '+213' + this.phoneNumber
              this.verifyPhone()
              // this.dialogConfirme = true
            }else{
              this.err = 'phoneNumberValidation'
              setTimeout(() => {
                this.err = ''
              }, "5000")
            }
          })
        }else{
          this.err = 'must agree to terms'
          setTimeout(() => {
            this.err = ''
          }, "5000")
        }
      },
      clear () {
        this.phoneNumber = ''
        this.$refs.observer.reset()
      },
      close(){
        this.dialog = false
      },
      async confirm(){
        await this.$store.dispatch('auth/verifyUser',  {  
          phonenumber: this.phone,
          role: 'client' 
        })
        // this.$router.push('/login')
        this.dialog = false
      },
      closeDialog(){
        this.dialogConfirme = false
      },
      confirmDialog(){
        this.verifyPhone()
        this.dialogConfirme = false
      }
    },
  })
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  :deep(.v-input__icon--append .v-icon) { 
    color: #DC143C;
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