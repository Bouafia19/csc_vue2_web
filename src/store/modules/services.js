import axios from 'axios'
import router from '../../router'

const state = {
    allServices: undefined,
    user: undefined,
    getServices: undefined,
}

const getters = {
    allServices: (state) => state.allServices,
    getServices: (state) => state.getServices
}

const actions = {
    async getAllServices({ dispatch, commit }){
        // dispatch('auth/getLSUserInfo').then(async (ls) => {
            let params = {
                typeAccount: "client"
            }
            try {
                const response = await axios.get(`api/services`,{
                    // headers: {
                    //     'Authorization': `Bearer ${ls.token}`
                    // }
                })
                if(response.status === 200){
                    commit('getServices', response.data)
                }
            } catch (error) {
                throw new Error(`${error}`)
            }
        // })
    },
    //fetch single Trip
    async fetchServices({ dispatch, commit }){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            let params = {
                typeAccount: "client"
            }
            try {
                const response = await axios.get(`api/services`,{
                    headers: {
                        'Authorization': `Bearer ${ls.token}`
                    }
                })
                if(response.status === 200){
                    commit('allServices', response.data)
                }
            } catch (error) {
                throw new Error(`${error}`)
            }
        })
    },
    //create single Trip
    async createServices({ dispatch, commit }, params){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            try {
                const response = await axios.post(`api/services`, params,{
                    headers: {
                        'Authorization': `Bearer ${ls.token}`
                    }
                })
                if(response.status === 200){
                    commit('setTransporters', response.data)
                    dispatch('calcRoute', { params, response })
                }
            } catch (error) {
                throw new Error(`${error}`)
            }
        })
    },

    async sendNotification({ dispatch }, params) {
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            try {
                const response = await axios.post(`api/notifications/token`, params, {
                    headers: {
                        'Authorization': `Bearer ${ls.token}`
                    }
                })
                if(response.status === 200){
                    console.log('notification response 200')
                }
            } catch (error) {
                throw new Error(`${error}`)
            }
        })
    },
    
    async updateTrip({ dispatch, commit }, params){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            try {
                const response = await axios.patch(`api/services/updateTrip/${params._id}`, params,{
                    headers: {
                        'Authorization': `Bearer ${ls.token}`
                    }
                })
                if(response.status === 200){
                    console.log('', response.data)
                }
            } catch (error) {
                throw new Error(`${error}`)
            }
        })
    },

    async addPlannedTrip({ dispatch, commit }, params){
        params.status = 'planned'
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            try {
                const response = await axios.post(`api/services/confirmeTrip`, params,{
                    headers: {
                        'Authorization': `Bearer ${ls.token}`
                    }
                })
                if(response.status === 200){
                    console.log('planned services', response.data)
                    router.push({ name: 'Tabs' })
                }
            } catch (error) {
                throw new Error(`${error}`)
            }
        })
    },

    async checkAnnulationOfTrip({ dispatch }, {id, reason}){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            try {
                const response = await axios.get(`api/services/getOneTrip/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${ls.token}`
                    }
                })
                if(response.status === 200){
                    if(response.data.cancellation.reason === ''){
                        let service = response.data
                        service.cancellation.reason = reason
                        service.cancellation.by = 'client'
                        service.status = 'canceled'
                        dispatch('updateAnnulationOfTrip', service)
                    }else{
                        router.push({ name: 'Tabs' })
                    }
                }
            } catch (error) {
                throw new Error(`${error}`)
            }
        })
    },


    async updateAnnulationOfTrip({ dispatch, commit }, params){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            try {
                const response = await axios.patch(`api/services/updateAnnulationOfTrip/${params._id}`, params,{
                    headers: {
                        'Authorization': `Bearer ${ls.token}`
                    }
                })
                if(response.status === 200){
                    router.push({ name: 'Tabs' })
                }
            } catch (error) {
                throw new Error(`${error}`)
            }
        })
    },

    async fetchUser({ dispatch, commit }){
        return new Promise((resolve, reject) => {
            try {
                dispatch('auth/getLSUserInfo').then(async (ls) => {
                    commit('setUser', ls.user)
                    resolve(ls.user)
                })
            } catch (error) {
                reject()
                throw new Error(`${error}`)
            }
        })
    },
}

const mutations = {
    setUser: (state, user) => (state.user = user),
    allServices: (state, allServices) => (state.allServices = allServices.filter((item) => item.audience != "professional")).forEach(element => {
            element.done = false
            state.user.subscriptionsIds.forEach(e => {
                if(element._id === e){
                    element.done = true
                    
                }
            })
    }),
    getServices: (state, getServices) => (state.getServices = getServices),
    finishedServices: (state, finishedServices) => (state.finishedServices = finishedServices.filter((item) => item.finished)),
    plannedServices: (state, plannedServices) => (state.plannedServices = plannedServices.filter((item) => 'start' in item && Date.parse(item.start) > Date.parse(new Date()) && item.status === 'planned')).forEach(element => {
            element.start = element.start.substr(0, 19)
            if(element.transporterId){
                element.color = 'red'
            }else{
                element.color = 'grey'
            }
        }),
    inProgressServices: (state, inProgressServices) => (state.inProgressServices = inProgressServices.filter((item) => item.status === 'started')),
    setTransporters: (state, transporters) => (state.transporters = transporters)
}

export default {
    state,
    getters,
    actions,
    mutations
}