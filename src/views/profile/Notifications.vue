<template>
  <div>
    <!-- <head-bar pageTitle="notifications"> -->
      <base-layout :user="user">
      <div v-if="!announcements">
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
         <div v-if="announcements.length === 0" class="text-center ma-2">
        <v-alert
          outlined
          color="info"
        >
          <div class="text-h6">
            {{ $t('noRecords')}}
          </div>
        </v-alert>
      </div>
        
      <div v-else-if="announcements.length > 0">
        <v-row 
          justify="center"
          no-gutters
        >
          <v-col>  
            <div
              v-for="announcement in announcements"
              :key="announcement._id"
            >
                        <v-card 
                            width="90%"
                            elevation="2"
                            class="mx-auto my-2"
                            outlined
                            
                        >
                            <v-card-title>
                                <div class="ml-3 text-subtitle-1">
                                    {{ announcement.title }}
                                </div>
                            </v-card-title>

                            <v-card-text>
                                <div class="font-weight-bold ml-8 mb-2">
                                    {{ announcement.body }}
                                </div>
                            </v-card-text>
                            <v-card-actions>
                              <v-btn
                                text
                                color="next"
                      
                              >
                                Learn More
                              </v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </div>
      </div>
      
      </base-layout>
    <!-- </head-bar> -->
</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import BaseLayout from '@/components/BaseLayout.vue'
    export default {
        components: {
            'base-layout': BaseLayout,
        },
        data: () => ({ 
            reveal: false,
        }),
        computed: {
            ...mapGetters(['announcements', 'user'])
        },
        methods: {
          ...mapActions(['fetchAnnouncements']),
          getAnnouncementDetail(value){
            console.log('value', value)  
          }
        },
        mounted(){
          this.fetchAnnouncements()
        }
    }
</script>

<style>
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>