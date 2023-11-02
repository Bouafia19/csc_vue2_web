<template>
    <div>
        <head-bar pageTitle="informations">
            <v-container fluid>
                <div v-if="!vehicles">
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
                    <div v-if="vehicles.length === 0" class="text-center ma-2">
                        <v-alert
                            outlined
                            color="info"
                        >
                            <div class="text-h6">
                                {{ $t('noRecords')}}
                            </div>
                        </v-alert>
                    </div>
                    
                    <div v-else-if="vehicles.length > 0">
                        <v-row 
                            class="d-flex justify-center align-center"
                            style="height: 60vh;"
                        >
                            <v-col class="pt-0">
                                <v-sheet
                                    class="mx-auto"
                                    max-width="100%"
                                >
                                    <v-expand-transition>
                                        <v-sheet
                                            height="200"
                                            tile
                                        >
                                            <v-row
                                                class="fill-height"
                                                align="center"
                                                justify="center"
                                            >
                                                <v-avatar 
                                                    size="200"
                                                    rounded="lg"
                                                >
                                                    <v-img 
                                                        :src="showImgComputed"
                                                        contain
                                                        width="100px"
                                                        alt="Profile Image"
                                                        eager
                                                    >     
                                                    </v-img> 
                                                </v-avatar>
                                            </v-row>
                                        </v-sheet>
                                    </v-expand-transition>
                                    <v-slide-group
                                        v-model="model"
                                        center-active
                                    >
                                    <v-slide-item
                                        v-for="n in vehicles"
                                        :key="n._id"
                                        v-slot="{ active, toggle }"
                                    >
                                        <div>
                                            <v-skeleton-loader
                                                class="ma-1"
                                                height="100"
                                                width="140"
                                                type="card"
                                                v-if="loading"
                                            ></v-skeleton-loader>
                                            <v-card
                                                :color="active ? 'primary' : ''"
                                                class="ma-0"
                                                height="130"
                                                width="120"
                                                @click="getUnitPrice(n)"
                                                :src="n.photo"
                                                flat
                                                v-if="!loading"
                                            >
                                                <v-img
                                                    class="ma-1"
                                                    height="80"
                                                    :src="n.photo"
                                                    contain
                                                ></v-img>
                                                <v-card-title class="subtitle-2 py-0 justify-center">{{ n.name }}</v-card-title>
                                            </v-card>
                                        </div>
                                    </v-slide-item>
                                    </v-slide-group>
                                </v-sheet>
                            </v-col>
                        </v-row>
                    </div>
                </div>
                
                <v-footer fixed padless class="align-center justify-center px-8">
                    <v-row>
                        <v-col>
                            <!-- <h4>Méthode de paiment (*):</h4>
                            <v-radio-group
                                v-model="row"
                                row
                            >
                            <v-radio
                                label="A la livraison"
                                value="radio-1"
                            ></v-radio>
                            <v-spacer></v-spacer>
                            <v-radio
                                label="Crédit chez tawssil"
                                value="radio-2"
                            ></v-radio>
                            </v-radio-group> -->
                            <div class="my-2 pa-2" style="border: 1px solid #00366f;border-radius: 5px;">
                                <p class="mb-1">Prix: {{ formatNumber(total) + '/HT' }}</p>
                                <!-- <p class="mb-0">Prix Planifier: {{ formatNumber(total) + '/HT' }}</p> -->
                            </div>
                    
                            <v-btn
                                class="mb-2"
                                block
                                color="next"
                                dark
                                @click="confirme"
                                :loading="loadingT"
                            >
                                {{ 'confirmer' }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-footer>
            </v-container>
        </head-bar>
    </div>
</template>

<script>
    // import TripPlanification from '@/components/TripPlanification.vue'
    import moment from 'moment'
    import { mapGetters, mapActions } from 'vuex'
    import HeadBar from '@/components/HeadBar.vue'

    export default {
        components: {
            'head-bar': HeadBar
            // 'trip-planification': TripPlanification
        },
        data: () => ({
            row: null,
            start: '',
            model: null,
            total: 0,
            loading: true,
            vehicleId: null,
            loadingT: false,
            showImg: '',
            socket: null,
            message: null,
            marchandise: null
        }),
        computed: {
            ...mapGetters(['vehicles', 'transporters']),
            computedDateFormattedDate () {
                return this.start ? moment(this.start).locale(this.$i18n.locale).format('MMMM DD YYYY') : ''
            },
            computedDateFormattedTimeStep () {
                return 1
            },
            showImgComputed () {
                if(this.vehicles.length > 0){
                    let vehicle = this.vehicles[0]
                    if(this.showImg.length === 0){
                        if(this.$route.params.routeInfo.distance){
                            let total = (vehicle.priceKm * this.$route.params.routeInfo.distance).toFixed(2)
                            if(total < vehicle.minimum){
                                this.total = vehicle.minimum
                            }else{
                                this.total = total
                            }
                        }else{
                            this.total = 0
                        }
                        return vehicle.photo
                    }else{
                        return this.showImg
                    }
                }
            }
        },
        methods: {
            ...mapActions(['fetchVehicles', 'addPlannedTrip']),
            formatNumber(value) {
                return new Intl.NumberFormat(this.$i18n.locale, { style: 'currency', currency: 'DZD' }).format(value)
            },
            getUnitPrice(value){
                this.showImg = value.photo
                if(this.$route.params.routeInfo.distance){
                    let total = (value.priceKm * this.$route.params.routeInfo.distance).toFixed(2)
                    if(total < value.minimum){
                        this.total = value.minimum
                    }else{
                        this.total = total
                    }
                }else{
                    this.total = 0
                }
                
                this.vehicleId = value._id
            },
            async addTrip (trip) {
                try {
                    await this.$store.dispatch('createTrips', trip)
                } catch (error) {
                    this.err = error
                    console.log('error', error)
                }
                // this.loadingT = false
            },
            confirme(){
                this.loadingT = true
                
                this.$store.dispatch('auth/getLSUserInfo').then((ls) => {
                    let tripInfo = {
                        from: this.$route.params.routeInfo.from,
                        to: this.$route.params.routeInfo.to,
                        price: this.total,
                        vehicleId: this.vehicleId,
                        client: {
                            id: ls.user._id,
                            firstName: ls.user.firstName,
                            lastName: ls.user.lastName,
                            phone: ls.user.phone,
                            // avatar: ls.user.avatar
                        },
                        start: this.start,
                        marchandise: this.marchandise
                    }

                    console.log('tripInfo', tripInfo)
                   
                    if(this.start){
                        tripInfo.clientId = ls.user._id
                        this.addPlannedTrip(tripInfo)
                    }else{
                        this.addTrip(tripInfo)
                    }
                })
            },
            // uploadPlanedTrip(value){
            //     this.start = value.date
            //     this.marchandise = value.marchandise
            // }
        },
        created(){
            this.fetchVehicles().then(() => {
                this.loading = false
            })
        },
        mounted(){
            this.start = this.$route.params.tripInfo.start
            this.marchandise = this.$route.params.tripInfo.marchandise
        }
    }
</script>