<template>
  <div>
    <!-- <head-bar pageTitle="contactSupport"> -->
    <base-layout :user="user">
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
            <div class="text-center text-justify ma-2">
              <v-btn
                color="next"
                block
                dark
                x-large
              >
                {{ $t('email') }}
              </v-btn>
            </div>

            <div class="text-center text-justify ma-2">
              <v-btn
                color="next"
                block
                dark
                x-large
              >
                {{ $t('phone') + ': 05 55 66 77 88' }}
              </v-btn>
            </div>

            <div class="text-center text-justify ma-2">
              <v-btn
                color="next"
                block
                dark
                x-large
                @click="call"
              >
                {{ $t('phone') + ': 05 55 66 77 88' }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </base-layout>
    <!-- </head-bar> -->
  </div>
</template>

<script>
  import BaseLayout from '@/components/BaseLayout.vue'
    import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      'base-layout': BaseLayout,
    },
    computed: {
      ...mapGetters(['user']),
    },
    methods: {
      call(){
      }
    }
  }
</script>