<template>
    <div>
        <v-bottom-sheet v-model="sheet" persistent>
            <v-sheet
                class="text-center"
                height="100%"
            >
                <v-btn
                    class="mt-1"
                    icon
                    color="red"
                    @click="close"
                >
                <v-icon >mdi-chevron-down</v-icon>
                </v-btn>
           
            <div >

            <v-container fluid>
                <v-row align="center">
                    <v-col
                        class="d-flex pb-0"
                        cols="12"
                        sm="6"
                    >
                        <v-menu
                            v-model="trip_date"
                            :close-on-content-click="false"
                            max-width="290"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    :value="computedDateFormatted"
                                    append-icon="mdi-calendar"
                                    clearable
                                    :label="$t('Date')"
                                    readonly
                                    outlined
                                    rounded
                                    disabled
                                ></v-text-field>
                            </template>
                        </v-menu>
                    </v-col>
                </v-row>

                <v-row align="center">
                    <v-col
                        class="d-flex py-2"
                        cols="12"
                        sm="6"
                    >
                        <v-textarea
                            v-model="description"
                            :label="$t('Description')"
                            required
                            auto-grow
                            rows="2"
                            filled
                            color="next"
                        ></v-textarea>
                    </v-col>
                </v-row>
                 
                <div class="d-flex flex-column justify-space-between align-center mb-2">
                    <v-avatar 
                        size="200"
                        rounded="lg"
                    >
                        <v-img 
                            :src="photo"
                            contain
                            width="100px"
                            style="float: right; border: 1px solid;"
                            alt="marchandise Image"
                            eager
                        >  
                            <use-camera v-on:cameraUpload="uploadImage($event)"/>
                        </v-img> 
                    </v-avatar>
                </div>

                <v-row align="center" class="mt-4">
                <v-col>
                    <v-btn
                        
                        block
                        dark
                        color="next"
                        @click="newBilling"
                        :loading="loadingNewBilling"
                    >
                        {{ $t('makePayment') }}
                    </v-btn>
                </v-col>
            </v-row>
            </v-container>

            </div>
            </v-sheet>
        </v-bottom-sheet>

    </div>
</template>

<script>
    import UseCamera from '@/components/UseCamera.vue'
    import moment from 'moment'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        components: { UseCamera },
        name: 'App',
        props: ['sheet', 'id', 'total', 'subTotal', 'period', 'service'],
        data: () => ({
            drawer: null,
            date: Date.now(),
            date_time: null,
            trip_date: false,
            trip_time: false, 
            photo: '',
            modal: false,
            loadingNewBilling: false,
            description: ''
        }),
        computed: {
            computedDateFormatted () {
                return this.date ? moment(this.date).format('dddd, MMMM Do YYYY, h:mm:ss a') : ''
            }
        },
        methods: {
            ...mapActions(['addBillings', 'fetchUser', 'editUsers']),
            close(){
                let value = !this.sheet
                this.$emit('close', value)
            },
            confirme(){
                this.$refs.dialog.save(this.time)
                this.date_time = new Date(Date.now())
            },
            updateDate(){
                this.trip_date = false
                this.modal = true
            },
            
            async uploadImage(img64){  
                this.photo = img64
            },

            async newBilling(){
                this.loadingNewBilling = true
                
                let currentBilling = {
                    userId: this.id,
                    photo: this.photo,
                    billingMethod: '',
                    amount: this.total,
                    brutAmount: this.subTotal,
                    date: this.date,
                    description: this.description,
                    period: this.period,
                    status: 'pending',
                    serviceId: this.service._id
                }

                console.log('currentBilling', currentBilling)

                this.addBillings(currentBilling)
                this.fetchUser().then(async (user) => {
                    console.log('user', user[0])
                    console.log(typeof user[0])
                    user[0].subscriptionsIds.push(this.service._id)
                    console.log('user', user[0])
                    this.editUsers(user[0])
                })
                
                this.loadingNewBilling = false
                this.close()
            }
        }
    }
</script>

<style scoped>
    :deep(.v-text-field__suffix) {
        color: #00366f !important;
    }
    :deep(.v-input__icon--append .v-icon) { 
        color: #00366f !important;
    }
    :deep(.v-dialog:not(.v-dialog--fullscreen)) {
        max-height: 100%;
    }   
</style>
  