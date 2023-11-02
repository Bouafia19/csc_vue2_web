<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col
        v-for="item in allServices"
        :key="item.title"
      >      
        <v-card
          class="mx-auto"
          width="344"
          outlined
          v-if="item.done"
          @click="addService(item)"
        >
          <v-list-item three-line class="px-2">
              <v-list-item-content class="py-3">
              <div class="text-h6">
                {{ $t(item.name) }}
              </div>
            </v-list-item-content>

              <v-list-item-avatar
                tile
                size="60"
                class="mb-0"
                
              >
                <v-btn
                  color="success"
                  fab
                  small
                  dark
                >
                  <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>
                </v-btn>
              </v-list-item-avatar>

            

          </v-list-item>
        </v-card>       
      </v-col>
    </v-row> 
  </v-container>
 
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data: () => ({ 
     
    }),

    mounted () {
      this.fetchUser().then(() => {
        this.fetchServices()              
      })
    },

    computed: {
      ...mapGetters(['allServices', 'user']),
    },

    methods: {
      ...mapActions(['fetchUser', 'fetchServices']),
      addService(e){
        console.log('e', e)
        // this.$router.push({ name: 'ServiceDetail', params: { item: e }})
      }
    },
  }
</script>