<template>
    <div>
        <!-- <v-navigation-drawer
            app
            v-model="drawer"
            color="next"
            dark
            :right="this.$i18n.locale == 'ar'"
        >
            <v-list >
                <v-list-item class="px-2">
                <v-list-item-avatar tile>
                    <v-img           
                    contain
                    src="@/assets/csc-icon.png"
                    alt="img"
                    >
                    </v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                    {{ 'CSC' }} 
                    </v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list
                dense
                nav
                shaped
            >
                <v-list-item
                v-for="item in items"
                :key="item.title"
                @click="generateRoutes(item)"
                link
                >
                <v-list-item-avatar
                    color="white"
                >
                    <v-icon :color="item.color">{{ item.icon }}</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer> -->

        <v-app-bar 
            color="next" 
            dark 
            app 
            scroll-target="#main"
        >
            <v-toolbar-title class="mx-12">
                <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
                CSC
            </v-toolbar-title>
        
            <v-btn
                v-for="(i, index) in navigationItems"
                :key="index"
                class="ma-2"
                text
                @click="goToSection(i.to)"
            >
                {{ i.name }}
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn text>
                <locale-changer />
            </v-btn>

            <v-btn icon class="mr-4">
                <v-icon
                    @click="dialog = true"
                >
                    mdi-account
                </v-icon>
            </v-btn>
        </v-app-bar>

        <v-sheet max-height="100vh" id="main" style="overflow: auto">
            <v-main>
                <slot/>
            </v-main>
        </v-sheet>

        <!-- <v-footer
            app
            padless
            class="white rounded-lg rounded-b-0"
            dark
        >
            <v-card
                flat
                tile
                class="next white--text text-center"
            >
                <v-card-text>
                    <v-btn
                        v-for="icon in icons"
                        :key="icon"
                        class="mx-4 white--text"
                        icon
                    >
                    <v-icon size="24px">
                        {{ icon }}
                    </v-icon>
                    </v-btn>
                </v-card-text>

                <v-card-text class="white--text pt-0">
                    Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                    {{ new Date().getFullYear() }} — <strong>CSC</strong>
                </v-card-text>
            </v-card>
        </v-footer> -->

        <v-dialog v-model="dialog" max-width="700px">
            <v-card>
                <v-card-title class="text-h5">Auth</v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row 
                            class="d-flex justify-center align-center" 
                        >
                            <v-col 
                                class="px-0"
                                cols="12"
                                sm="6"
                                md="4"
                            >

                                <div class="text-center">
                                    <h5>{{ $t('homeParagraph') }}</h5>
                                </div>

                                <div class="text-center">
                                    <div class="my-2 mx-4">
                                    <v-btn 
                                        color="next" 
                                        @click="routerLogin"  
                                        block
                                        rounded
                                        dark
                                    >
                                        {{ $t('Login') }}
                                    </v-btn>
                                    </div>

                                    <div class="my-2 mx-4">
                                    <v-btn
                                        block 
                                        color="next"
                                        @click="routerSignup" 
                                        rounded
                                        dark
                                    >
                                        {{ $t('SignUp') }}
                                    </v-btn>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="close">Cancel</v-btn>
                    <v-btn color="success" text @click="close">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
    </div>
</template>

<script>
    import LocaleChanger from '@/components/LocaleChanger.vue'
    export default {
        components: {
            'locale-changer': LocaleChanger
        },

        data: () => ({ 
            navigationItems: [
                { name: 'Home', to: 'home'},
                { name: 'Services', to: 'servicessite'},
                { name: 'Contents', to: 'contentssite'},
                { name: 'Contact', to: 'contact'},
            ],
            dialog: false,
            drawer: null,
            items: [
                {title: 'services', icon: 'mdi-table-of-contents', color: 'primary', action: 'getServices', to: '/search'},
                {title: 'contactSupport', icon: 'mdi-face-agent', color: 'primary', action: 'getContactSupport', to: '/contactSupport'},
            ],
            photo: null,
            user: null,
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ],
        }),

        methods: {
            close(){
                this.dialog = !this.dialog
            },

            routerLogin () {
                this.$router.push('/login')
            },

            routerSignup () {
                this.$router.push('/signup')
            },

            goToSection(to){
                const el = document.getElementById(to)
                el.scrollIntoView({behavior: "smooth"})
            }
   
        }
    }
</script>

<style scoped>
    .v-card__title {
        background-color: #00366f;
        color: white;
    }
    .v-card__actions {
        background-color: #00366f;
    }
</style>