import axios from 'axios'
import router from '../../router'

const state = {
    user: [],
    auth_login: false,
    token: null
}

const getters = {
    authenticated(state){
        return state.auth_login && state.user
    },
    user(state){
        return state.user
    }
}

const mutations = {
    setUser: (state, user) => (state.user = user),
    setAuthLogin: (state, auth_login) => (state.auth_login = auth_login)
}

const actions = {
    async setLSUserInfo({}, data){
        localStorage.setItem('userInfo', data)
    },
    async getLSUserInfo(){
        const value = JSON.parse(localStorage.getItem('userInfo'))
        return value
    },
    async removeLSUserInfo(){
        localStorage.removeItem('userInfo')
    },
    // verify phone
    async account_verify_phone ({ commit }, params) {
        const response = await axios.post("api/users/verifyPhone", params)
        if(response.status === 200){
            // router.push({ path: `/codeVerification/${response.data.phonenumber}` })
            router.push({ path: `/userInformation/${params.phonenumber}` })
        } else {
            throw new Error('could not complete verification')
        }
    },

    // verify code
    async account_verify_code ({ commit }, params) {
        const response = await axios.post("api/users/verifyCode", params)
        if(response){
            router.push({ path: `/userInformation/${response.data.data.to}` })
        } else {
            throw new Error('could not complete verification')
        }
    },
    
    // login to user account 
    async account_sign_in ({ dispatch, commit }, params) {
        try {
            const response = await axios.post("api/users/login", params)
            if(response){
                commit('setUser', response.data)
                commit('setAuthLogin', true)
                dispatch('setLSUserInfo', JSON.stringify(response.data)).then(() => {
                    router.push('/tabs')  
                })
            }else{
                throw new Error('could not complete login')
            }
        } catch (error) {
            // console.log('error', error.response.data.error)
            throw new Error(`${error.response.data.error}`)
        }
    },

    // sign up new user
    async account_sign_up ({ dispatch, commit }, params) {
        try {
            const response = await axios.post("api/users/signup", params)
            if(response){
                commit('setUser', response.data)
                commit('setAuthLogin', true)
                dispatch('setLSUserInfo', JSON.stringify(response.data)).then(() => {
                    router.push('/tabs')
                })
            } else {
                throw new Error('could not complete signup')
            }
            
        } catch (error) {
            // console.log('error', error.response.data.error)
            throw new Error(`${error.response.data.error}`)
        }
    },

    async verifyUser({ dispatch, commit }, params){
        try {
            const response = await axios.post(`api/users/verifyUser`, params)
               
            if(response.status === 200){
                if(response.data.email === 'guest@gmail.com' && response.data.firstName === 'guest' && response.data.lastName === 'guest'){
                    router.push({ name: 'UpdateUserInformation', params: { user: response.data}})
                }else{
                    router.push('/login')
                }
            }
            
        } catch (error) {
            throw new Error(`${error}`)
        }
    },

    // update existing user
    async account_update_existing_user ({ dispatch, commit }, params) {
        try {
            const response = await axios.patch(`api/users/update_existing_user/${params.id}`, params)
            if(response.status === 200){
                console.log('', response.data)
                dispatch('account_sign_in', { 
                    phone: response.data.phone,
                    password: params.password,
                    role: 'client'
                })
                // commit('setUser', response.data)
                // commit('setAuthLogin', true)
                // dispatch('setLSUserInfo', JSON.stringify(response.data)).then(() => {
                //     router.push('/tabs')  
                // })

            } else {
                throw new Error('could not complete signup')
            }
            
        } catch (error) {
            // console.log('error', error.response.data.error)
            throw new Error(`${error.response.data.error}`)
        }
    },

    // log out user
    account_sign_out ({ dispatch, commit }) {
        dispatch('removeLSUserInfo')
        commit('setAuthLogin', false)
        router.push('/home')
    },

    async attempt({commit}, token){
        if (token){
            commit('setUser', token)
            commit('setAuthLogin', true)
            return true
        }
        if (!token) {
            commit('setUser', '')
            commit('setAuthLogin', false)
            return false
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}