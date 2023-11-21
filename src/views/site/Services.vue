<template>
  <div>
    <!-- <site-header
      ref="authCsc" 
    > -->
    <!-- <v-container> -->

      <h1 class="text-center ma-4 next white--text">{{ $t('Services') }}</h1>

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
        <v-row>
        <v-col 
          v-for="(n, index) in getServices" 
          :key="index" 
          cols="6" 
          :class="index % 2 ? 'd-flex justify-start' : 'd-flex justify-end'"
        >
          <v-card
            height="200"
            width="500"
            outlined
            @click="getService(n)"
          >
            <v-list-item three-line>
              <v-list-item-content v-show="$i18n.locale != 'ar'">
                
                <v-list-item-title class="text-wrap text-justify text-h5 mb-1">
                  {{ n.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-justify">{{ n.description }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content v-show="$i18n.locale == 'ar'">
               
                <v-list-item-title class="text-wrap text-h5 mb-1" >
                  {{ n.nameAr }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ n.descriptionAr }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="150"
               

              >
                <v-img           
                  contain
                  :src="n.photo"
                >
                  </v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      </div>
      </div>
    <!-- </v-container> -->
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
        this.$emit('loadDialog')
        // this.$refs.authCsc.dialog = true
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