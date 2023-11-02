import axios from 'axios'

const state = {
    // notifications: undefined
}

const getters = {
    // notifications: (state) => state.notifications
}

const actions = {
    //notifications component
    async subscribeToNotifications({ dispatch, commit }, params){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            try {
                const response = await axios.post('/api/notifications/subscribe',params, {
                    headers: {
                        'Authorization': `Bearer ${ls.token}`
                    }
                })
                if(response.status === 200){
                    // commit('setNotifications', response.data)
                }
            } catch (error) {
                throw new Error(`${error}`)
            }
        })
    }
}

const mutations = {
    // setNotifications: (state, notifications) => (state.notifications = notifications.filter(item => item.topic === 'client'))
}

export default {
    state,
    getters,
    actions,
    mutations
}