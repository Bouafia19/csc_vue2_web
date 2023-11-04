<template>
    <div>
        <!-- <head-bar pageTitle="termsConditions"> -->
        <base-layout :user="user">
        <v-container class="mt-2" fluid >
            <div class="text-center" v-if="loadingTerms">
                <v-row 
                    class="d-flex justify-center align-center"  
                    style="height: 100vh;"
                >
                    <v-progress-circular
                    indeterminate
                    color="next"
                    ></v-progress-circular>
                </v-row>
            </div>
            <div v-else>
                <div v-if="sortByTitle.length === 0" class="text-center ma-2">
                    <v-alert
                        outlined
                        color="info"
                    >
                    <div class="text-h6">
                        {{ $t('noRecords')}}
                    </div>
                    </v-alert>
                </div>
                <div v-else>
                    <v-row class="d-flex justify-center align-center">
                        <v-col 
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <div v-for="term in sortByTitle" :key="term._id">
                                <h4 v-if="term.order.charAt(0) != '0'" class="d-inline">{{ term.order + ' ' }}</h4> 
                                <h4 class="d-inline">{{ term.title }}</h4>
                                <p class="text-justify">{{ term.text }}</p>
                            </div>    
                        </v-col>
                    </v-row>
                </div>
                    <!-- <v-row v-if="prevRoute.fullPath != '/tabs'">
                        <v-col class="py-0">
                            <v-checkbox v-model="checkbox">
                                <template v-slot:label>
                                    <div>
                                        {{ $t('igttac')}}
                                    </div>
                                </template>
                            </v-checkbox>
                        </v-col>
                    </v-row> -->

                    <v-row class="d-flex justify-center align-center" v-if="prevRoute.fullPath != '/tabs'">
                        <v-col 
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-btn dark color="next" block @click="handleSubmit">{{ $t('next') }}</v-btn>
                        </v-col>
                    </v-row>
                
            </div>
        </v-container>
        </base-layout>
        <!-- </head-bar>   -->
    </div>
</template>

<script>
    import BaseLayout from '@/components/BaseLayout.vue'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        components: {
            'base-layout': BaseLayout,
        },
        data: () => ({
            progress: 75,
            checkbox: false,
            prevRoute: '',
            title: ''
        }),
        computed: {
            ...mapGetters(['terms', 'loadingTerms', 'user']),
            sortByTitle() {
                return this.terms
            }
        },
        mounted(){
            this.fetchTerms()
        },
        methods: {
            ...mapActions(['fetchTerms']),
            handleSubmit (){
                this.$router.push('/signup')
                // if(this.checkbox == true){
                //     this.$router.push('/accountActivation')
                // }
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.prevRoute = from
                // if (from.path === '/tabs') {
                //     vm.title = 'termsConditions'
                // } else {
                //     vm.title = 'SignUp'
                // }
            })
            
            next()
        },
    }
</script>

<style scoped>
    p {
        font-size: 14px;
    }
</style>