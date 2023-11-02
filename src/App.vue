<template>
  <v-app id="inspire">
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      async setStatusBarStyle(){
        try {
          await StatusBar.setBackgroundColor({ color: '#00366F' })
        } catch (error) {
          console.log(error)
        }
      }
    },

    mounted(){
    }
  }
</script>
