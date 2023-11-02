<template>
    <head-bar pageTitle="inProgressTrips">
        <div v-if="!inProgressTrips">
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
            <div v-if="inProgressTrips.length === 0" class="text-center ma-2">
                <v-alert
                    outlined
                    color="info"
                >
                <div class="text-h6">
                    {{ $t('noRecords')}}
                </div>
                </v-alert>
            </div>
        
            <div v-if="inProgressTrips.length > 0">
                <v-row 
                    justify="center"
                    no-gutters
                >
                    <v-col>  
                        <div
                            v-for="trip in inProgressTrips"
                            :key="trip._id"
                        >
                            <v-card 
                                width="90%"
                                elevation="2"
                                class="mx-auto my-2"
                                outlined
                                @click="getTripDetail(trip)"
                            >
                                <v-card-title>
                                    <v-avatar size="60">
                                        <v-img :src="trip.transporterId.avatar" alt="user" v-if="trip.transporterId.avatar"></v-img>
                                        <v-img src="@/assets/avatar.png" v-else></v-img>
                                    </v-avatar>
                                    <div class="ml-3 text-subtitle-1">
                                        {{ trip.transporterId.firstName + ' ' + trip.transporterId.lastName }}
                                    </div>
                                </v-card-title>

                                <v-card-text>
                                    <div class="font-weight-bold ml-8 mb-2">
                                        {{ formatPhoneNumber(trip.transporterId.phone) }}
                                    </div>

                                    <v-row
                                        align="center"
                                        class="mx-0 ml-8 my-2"
                                        v-if="trip.finished"
                                    >
                                        <v-rating
                                            v-model="trip.rating"
                                            color="amber"
                                            dense
                                            hover
                                            size="14"
                                            background-color="grey"
                                        ></v-rating>

                                        <div class="grey--text ms-4">
                                            {{ trip.rating }}
                                        </div>
                                    </v-row>

                                    <v-timeline
                                        align-top
                                        dense
                                    >
                                        <v-timeline-item
                                            v-for="(message, index) in [{
                                                                            location: trip.from,
                                                                            color: 'success'
                                                                        },
                                                                        {
                                                                            location: trip.to,
                                                                            color: 'orange'
                                                                        }]"
                                            :key="index"
                                            :color="message.color"
                                            small
                                        >
                                            <div>
                                                <div class="font-weight-normal">
                                                <strong>{{ message.location }}</strong>
                                                </div>
                                            </div>
                                        </v-timeline-item>
                                    </v-timeline>
                                    <v-divider class="mx-4"></v-divider>
                                    <v-chip-group
                                        column
                                    >
                                        <v-chip color="deep-orange accent-4 white--text">{{ formatNumber(trip.price) + '/HT' }}</v-chip>
                                    </v-chip-group>
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>
    </head-bar>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import HeadBar from '@/components/HeadBar.vue'
    export default {
        components: {
            'head-bar': HeadBar
        },
        data: () => ({ 
            
        }),
        computed: {
            ...mapGetters(['inProgressTrips'])
        },
        methods: {
            getTripDetail(value){
                this.$router.push({ name: 'TripDetail', params: { trip: value } })
            },
            formatNumber(value) {
                return new Intl.NumberFormat(this.$i18n.locale, { style: 'currency', currency: 'DZD' }).format(value)
            },
            formatPhoneNumber(value) {
                let cleaned = ('' + value).replace(/\D/g, '')
                let match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})(\d{2})$/)

                if (match) {
                    return '(+' + match[1] + ') ' + match[2] + ' ' + match[3] + ' ' + match[4] + ' ' + match[5]
                }

                return value
            }
        }
    }
</script>
