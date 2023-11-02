<template>
    <div>
        <v-app-bar 
            color="next" 
            dark 
            app 
            scroll-target="#main"
        >
            <v-toolbar-title>
                <v-btn 
                    icon 
                    @click="pageTitle != 'trip' ? pageTitle != 'trips' ? $router.go(-1) : $router.push({ name: 'Tabs'}) : $router.push({ name: 'Search'})" 
                    v-if="pageTitle != 'SignUp' ? true : progress === 0 ? true : false">
                    <v-icon>
                        mdi-arrow-left
                    </v-icon>
                </v-btn>
                {{ $t(pageTitle) }}
            </v-toolbar-title>

            <v-progress-linear
                absolute
                bottom
                color="light-blue"
                :value="progress"
                striped
                height="5"
                v-show="pageTitle === 'SignUp'"
            ></v-progress-linear>
        </v-app-bar>
        <v-sheet max-height="100vh" id="main" style="overflow: auto">
            <v-main>
                <slot/>
            </v-main>
        </v-sheet>
    </div>
</template>

<script>
    export default {
        props: ['pageTitle', 'backLink', 'progress'],
        data: () => ({
            platform: ''
        }),
        created(){
        }
    }
</script>