<template>
  <div>
    <base-layout :user="user">
    <v-container>
      <v-sheet
        class="mx-auto my-2"
        max-width="100%"
        v-for="(i, index) in items"
        :key="index"
      >
        <v-row
          class="d-flex justify-center align-center"
        >
          <v-col>
            <h3>{{ i.title }}</h3>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn
              x-small
              dense
              rounded
              color="next"
              dark
              @click="goToService(i)"
            >
              tout afficher
            </v-btn>

          </v-col>
          
        </v-row>
        
        <v-slide-group
          v-model="model"
        >
          <v-slide-item
            v-for="(n, v) in i.videos"
            :key="v"
          >
            <v-card
              class="ma-1"
              height="250"
              width="350"
              flat
            >
              <video width="100%" height="250" controls>
                <source :src="n.url" type="video/mp4">
                Your browser does not support HTML video.
              </video>

              <v-card-subtitle class="pa-1 font-weight-black">{{ n.title }}</v-card-subtitle>

              <v-card-text width="100%" class="pa-1">
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="10"
                  ></v-rating>

                  <div class="grey--text ms-4">
                    4.5 (413)
                  </div>
                </v-row>

                <div class="my-1 text-justify">
                  this is a description for the video
                </div>

              </v-card-text>

            </v-card>
          </v-slide-item>
        </v-slide-group>
        <v-divider
          v-if="i.divider"
          class="my-4"
        ></v-divider>
      </v-sheet>

      

    </v-container>
  </base-layout>
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
      sheet: false,
      err: '',
      dialog: false,
      orderInput: true,
      model: null,
      items: [
        { title: "IntroVideos", divider: true, 
          videos: [
            { title: "introduction", url: "introduction.mp4" },
            { title: "introduction", url: "introduction1.mp4" },
            { title: "introduction", url: "introduction2.mp4" },
            { title: "introduction", url: "introduction.mp4" },
            { title: "introduction", url: "introduction1.mp4" },
            { title: "introduction", url: "introduction2.mp4" },
            { title: "introduction", url: "introduction.mp4" },
            { title: "introduction", url: "introduction1.mp4" },
            { title: "introduction", url: "introduction2.mp4" },
            { title: "introduction", url: "introduction2.mp4" }
          ]
        },
        { title: "Bodcasts", divider: true,
          videos: [
            { title: "podcast", url: "podcast.mp4" },
            { title: "podcast", url: "podcast1.mp4" },
            { title: "podcast", url: "podcast2.mp4" },
            { title: "podcast", url: "podcast.mp4" },
            { title: "podcast", url: "podcast1.mp4" },
            { title: "podcast", url: "podcast2.mp4" },
            { title: "podcast", url: "podcast.mp4" },
            { title: "podcast", url: "podcast1.mp4" },
            { title: "podcast", url: "podcast2.mp4" }
          ]
        },
        { title: "Announcements", divider: true,
          videos: [
            { title: "Announcement", url: "recrut.mp4" },
            { title: "Announcement", url: "recrut1.mp4" },
            { title: "Announcement", url: "recrut.mp4" },
            { title: "Announcement", url: "recrut1.mp4" },
            { title: "Announcement", url: "recrut.mp4" }
          ] 
        },
        { title: "advertising", divider: false,
          videos: [
            { title: "advertising", url: "pub.mp4" },
            { title: "advertising", url: "pub.mp4" },
            { title: "advertising", url: "pub.mp4" },
            { title: "advertising", url: "pub.mp4" },
            { title: "advertising", url: "pub.mp4" },
            { title: "advertising", url: "pub.mp4" }
          ] 
        }
      ],
    }),

    computed: {
       ...mapGetters(['user']),
    },

    methods:{
      ...mapActions(['fetchUser']),
      goToService(e){
        console.log('e', e)
      },
    },
      
    mounted(){
     this.fetchUser()
        
    }
  
  }
</script>
 