<template>
<div>
  <base-layout :user="user">
  <v-list >
          <v-list-item @click="$router.push({ path: `/updateProfile`  })">
            <v-list-item-avatar tile size="60" color="white">
              <v-img :src="photo" v-if="photo"></v-img>
              <v-img src="@/assets/avatar.png" v-else></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ user.firstName + ' ' + user.lastName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="align-center justify-content-center">
            <v-list-item-content class="text-center">
              <v-list-item-title class="font-weight-bold">
                Credit
              </v-list-item-title>
              <v-list-item-subtitle>0 DA</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content class="text-center">
              <v-list-item-title class="font-weight-bold">
                member depuis
              </v-list-item-title>
              <v-list-item-subtitle>18-09-2022</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      <v-divider></v-divider>

      <v-list
        dense
        nav
        shaped
      >
        <div v-for="(item, index) in items"
            :key="index">
            <v-list-item
            
            @click="generateRoutes(item)"
            dense
            >
                
            <v-list-item-avatar
                color="white"
                class="my-0"
            >
                <v-icon :color="item.color">{{ item.icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content class="py-0">
                <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
            </v-list-item-content>
               
            </v-list-item>
            <v-divider
                v-if="index < items.length - 1"
                :key="index"
            ></v-divider>
        </div>
        

      </v-list>
  </base-layout>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    // props: ['user'],
    data: () => ({
      components: {
        'base-layout': BaseLayout,
      },
        items: [
            {title: 'notifications', icon: 'mdi-bell-ring', color: 'primary', action: 'getNotifications', to: '/notification'},
            // {title: 'wallet', icon: 'mdi-wallet', color: 'primary', action: 'getWallet', to: '/wallet'},
            // {title: 'paymentMethod', icon: 'mdi-account-credit-card', color: 'primary', action: 'getPaymentMethod', to: '/paymentMethod'},
            {title: 'contactSupport', icon: 'mdi-face-agent', color: 'primary', action: 'getContactSupport', to: '/contactSupport'},
            {title: 'termsConditions', icon: 'mdi-information', color: 'primary', action: 'getTermsConditionsPage', to: '/termsConditions'},
            {title: 'logOut', icon: 'mdi-logout', color: 'error', action: 'auth_sign_out', to: '/notification'},
        ],
        err: '',
        photo: null
    }),

    computed: {
       ...mapGetters(['user']),
    },

    methods: {
      ...mapActions(['auth/account_sign_out', 'fetchUser']),
      getTermsConditionsPage(){
        this.$router.push({ path: `/terms&conditions`  });
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

      async auth_sign_out(){
        this.$store.dispatch('auth/account_sign_out')
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
          }
      }
  },

  mounted(){
    this.fetchUser()
  }
}
</script>