<template>
  <div>
    <v-navigation-drawer
      app
      v-model="drawer"
      color="next"
      dark
      :right="this.$i18n.locale == 'ar'"
      
    >
      <v-list :class="[platform === 'ios' ? 'pt-16' : '']">
          <v-list-item class="align-center justify-center">
            <v-list-item-avatar size="60" color="white">
              <v-img :src="photo" v-if="photo"></v-img>
              <v-img src="@/assets/avatar.png" v-else></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item  link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ user.firstName + ' ' + user.lastName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      <v-divider></v-divider>

      <v-list
        dense
        nav
        shaped
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="generateRoutes(item)"
          link
        >
          <v-list-item-avatar
            color="white"
          >
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar 
      app 
      scroll-target="#main" 
      color="next" 
      dark
    >
      <v-toolbar-title>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          CSC
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn-toggle 
          v-model="value"
          background-color="next"
          borderless
        >
          <v-btn
              v-for="(i, index) in footerItems"
              :key="index"
              :value="i.to"
              class="ma-2"
              text
              :to="i.to"
              
          >
              {{ i.title }}
          </v-btn>
        </v-btn-toggle>
       
    </v-app-bar>

    <v-sheet id="main" style="overflow: auto">
      <v-main>
        <slot :route="value"/>
      </v-main>
    </v-sheet>

    <v-footer
      app
      padless
      class="white rounded-lg rounded-b-0"
      dark
      v-show="false"
    >
      <v-bottom-navigation 
        grow 
        v-model="value" 
        color="teal" 
        shift 
        background-color="next"
        dark 
      >
        <v-btn v-for="(item, index) in footerItems" :key="index" :value="item.to">
          <span>{{$t(item.title)}}</span>

          <v-icon>{{item.icon}}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </div>
    
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  props: ['user'],
  data: () => ({
    drawer: null,
    items: [
      {title: 'services', icon: 'mdi-table-of-contents', color: 'primary', action: 'getServices', to: '/search'},
      // {title: 'inProgressServices', icon: 'mdi-routes-clock', color: 'primary', action: 'getServiceInProgress', to: '/tripsInProgress'},
      {title: 'notifications', icon: 'mdi-bell-ring', color: 'primary', action: 'getNotifications', to: '/notification'},
      // {title: 'wallet', icon: 'mdi-wallet', color: 'primary', action: 'getWallet', to: '/wallet'},
      // {title: 'paymentMethod', icon: 'mdi-account-credit-card', color: 'primary', action: 'getPaymentMethod', to: '/paymentMethod'},
      {title: 'contactSupport', icon: 'mdi-face-agent', color: 'primary', action: 'getContactSupport', to: '/contactSupport'},
      {title: 'termsConditions', icon: 'mdi-information', color: 'primary', action: 'getTermsConditionsPage', to: '/termsConditions'},
      {title: 'logOut', icon: 'mdi-logout', color: 'error', action: 'auth_sign_out', to: '/notification'},
    ],
    footerItems: [
      { title: "home", icon: 'mdi-home', to: '/map' },
      { title: "search", icon: 'mdi-magnify', to: '/search' },
      { title: "post", icon: 'mdi-plus', to: '/addPub' },
      { title: "inbox", icon: 'mdi-message-processing-outline', to: '/inbox' },
      { title: "profile", icon: 'mdi-account', to: '/updateProfile' }
    ],
    tab: null,
    value: '',
    err: '',
    platform: '',
    photo: null
  }),
  methods: {
    ...mapActions(['auth/account_sign_out']),

    getServices(){
      this.$router.push({ path: `/services`  })
    },

    getServiceInProgress(){
      this.$router.push({ path: `/tripsInProgress`  })
    },

    getTermsConditionsPage(){
      this.$router.push({ path: `/terms&conditions`  })
    },

    getNotifications(){
      this.$router.push({ path: `/notifications`  })
    },

    getWallet(){
      this.$router.push({ path: `/wallet`  })
    },

    getPaymentMethod(){
      this.$router.push({ path: `/paymentMethod`  })
    },

    getContactSupport(){
      this.$router.push({ path: `/contactSupport`  })
    },

    auth_sign_out(){
      this.$store.dispatch('auth/account_sign_out')
      // this.$router.push('/home')
    },

    generateRoutes (item) {
      switch (item.action) {
        case 'auth_sign_out':
          this.auth_sign_out()
          break
        case 'getTermsConditionsPage':
          this.getTermsConditionsPage()
          break
        case 'getNotifications':
          this.getNotifications()
          break
        case 'getWallet':
          this.getWallet()
          break
        case 'getPaymentMethod':
          this.getPaymentMethod()
          break
        case 'getContactSupport':
          this.getContactSupport()
          break
        case 'getServiceInProgress':
          this.getServiceInProgress()
          break
        case 'getServices':
          this.getServices()
          break
      }
    }
  },

  created(){
    
  },

  mounted(){
  }
  
};
</script>
  