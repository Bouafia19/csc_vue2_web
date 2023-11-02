import axios from 'axios'

const state = {
    user: undefined
}

const getters = {
    user: (state) => state.user
}

const actions = {

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
    
    async editUsers({ dispatch, commit }, params){
        return new Promise((resolve, reject) => {

            dispatch('auth/getLSUserInfo').then(async (ls) => {
                try {
                    dispatch('auth/removeLSUserInfo')
                    dispatch('auth/setLSUserInfo', JSON.stringify({
                        token: ls.token, 
                        user: params
                    })).then(() => {
                        dispatch('auth/getLSUserInfo').then(async (newLs) => {
                            commit('setUser', newLs.user)

                            let condition = true
                            do {
                                try {
                                    const response = await axios.patch(`api/users/${newLs.user._id}`, params, {
                                        headers: {
                                            'Authorization': `Bearer ${newLs.token}`
                                        }
                                    })
                                    if(response.status === 200){
                                        condition = false
                                    }
                                } catch (error) {
                                    condition = true
                                }
                            } while (condition)

                            resolve()

                        })
                    })
                } catch (error) {
                    reject()
                    throw new Error(`${error}`)
                }
            })
        })
    }
}

const mutations = {
    setUser: (state, user) => (state.user = user)
}

export default {
    state,
    getters,
    actions,
    mutations
}