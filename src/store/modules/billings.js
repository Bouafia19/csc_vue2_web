import axios from 'axios';

const state = {
    billings: undefined
}

const getters = {
    billings: (state) => state.billings
}

const actions = {
    //billings component
    async fetchBillings({ dispatch, commit }){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            const response = await axios.get('api/billings', {
                headers: {
                    'Authorization': `Bearer ${ls.token}`
                }
            })
        
        commit('setBillings', response.data)
        })
    },
    // add billings
    async addBillings({ dispatch, commit }, params){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            try {
                const response = await axios.post('api/billings', params, {
                    headers: {
                        'Authorization': `Bearer ${ls.token}`
                    },
                });
            } catch (error) {
                throw new Error(`${error.response.data.error}`)
            }
        })
        // commit('setUnits', response.data);
        // console.log(response)

    },
    // edit billings
    async editBillings({ dispatch, commit }, params){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            try {
                const response = await axios.patch(`api/billings/${params._id}`, params, {
                    headers: {
                        'Authorization': `Bearer ${ls.token}`
                    },
                })
            } catch (error) {
                throw new Error(`${error.response.data.error}`)
            }
            // commit('setUnits', response.data);
            // console.log(response)
        })
    },
    // delete billings
    async deleteBillings({ dispatch, commit }, id){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            const response = await axios.delete(`api/billings/${id}`, {
                headers: {
                    'Authorization': `Bearer ${ls.token}`
                },
            });
            // commit('setUnits', response.data);
            // console.log(response)
        })
    },

    async fetchBillingsByUserId({ dispatch, commit }, id){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            const response = await axios.get(`api/billings/getBillingsByUserId/${id}`,{
                headers: {
                    'Authorization': `Bearer ${ls.token}`
                }
            })
            if(response.status === 200){
                commit('setBillings', response.data)
            }
        })
    }
}

const mutations = {
    setBillings: (state, billings) => (state.billings = billings)
}

export default {
    state,
    getters,
    actions,
    mutations
}