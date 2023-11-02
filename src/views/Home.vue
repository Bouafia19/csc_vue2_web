<template>
  <v-container fluid class="pt-0">
    <v-app-bar
      absolute
      color="next"
      dark
    >

      <v-toolbar-title class="mx-12">CSC</v-toolbar-title>
      
      <v-btn
        v-for="(i, index) in items"
        :key="index"
        class="ma-2"
        text
      >
        {{ i }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text>
              <locale-changer />
            </v-btn>

      <v-btn icon class="mr-4">
        <v-icon
          @click="dialog = true"
        >mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-img style="height: 70vh" :src="require('@/assets/csc.png')"></v-img>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
    <v-card>
    <v-row 
      class="d-flex justify-center align-center" 
    >
        <v-col 
          class="px-0"
          cols="12"
          sm="6"
          md="4"
        >
         

          <!-- <div class="text-center">
            
          </div> -->

          <div class="text-center">
            <h5>{{ $t('homeParagraph') }}</h5>
          </div>

          <div class="text-center">
            <div class="my-2 mx-4">
              <v-btn 
                color="next" 
                @click="routerLogin"  
                block
                rounded
                dark
              >
                {{ $t('Login') }}
              </v-btn>
            </div>

            <div class="my-2 mx-4">
              <v-btn
                block 
                color="next"
                @click="routerSignup" 
                rounded
                dark
              >
                  {{ $t('SignUp') }}
              </v-btn>
            </div>
          </div>
        </v-col>
    </v-row>
    </v-card>
    </v-dialog>

    <v-row>
      <v-col>
        <v-img style="height: 100%">
        <l-map :zoom="zoom" :center="center">
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng">
            <l-popup><v-img :src="require('@/assets/csc-icon.png')" height="100" width="100"></v-img></l-popup>
          </l-marker>
          
      </l-map>
        </v-img>
      </v-col>
      <v-col>
        <v-container>
        <validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <form @submit.prevent="submit">
      <validation-provider
        v-slot="{ errors }"
        name="Name"
        rules="required|max:10"
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="phoneNumber"
        :rules="{
          required: true,
          digits: 7,
          regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$'
        }"
      >
        <v-text-field
          v-model="phoneNumber"
          :counter="7"
          :error-messages="errors"
          label="Phone Number"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="select"
        rules="required"
      >
        <v-select
          v-model="select"
          :items="items"
          :error-messages="errors"
          label="Select"
          data-vv-name="select"
          required
        ></v-select>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        rules="required"
        name="checkbox"
      >
        <v-checkbox
          v-model="checkbox"
          :error-messages="errors"
          value="1"
          label="Option"
          type="checkbox"
          required
        ></v-checkbox>
      </validation-provider>

      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </validation-observer>
        </v-container>
      </v-col>
    </v-row>
    <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="next white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
  </v-container>
</template>

<script>
  import LocaleChanger from '@/components/LocaleChanger.vue'
  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  import L from 'leaflet';
  import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })


  export default ({
    components: {
      'locale-changer': LocaleChanger,
      ValidationProvider,
      ValidationObserver,
      LMap,
      LTileLayer,
      LMarker,
      LPopup
    },
    data: () => ({ 
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
       name: '',
      phoneNumber: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: null,
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 12,
      center: [36.1898, 5.4108],
      markerLatLng: [36.1898, 5.4108],
      dialog: false,
    }),
    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.name = ''
        this.phoneNumber = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
      routerLogin () {
        this.$router.push('/login')
      },
      routerSignup () {
        this.$router.push('/signup')
      }
    }
  })
</script>
<style scoped>
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
</style>