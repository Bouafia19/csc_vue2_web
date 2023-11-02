<template>
  <div>
    <head-bar pageTitle="wallet">
      <div class="text-center ma-2">
        <v-alert
          outlined
          color="info"
        >
          <div class="text-h6">
            {{ $t('noRecords')}}
          </div>
        </v-alert>
      </div>
    </head-bar>
  </div>
</template>

<script>
  import HeadBar from '@/components/HeadBar.vue'
  export default {
    components: {
      'head-bar': HeadBar
    }
  }
</script>