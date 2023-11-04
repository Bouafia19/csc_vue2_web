<template>
  <div>
    <site-header
      ref="authCsc" 
    >
    <v-container fluid>
      <h1 class="text-center ma-4" color="next">Nos SERVICE</h1>
      <div v-if="!getServices">
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
         <div v-if="getServices.length === 0" class="text-center ma-2">
        <v-alert
          outlined
          color="info"
        >
          <div class="text-h6">
            {{ $t('noRecords')}}
          </div>
        </v-alert>
      </div>
        
      <div v-else-if="getServices.length > 0">
      <v-list dense>
      <!-- <v-subheader>SERVICES</v-subheader> -->
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in getServices"
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
    </site-header>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import { mapGetters, mapActions } from 'vuex'
    import Header from '@/components/site/Header.vue'


  export default {
    components: {
      'site-header': Header
    },
    data: () => ({
      selectedItem: 1,
    }),
    mounted () {
      
        this.getAllServices()              
     
    },
    computed: {
      ...mapGetters(['getServices']),
    },
    methods: {
      ...mapActions(['getAllServices']),
      getService(e){
        this.$refs.authCsc.dialog = true
        // console.log(e)
        // this.$router.push({ name: 'ServiceDetail', params: { item: e }})

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