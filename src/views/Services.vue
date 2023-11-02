<template>
  <div>
    <head-bar pageTitle="services">
    <v-container fluid>
      <div v-if="!allServices">
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
         <div v-if="allServices.length === 0" class="text-center ma-2">
        <v-alert
          outlined
          color="info"
        >
          <div class="text-h6">
            {{ $t('noRecords')}}
          </div>
        </v-alert>
      </div>
        
      <div v-else-if="allServices.length > 0">
      <v-list dense>
      <v-subheader>SERVICES</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in allServices"
          :key="i"
          @click="getService(item)"
        >
          
            <v-list-item-icon v-if="!item.done">
              <v-icon>mdi-table-of-contents</v-icon>
            </v-list-item-icon>
            <v-list-item-icon v-else>
              <v-icon color="next">mdi-checkbox-marked-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
         
        </v-list-item>
      </v-list-item-group>
    </v-list>
      </div>
      </div>
    </v-container>
    </head-bar>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import { mapGetters, mapActions } from 'vuex'
  import HeadBar from '@/components/HeadBar.vue'

  export default {
    components: {
      'head-bar': HeadBar
    },
    data: () => ({
      selectedItem: 1,
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
      getService(e){
        console.log(e)
        this.$router.push({ name: 'ServiceDetail', params: { item: e }})
      },
      initialize () {
        
      }
    },
  }
</script>

<style scoped>
:deep(.v-toolbar__content){
  padding: 10px 5px;
}
</style>