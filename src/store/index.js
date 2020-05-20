import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from "./modules/Auth";
import salesContacts from './modules/SalesContacts';
import postcodes from './modules/Postcodes';
import LeadModule from "./modules/LeadModule";

export default new Vuex.Store({
    state: {
        appLoading: false,
        appError: false,
        appMessage: ''
    },
    mutations: {
        setAppLoading(state, status){
            state.appLoading = status;
        },
        setAppError(state, {status, message}){
            state.appError = status;
            state.appMessage = message;
        }
    },
    actions: {
        setAppLoadingState({commit}, status){
            commit('setAppLoading', status);
        },
        setAppErrorState({commit}, {status, message}){
            commit('setAppError', {status, message})
        },
        clearAllState({commit}){
            // Avoid some Nasty message in the console
            // wait for the components to unload first before setting the state objects to null
            setTimeout(() => {
                commit('leads/setLeads', [])
                commit('leads/setMeta', {})
                commit('leads/setLead', null)
                commit('salesContacts/setSalesContacts', [])
                commit('salesContacts/setSalesContactMeta', {})
            }, 1000)
        }
    },
    modules: {
        auth,
        salesContacts,
        postcodes,
        leads: LeadModule
    }
})