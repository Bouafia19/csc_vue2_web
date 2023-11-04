import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/tabs',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/user/Signup.vue') 
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/Login.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('@/views/Map.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/codeVerification/:phonenumber',
    name: 'CodeVerification',
    component: () => import('@/views/user/CodeVerification.vue')
  },
  {
    path: '/userInformation/:phonenumber',
    name: 'UserInformation',
    component: () => import('@/views/user/UserInformation.vue')
  },
  {
    path: '/updateUserInformation',
    name: 'UpdateUserInformation',
    component: () => import('@/views/user/UpdateUserInformation.vue')
  },
  {
    path: '/terms&conditions',
    name: 'Terms&conditions',
    component: () => import('@/views/user/Terms&conditions.vue')
  },
  {
    path: '/accountActivation',
    name: 'AccountActivation',
    component: () => import('@/views/user/AccountActivation.vue')
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/views/Services.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: () => import('@/views/Tabs.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/views/profile/Notifications.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('@/views/profile/Wallet.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/paymentMethod',
    name: 'PaymentMethod',
    component: () => import('@/views/profile/PaymentMethod.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contactSupport',
    name: 'ContactSupport',
    component: () => import('@/views/profile/ContactSupport.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/serviceInfo',
    name: 'ServiceInfo',
    component: () => import('@/views/ServiceInfo.vue'),
    // props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/updateProfile',
    name: 'UpdateProfile',
    component: () => import('@/views/UpdateProfile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/serviceDetail',
    name: 'ServiceDetail',
    component: () => import('@/views/ServiceDetail.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/inbox',
    name: 'Inbox',
    component: () => import('@/views/Inbox.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/addPub',
    name: 'AddPub',
    component: () => import('@/views/addPub.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/site/Contact.vue')
  },
  {
    path: '/servicessite',
    name: 'ServicesSite',
    component: () => import('@/views/site/Services.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    store.dispatch('auth/getLSUserInfo').then((ls) => {
      if(ls){
        store.dispatch('auth/attempt', ls.token).then((value) => {
          if(value === false && to.name != 'Login'){
            next({ name: "Login" })
          }else{
            next()
          }
        })
      }else{
        next({ name: "Home" })
      }
    })
  }else{
    next()
  }
});

export default router
