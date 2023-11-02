import axios from 'axios'
// import { Capacitor } from "@capacitor/core"
// import { JsonSQLite } from "@capacitor-community/sqlite"
// import {
//   defineCustomElements as jeepSqlite,
//   applyPolyfills,
// } from "jeep-sqlite/loader"

const state = {
    terms: [],
    loadingTerms: true
}

const getters = {
    terms: (state) => state.terms,
    loadingTerms: (state) => state.loadingTerms
}

const actions = {
    //terms component
    async fetchTerms({ commit }){
        // const user = JSON.parse(localStorage.getItem('userInfo'))
        commit('setLoadingTerms', true)
        try {
            const response = await axios.get('api/terms', {
                // headers: {
                //     'Authorization': `Bearer ${user.token}`
                // }
            });
            if(response.status === 200){
                commit('setTerms', response.data);
                commit('setLoadingTerms', false)
            }
            
        } catch (error) {
            throw new Error(`${error}`)
        }
        
    }
}

const mutations = {
    setTerms: (state, terms) => (state.terms = terms),
    setLoadingTerms: (state, loadingTerms) => (state.loadingTerms = loadingTerms)
}

export default {
    state,
    getters,
    actions,
    mutations
}