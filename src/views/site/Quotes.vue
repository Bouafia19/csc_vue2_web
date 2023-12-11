<template>
    <div>
        <h1 class="text-center ma-4 next white--text">{{ $t('Quotes') }}</h1>

        <v-container>
            <v-row>
                <v-col>
                    <v-carousel
                        cycle
                        height="400"
                        hide-delimiter-background
                        :show-arrows="false"
                    >
                        <v-carousel-item
                            v-for="(slide, i) in slides"
                            :key="i"
                        >
                        <v-sheet
                            color="next"
                            height="100%"
                        >
                            <v-row
                                class="fill-height"
                                align="center"
                                justify="center"
                            >
                                <div>
                                    <v-list-item three-line dark>
                                        <v-list-item-content>
                                            <v-list-item-title class="text-h4">{{ $t(slide.who) }}</v-list-item-title>
                                            <v-list-item-subtitle>
                                            {{ $t(slide.position) }}
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle class="text-h6">
                                            {{ $t(slide.quote) }}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </div> 
                            </v-row>
                        </v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                </v-col>
            </v-row>
        </v-container>
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
        slides: [
            {   who: "w1", 
                position: "", 
                quote: "q1", 
            },
            {   who: "w2", 
                position: "", 
                quote: "q2", 
            },
            {   who: "w3", 
                position: "", 
                quote: "q3", 
            },
            {   who: "w3", 
                position: "", 
                quote: "q4", 
            }
        ]
    })
  }
</script>

<style scoped>
:deep(.v-toolbar__content){
  padding: 10px 5px;
}
</style>