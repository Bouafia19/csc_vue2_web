<template>
  <div>
    <site-header 
      id="home"
      ref="authCsc"
    >

    <v-img
      contain
      aspect-ratio
      src="@/assets/csc.png"
      v-show="this.$i18n.locale == 'en'"
    ></v-img>

    <v-img
      contain
      aspect-ratio
      src="@/assets/cscFR.png"
      v-show="this.$i18n.locale == 'fr'"
    ></v-img>

    <v-img
      contain
      aspect-ratio
      src="@/assets/cscAR.png"
      v-show="this.$i18n.locale == 'ar'"
    ></v-img>

    <div id="about">
      <h1 class="text-center ma-4 next white--text">{{ $t('AboutUs') }}</h1>
      <v-container>
        <p class="text-justify">{{ $t('cscP') }}</p>
      </v-container>
    </div>
    
    <site-services id="servicessite" v-on:loadDialog="dialogLoad()"/>

    <div class="text-center ma-4 next white--text" style="height: 200px">
      <h1 >{{ $t('Why') }}</h1>
      <p>{{ $t('We') }}</p>
    </div>

    <div id="contentssite">
      <h1 class="text-center ma-4 next white--text">{{ $t('Contents') }}</h1>
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
            <h3>{{ $t(i.title) }}</h3>
          </v-col>
          <!-- <v-col class="d-flex justify-end">
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

          </v-col> -->
          
        </v-row>
        
        <v-slide-group
          v-model="model"
        >
          <v-slide-item
            v-for="(n, v) in i.videos"
            :key="v"
            v-slot="{ active, toggle }"
          >
            <v-card
              :color="active ? 'grey' : ''"
              class="ma-1"
              height="250"
              width="350"
              @click="toggle"
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
      <site-quotes />
      <site-download />
      <site-contact id="contact" />
    
    </div>

    <site-footer />
    </site-header>
    

</div>
</template>

<script>
  import Footer from '@/components/site/Footer.vue'
  import Header from '@/components/site/Header.vue'
  import Contact from '@/views/site/Contact.vue'
  import Services from '@/views/site/Services.vue'
  import Quotes from '@/views/site/Quotes.vue'
  import Download from '@/views/site/Download.vue'


  export default ({
    components: {
      'site-header': Header,
      'site-footer': Footer,
      'site-contact': Contact,
      'site-services': Services,
      'site-quotes': Quotes, 
      'site-download': Download, 
    },

    data: () => ({ 
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
       model: null,
     
    }),

     methods: {
      dialogLoad() {
        this.$refs.authCsc.dialog = true
      },
    }
  })
</script>
