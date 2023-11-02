<template>
    <div>
        <head-bar pageTitle="SignUp" :progress="progress">
        <v-container fluid >
            <v-row
                class="d-flex justify-center align-center"
                style="height: 90vh;"
            >
                <v-col>
                <validation-observer
                    ref="observer"
                    v-slot="{ invalid }"
                >
                <form @submit.prevent="submit">
                    <validation-provider
                        v-slot="{ errors }"
                        name="firstName"
                        rules="required"
                    >
                        <v-text-field
                            v-model="firstName"
                            :error-messages="errors"
                            :label="$t('firstName')"
                            required
                            outlined
                            rounded
                            dense
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider
                        v-slot="{ errors }"
                        name="lastName"
                        rules="required"
                    >
                        <v-text-field
                            v-model="lastName"
                            :error-messages="errors"
                            :label="$t('lastName')"
                            required
                            outlined
                            rounded
                            dense
                        ></v-text-field>
                    </validation-provider>
                    
                    <validation-provider
                        v-slot="{ errors }"
                        name="email"
                        rules="required|email"
                    >
                        <v-text-field
                        v-model="email"
                        :error-messages="errors"
                        :label="$t('email')"
                        required
                        outlined
                        rounded
                        dense
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider
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
                        rounded
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
                            rounded
                            type="password"
                            dense
                        >
                            
                        </v-text-field>
                    </validation-provider>

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

                    <div class="text-center ma-2">
                        <v-btn
                            type="submit"
                            block
                            color="next"
                            dark
                            rounded
                            :loading="loading"
                        >
                            {{ $t('next') }}
                        </v-btn>
                    </div>
                    <!-- <v-btn @click="clear">
                        clear
                    </v-btn> -->
                </form>
            </validation-observer>
                </v-col>
            </v-row>
        </v-container>
        </head-bar>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import HeadBar from '@/components/HeadBar.vue'
    import { required, digits, email, max, regex, confirmed } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    
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
    extend('confirmed', confirmed);

    export default {
        components: {
            'head-bar': HeadBar,
            ValidationProvider,
            ValidationObserver,
        },
        data: () => ({
            progress: 50,
            err: '',
            loading: false,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            fcmToken: '',
            user: null
        }),

        methods: {
            ...mapActions(['auth/account_update_existing_user']),
            async signUp () {
                let phone = this.$route.params.phonenumber
                try {
                    await this.$store.dispatch('auth/account_update_existing_user',  {
                        id: this.user._id,
                        phone: phone,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password,
                        role: 'client',
                        fcmToken: this.fcmToken
                    })
                } catch (error) {
                    this.err = error.message
                    console.log('error user Information', error)
                }
                this.loading = false
            },
            submit () {
                this.$refs.observer.validate()
                this.loading = true
                this.signUp()
            },
            clear () {
                this.firstName = ''
                this.lastName = ''
                this.phoneNumber = ''
                this.email = ''
                this.password = ''
                this.passwordConfirmation = ''
                this.$refs.observer.reset()
            }
            
        },
        mounted(){
            this.user = this.$route.params.user
            this.firstName = this.user.firstName
            this.lastName = this.user.lastName
            this.phoneNumber = this.user.phoneNumber
            this.email = this.user.email
        }
    }
</script>