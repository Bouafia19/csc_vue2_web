<template>
  <div>
    <head-bar pageTitle="contactSupport">
      <v-container
        fluid
      >
        <v-row 
          class="d-flex justify-center align-center"
          style="height: 90vh;"
        >
          <v-col>
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
    </head-bar>
  </div>
</template>

<script>
  import HeadBar from '@/components/HeadBar.vue'
  export default {
    components: {
      'head-bar': HeadBar
    },
    methods: {
      call(){
      }
    }
  }
</script>