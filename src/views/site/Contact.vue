<template>
  <div>
    <site-header>
    <v-container>
    <h1 class="text-center ma-4" color="next">Nous Contacter</h1>
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
                  outlined
                  rounded
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
                  outlined
                  rounded
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
                  outlined
                  rounded
                ></v-text-field>
              </validation-provider>
              
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="description"
              >
                <v-textarea
                  :error-messages="errors"
                  outlined
                  name="description"
                  label="Description"
                  v-model="description"
                  rounded
                ></v-textarea>
              </validation-provider>
              <div class="text-center">
              <v-btn
                class="mr-4"
                type="submit"
                :disabled="invalid"
                color="next"
                rounded
                
              >
                submit
              </v-btn>
              </div>
            </form>
          </validation-observer>
        </v-container>
      </v-col>
    </v-row>
    </v-container>
  <!-- <site-footer /> -->
    </site-header>
  </div>
</template>

<script>
    import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
    import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    import Footer from '@/components/site/Footer.vue'
     import Header from '@/components/site/Header.vue'

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

export default {
    components: {
        ValidationProvider,
        ValidationObserver,
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        'site-footer': Footer,
        'site-header': Header
    },

     data: () => ({ 
        name: '',
        phoneNumber: '',
        email: '',
        description: '',
        select: null,
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
    }

}
</script>

<style>

</style>