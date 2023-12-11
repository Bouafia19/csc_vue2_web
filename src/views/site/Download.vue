<template>
    <div>
        <h1 class="text-center ma-4 next white--text">{{ $t('Download') }}</h1>
        <v-container>
            <v-row 
                align="center"
                justify="space-around"
            >
                
                    <v-btn
                        x-large
                        color="next"
                        dark
                        href="csc-client.zip"
                        download
                    >
                        <v-icon left large>
                            mdi-android
                        </v-icon>
                        Client
                    </v-btn>
                
                    <v-btn
                        
                        x-large
                        color="next"
                        dark
                        href="csc-pro.zip"
                        download
                    >
                        <v-icon left large>
                            mdi-android
                        </v-icon>
                        Pro
                    </v-btn>
                
            </v-row>
        </v-container>
    </div>
</template>

<script>

export default {
     data: () => ({ 
      
    }),

    methods: {
      submit () {
        
      },
    }

}
</script>

<style>

</style>