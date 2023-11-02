<template>
    <v-btn
        @click="takePicture"
        color="next"
        dark
        text
        height="380px"
        width="320px"
    >
        {{ $t('camera') }}
    </v-btn>
    <!-- <v-file-input 
        :label="$t('Photo')"
        hide-input
        @change="takePicture"
        prepend-icon="mdi-plus-circle-outline"  
    />     -->
</template>

<script>
    // import { Camera, CameraResultType } from '@capacitor/camera'
    export default {
        methods: {
            async takePicture (){
                // const image = await Camera.getPhoto({
                //     quality: 90,
                //     // allowEditing: true,
                //     resultType: CameraResultType.DataUrl
                // });

               
                // if(image){
                //     let imageUrl = image.dataUrl
                //     this.$emit('cameraUpload', imageUrl)
                // }
            }
        }

    }
</script>