<template>
    <div>
        <!-- <head-bar pageTitle="profileUpdate"> -->
        <base-layout :user="user">
        <v-container fluid >
            <v-row
                class="d-flex justify-center align-center"
                style="height: 90vh;"
            >
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    
                <validation-observer
                    ref="observer"
                    v-slot="{ invalid }"
                >
                <form @submit.prevent="submit">
                    
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
                                alt="Profile Image"
                                eager
                            >  
                                <use-camera v-on:cameraUpload="uploadImage($event)"/>
                            </v-img> 
                        </v-avatar>
                    </div>
                   
                    <div class="text-center">
                        <v-btn text>
                            <locale-changer />
                        </v-btn>
                    </div>

                    <validation-provider
                        v-slot="{ errors }"
                        name="firstName"
                        rules="required"
                    >
                        <v-text-field
                            v-model="user.firstName"
                            :error-messages="errors"
                            :label="$t('firstName')"
                            required
                            outlined
                            dense
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider
                        v-slot="{ errors }"
                        name="lastName"
                        rules="required"
                    >
                        <v-text-field
                            v-model="user.lastName"
                            :error-messages="errors"
                            :label="$t('lastName')"
                            required
                            outlined
                            dense
                        ></v-text-field>
                    </validation-provider>
                    
                    <validation-provider
                        v-slot="{ errors }"
                        name="email"
                        rules="required|email"
                    >
                        <v-text-field
                        v-model="user.email"
                        :error-messages="errors"
                        :label="$t('email')"
                        required
                        outlined
                        dense
                        ></v-text-field>
                    </validation-provider>

                    <!-- <validation-provider
                        v-slot="{ errors }"
                        name="password"
                        rules="required|confirmed:password"  
                    >
                        <v-text-field
                        v-model="password"
                        :error-messages="errors"
                        :label="$t('password')"
                        required
                        outlined
                        dense
                        type="password"
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider
                        v-slot="{ errors }"
                        name="passwordConfirmation"
                        rules="required"
                        vid="password"
                    >
                        <v-text-field
                            v-model="passwordConfirmation"
                            :error-messages="errors"
                            :label="$t('passwordConfirmation')"
                            required
                            outlined
                            dense
                            type="password"
                        >
                        </v-text-field>
                    </validation-provider> -->

                    <div class="ma-2">
                        <v-alert
                            dense
                            outlined
                            type="error"
                            v-if="err"
                        >
                            {{ $t(err) }}
                        </v-alert>
                    </div>

                    <div class="ma-2">
                        <v-alert
                            dense
                            outlined
                            type="success"
                            v-if="info"
                        >
                            {{ $t(info) }}
                        </v-alert>
                    </div>

                    <div class="text-center">
                        <v-btn
                            type="submit"
                            block
                            color="next"
                            dark
                            :loading="loading"
                        >
                            {{ $t('update') }}
                        </v-btn>
                    </div>
        
                </form>
            </validation-observer>
                </v-col>
            </v-row>
        </v-container>
        <!-- </head-bar> -->
        </base-layout>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import HeadBar from '@/components/HeadBar.vue'
    import LocaleChanger from '@/components/LocaleChanger.vue'
    import UseCamera from '@/components/UseCamera.vue'
    import { required, digits, email, max, regex, confirmed } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    import BaseLayout from '@/components/BaseLayout.vue'

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

    // No message specified.
    extend('confirmed', confirmed)

    export default {
        components: {
            'head-bar': HeadBar,
            ValidationProvider,
            ValidationObserver,
            'locale-changer': LocaleChanger,
            UseCamera,
            'base-layout': BaseLayout
        },
        data: () => ({
            password: '',
            passwordConfirmation: '',
            err: '',
            loading: false,
            image: undefined,
            photo: null,
            info: ''
        }),
        computed: {
            ...mapGetters(['user']),
        },
        methods: {
            ...mapActions(['editUsers']),

            updateUser () {
                this.user.language = this.$i18n.locale
                try {
                    this.editUsers(this.user).then(() => {
                        this.loading = false
                        this.info = 'User updated successfully'
                        setTimeout(() => {
                            this.info = ''
                        }, "5000")
                    })
                } catch (error) {
                    this.err = error.message
                    console.log('error user Information', error)
                }
            },
            submit () {
                this.$refs.observer.validate().then(v => {
                    if(v){
                        this.loading = true
                        this.updateUser()
                    }else{
                        this.err = 'validationError'
                        setTimeout(() => {
                            this.err = ''
                        }, "5000")
                    }
                })
            }
        },

        mounted(){
        }
    }
</script>

<style scoped>
    :deep(.v-input__control .v-text-field__details) {
        margin-bottom: 0;
    }
    :deep(.v-file-input) {
        position:relative; 
        left: 170px;
        top: 150px;
    }
    :deep(.v-file-input .v-icon) {
        color: #00366f !important;
    }
</style>