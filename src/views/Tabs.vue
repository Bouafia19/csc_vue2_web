<template>
  <div>
    <div class="text-center" v-if="!user">
      <v-row 
        class="d-flex justify-center align-center"  
        style="height: 100vh;"
      >
        <v-progress-circular
          indeterminate
          color="next"
        ></v-progress-circular>
      </v-row>
    </div>
    <div v-else>
      <div class="text-center ma-2" v-if="err">
        <v-row 
          class="d-flex justify-center align-center"  
          style="height: 100vh;"
        >
          <v-col>
            <div>
              <v-alert
                dense
                rounded
                type="error"
                outlined
              >
                {{ $t('cgu') }}
                
              </v-alert>
            </div>
            <div>
              <v-btn
                :loading="loadingP"
                :disabled="loadingP"
                color="blue-grey"
                class="ma-2 white--text"
                @click="loadingPage"
              >
                Upload
                <v-icon
                  right
                  dark
                >
                  mdi-cloud-upload
                </v-icon>
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
      <div v-else>
          <base-layout :user="user">
            <template v-slot="{ route }">
              <map-route  v-if="route === '/map'"/>
              
              <search  v-if="route === '/search'" />

              <add-pub v-if="route === '/addPub'"/>

              <inbox v-if="route === '/inbox'"/>
              
              <profile v-if="route === '/updateProfile'" :user="user">Profile</profile>
            </template>
          </base-layout>
        </div>
      </div>
    </div>
  
</template>

<script>
  import BaseLayout from '@/components/BaseLayout.vue'
  import AddPub from './addPub.vue'
  import Search from './Search.vue'
  import Profile from './UpdateProfile.vue'
  import Inbox from './Inbox.vue'
  import { mapGetters, mapActions } from 'vuex'
  import Map from './Map.vue'
  
  export default {
    components: {
      'base-layout': BaseLayout,
      'add-pub': AddPub,
      'search': Search,
      'profile': Profile,
      'map-route': Map,
      'inbox': Inbox
    },
    data: () => ({
      value: 'recent',
      items: [
        { title: "map", icon: 'mdi-magnify', to: '/map' },
        // { title: "search", icon: 'mdi-magnify', to: '/search' },
        { title: "add", icon: 'mdi-message-processing-outline', to: '/addPub' },
        { title: "profile", icon: 'mdi-account', to: '/profile' },
      ],
      tab: null,
      loading: true,
      loadingP: false,
      err: '',
      fcmToken: ''
    }),
    computed: {
      ...mapGetters(['user']),
    },
    methods: {
      ...mapActions(['fetchUser', 'subscribeToNotifications', 'editUsers', 'fetchServices', 'fetchVehicles']),
      loadingPage(){
        this.loadingP = true
        this.$router.go()
      },
      changeRTL () {
        this.$vuetify.rtl = true
        this.$vuetify.ltr = false
      },
      changeLTR () {
        this.$vuetify.ltr = true
        this.$vuetify.rtl = false
      },

      // async checkNotificationsPermissions(){
      //   let permStatus = await PushNotifications.checkPermissions()

      //   if (permStatus.receive === 'prompt') {
      //     permStatus = await PushNotifications.requestPermissions()
      //   }

      //   if (permStatus.receive !== 'granted') {
      //     throw new Error('User denied permissions!');
      //   }
      // },

      // async addListeners(){

      //   await PushNotifications.addListener('pushNotificationReceived', notification => {
      //     console.log('Push notification received: ', notification);
      //   })

      //   await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      //     console.log('Push notification action performed', notification.actionId, notification.inputValue)
      //     console.log('NOTIFICATION', notification)
      //     const data = notification.data
      //     this.$router.push({ name: 'Notifications', params: { notification: data }})
      //   })
      // }
    },
    
    mounted(){
      this.fetchUser().then(() => {

        this.$i18n.locale = this.user.language
        this.$vuetify.lang.current = this.user.language
        if (this.$i18n.locale == 'ar') {
          this.changeRTL ()
        }else {
          this.changeLTR ()
        }
      })
    }
  }
</script>

<style scoped>
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