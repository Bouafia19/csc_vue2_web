<template>
<div>
    <site-header >

    <v-container>
      <v-sheet
        class="mx-auto my-2"
        max-width="100%"
        max-height="100vh"
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
            v-for="n in 15"
            :key="n"
            v-slot="{ active, toggle }"
          >
            <v-card
              :color="active ? 'primary' : ''"
              class="ma-1"
              height="250"
              width="350"
              @click="toggle"
              flat
            >
              <video width="100%" height="250" controls>
                <source src="https://www.youtube.com/watch?v=_o55tDIs-fE&ab_channel=KnowledgeBase" type="video/mp4">
                Your browser does not support HTML video.
              </video>

              <v-card-subtitle class="pa-1 font-weight-black">Cafe Badilico</v-card-subtitle>

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

    <!-- <site-footer /> -->
    </site-header>
</div>
</template>

<script>
  import Footer from '@/components/site/Footer.vue'
  import Header from '@/components/site/Header.vue'

  export default ({
    components: {
      'site-footer': Footer,
      'site-header': Header,
    },

    data: () => ({ 
      items: [
        { title: "Introduction videos", divider: true },
        { title: "Bodcasts", divider: true },
        { title: "Announcements", divider: true },
        { title: "advertising", divider: false }
      ],
       model: null,
     
    })
  })
</script>
