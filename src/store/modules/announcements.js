import axios from 'axios'

const state = {
    announcements: undefined
}

const getters = {
    announcements: (state) => state.announcements
}

const actions = {
    //announcements component
    async fetchAnnouncements({ dispatch, commit }){
        dispatch('auth/getLSUserInfo').then(async (ls) => {
            try {
                const response = await axios.get('api/announcements/getAnnouncementsByRole/client', {
                    headers: {
                        'Authorization': `Bearer ${ls.token}`
                    }
                })
                if(response.status === 200){
                    commit('setAnnouncements', response.data)
                }
            } catch (error) {
                throw new Error(`${error}`)
            }
        })
    }
}

const mutations = {
    setAnnouncements: (state, announcements) => (state.announcements = announcements)
}

export default {
    state,
    getters,
    actions,
    mutations
}