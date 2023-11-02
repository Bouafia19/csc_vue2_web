<template>
  <div>
    <head-bar pageTitle="SignUp" :progress="progress">
    <v-container fluid>
      <v-row 
        class="d-flex justify-center align-center"
        style="height: 90vh;"
      >
        <v-col>
          <div class="text-center ma-2">
            <v-otp-input
              v-model="otp"
              :length="length"
              type="number"
            ></v-otp-input>
          </div>

          <div class="text-center ma-2">
            <h5>{{ $t(err) }}</h5>
          </div>

          <div class="text-center ma-2">
            <v-btn color="next" dark block :disabled="!isActive" @click="show" :loading="loading">{{ $t('next') }}</v-btn>
          </div>

          <!-- <div class="text-center ma-2">
            <flip-countdown 
              :deadline="deadline"
              :showDays="false"
              :showHours="false"
              @timeElapsed="timeElapsedHandler"
            ></flip-countdown>
          </div> -->

          <div class="text-center ma-2">
            <v-btn color="next" dark block :disabled="!showTryAgain" @click="tryAgain">{{ $t('tryAgain') }}</v-btn>
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
  // import FlipCountdown from 'vue2-flip-countdown'
  import moment from "moment"

  const fmt = "YYYY-MM-DD HH:mm:ss"
  
  export default {
    components: {
      'head-bar': HeadBar,
      // 'flip-countdown': FlipCountdown
    },
    data: () => ({
      otp: '',
      length: 6,
      progress: 25,
      err: '',
      loading: false,
      deadlinets: moment()
        .add(3, "m")
        .format(fmt),
      showTryAgain: false
    }),
    computed: {
      isActive () {
        return this.otp.length === this.length
      },
      deadline () {
        return moment(this.deadlinets).format(fmt);
      },
    },
    methods: {
      ...mapActions(['auth/account_verify_code']),
      async codeVerify () {
        let phone = this.$route.params.phonenumber
        try {
          await this.$store.dispatch('auth/account_verify_code',  {  phonenumber: phone,
                                                                code: this.otp 
                                                })
        } catch (error) {
          this.err = error.message
          console.log('error code', error.value)

        }
        this.loading = false
      },
      show(){
        // console.log(this.otp)
        this.loading = true
        this.codeVerify()
      },
      timeElapsedHandler() {
        this.showTryAgain = true
      },
      tryAgain(){
        this.$router.push('/signup')
      }
    }
  }
</script>

<style scoped>
  /* :deep(.flip-clock__slot){
    display: none;
  }
  :deep(b.flip-card__top){
    color: white;
    background: #06366f;
  }
  :deep(.flip-card__bottom){
    color: white;
    background: #06366f;
  }
  :deep(.flip-card__back-bottom){
    color: white;
    background: #06366f;
  }
  :deep(.flip-card__back::before){
    color: white;
    background: #06366f;
  }
  :deep(.flip-card__back::after){
    color: white;
    background: #06366f;
  } */
</style>