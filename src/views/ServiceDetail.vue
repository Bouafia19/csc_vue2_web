<template>
    <div>
        <!-- <head-bar pageTitle="service"> -->
        <base-layout :user="user">
            <v-container
                fluid
                v-if="service"
            >
                <div v-if="service.done">
                    <v-row 
                        class="d-flex justify-center align-center"
                        style="height: 80vh;"
                    >
                        <v-col 
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <div class="text-center ma-2 mb-6">
                                <v-icon 
                                    large 
                                    color="success" 
                                >
                                    mdi-checkbox-marked-circle
                                </v-icon>

                                <h1>you are all ready subscribed to this service</h1>
                    
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <div v-else>
                        <v-row>
                            <v-col class="d-inline-flex align-center">
                                <!-- <h1>{{ $t('Billing') }}</h1> -->
                                <v-spacer></v-spacer>
                                <v-btn
                                    outlined
                                    rounded
                                    text
                                    color="primary"
                                    @click="newBilling"
                                    :loading="loadingNewBilling"
                                    v-show="total > 0"
                                    
                                >
                                    <!-- {{ $t('makePayment') }} -->
                                    <v-icon>
                                    mdi-plus
                                    </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>

                        <new-billing 
                            :period="period"
                            :sheet="sheet" 
                            v-on:close="sheetUpdate($event)"
                            :id="id"
                            :total="total"
                            :subTotal="subTotal"
                            class="mb-1"
                            :service="service"
                        />

                        <h3 v-if="service">{{ service.name }}</h3>
                        <p v-if="service">{{ service.description }}</p>

                        <v-divider class="mx-4"></v-divider>

                        <h3>choose your suscription period</h3>
                        <v-radio-group
                            v-model="period"
                            row
                        >
                        <v-radio
                            v-for="(i, index) in items"
                            :key="index"
                            :label="i.title"
                            :value="i.value"
                        ></v-radio>
                        </v-radio-group>
                </div>
            </v-container>
        </base-layout>
        <!-- </head-bar> -->
    </div>
</template>

<script>
    import HeadBar from '@/components/HeadBar.vue'
    import { mapGetters, mapActions } from 'vuex'
    import NewBilling from '@/components/NewBilling.vue'
    import BaseLayout from '@/components/BaseLayout.vue'

    export default {
        components: {
            'base-layout': BaseLayout,
            'new-billing': NewBilling
        },
        data: () => ({
            service: null,
            sheet: false,
            total: 100,
            subTotal: 0,
            loadingNewBilling: false,
            id: undefined,
            period: null,
            items: [
                { "title": "1 moi", value: 1 },
                { "title": "3 mois", value: 3 },
                { "title": "6 mois", value: 6 },
                { "title": "1 an", value: 12 }
            ]
        }),
        computed: {
            ...mapGetters(['user']),
        },
        methods: {
            ...mapActions([]),
            newBilling(){
                this.loadingNewBilling = true
                this.sheet = true
               

                this.loadingNewBilling = false
            },

            sheetUpdate(value){
                this.sheet = value
            },

            initialize () {
              this.$store.dispatch('auth/getLSUserInfo').then((ls) => {
                this.id = ls.user._id
              })
                
            },
        },

        created () {
            this.initialize()
        },

        mounted(){
            this.service = this.$route.params.item
            console.log('service', this.service)
        }
    }
</script>

<style>
    
</style>