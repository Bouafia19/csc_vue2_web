import axios from 'axios'

const state = {
    vehicles: undefined
}

const getters = {
    vehicles: (state) => state.vehicles
}

const actions = {
    //fetch vehicles
    async fetchVehicles({ dispatch, commit }){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            try {
                const response = await axios.get(`api/vehicles`, {
                    headers: {
                        'Authorization': `Bearer ${ls.token}`
                    }
                });
                if(response.status === 200){
                    commit('setVehicles', response.data)
                }
                
            } catch (error) {
                throw new Error(`${error}`)
            }
        })
    }
}

const mutations = {
    setVehicles: (state, vehicles) => (state.vehicles = vehicles)
}

export default {
    state,
    getters,
    actions,
    mutations
}