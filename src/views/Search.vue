<template>
  <base-layout :user="user">
  <v-container
    class="fill-height"
  >
    <v-fade-transition mode="out-in">
      <v-row>
        <v-col>
          <v-card v-for="(i, index) in items" :key="index" class="mb-2">
            <v-img
              src="https://picsum.photos/350/165?random"
              height="125"
              width="100%"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="text-h6">
              {{ i.title }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
  </base-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import BaseLayout from '@/components/BaseLayout.vue'
 
export default {
    components: {
      'base-layout': BaseLayout,
    },
    data: () => ({
      items: [
        {
          src: 'https://picsum.photos/350/165?random',
          headline: 'Brunch this weekend?',
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: 'Ali Connors',
        },
        {
          src: 'https://picsum.photos/350/165?random',
          headline: 'Summer BBQ',
          subtitle: `Wish I could come, but I'm out of town this weekend.`,
          title: 'me, Scrott, Jennifer',
        },
        {
          src: 'https://picsum.photos/350/165?random',
          headline: 'Oui oui',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
          title: 'Sandra Adams',
        },
        {
          src: 'https://picsum.photos/350/165?random',
          headline: 'Birthday gift',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
          title: 'Trevor Hansen',
        },
        {
          src: 'https://picsum.photos/350/165?random',
          headline: 'Recipe to try',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
        {
          src: 'https://picsum.photos/350/165?random',
          headline: 'Brunch this weekend?',
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: 'Ali Connors 1',
        },
        {
          src: 'https://picsum.photos/350/165?random',
          headline: 'Summer BBQ',
          subtitle: `Wish I could come, but I'm out of town this weekend.`,
          title: 'me, Scrott, Jennifer 2',
        },
        {
          src: 'https://picsum.photos/350/165?random',
          headline: 'Oui oui',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
          title: 'Sandra Adams 3',
        }
      ],
     
    }),
    computed: {
       ...mapGetters(['user']),
    },
   

    created () {
    },

    methods: {
     
    }
  }
</script>
<style scoped>
   #lateral {
    height: 100vh;
   }
     /* This is for documentation purposes and will not be needed in your application */
  #lateral .v-btn--example {
    bottom: 0;
    position: absolute;
    margin: 0 0 16px 16px;
  }
</style>