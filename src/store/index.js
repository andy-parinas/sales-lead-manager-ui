import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from "./modules/Auth";
import salesContacts from './modules/SalesContacts';
import postcodes from './modules/Postcodes';
import LeadModule from "./modules/LeadModule";
import UserModule from "./modules/UserModule";
import FranchiseModule from "./modules/FranchiseModule";

export default new Vuex.Store({
    state: {
        appLoading: false,
        appError: false,
        appMessage: '',
        successMessage: '',
        showSuccessMessage: false,
        errorMessage: '',
        showErrorMessage: false
    },
    mutations: {
        setAppLoading(state, status){
            state.appLoading = status;
        },
        setAppError(state, {status, message}){
            state.appError = status;
            state.appMessage = message;
        },
        setSuccessMessage(state, message){
            if(message && message.trim() !== ''){
                state.showSuccessMessage = true;
                state.successMessage = message;
            }else {
                state.showSuccessMessage = false;
                state.successMessage = '';
            }

        },
        setErrorMessage(state, message){
            if(message && message.trim() !== ''){
                state.showErrorMessage = true;
                state.errorMessage = message;
            }else {
                state.showErrorMessage = false;
                state.errorMessage = '';
            }
        }
    },
    actions: {
        setAppLoadingState({commit}, status){
            commit('setAppLoading', status);
        },
        setAppErrorState({commit}, {status, message}){
            commit('setAppError', {status, message})
        },
        setSuccessMessage({commit}, message){
            commit('setSuccessMessage', message)
        },
        setErrorMessage({commit}, message){
            commit('setErrorMessage', message)
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
                commit('setErrorMessage', null)
                commit('setSuccessMessage', null)
            }, 1000)
        }
    },
    modules: {
        auth,
        salesContacts,
        postcodes,
        leads: LeadModule,
        users: UserModule,
        franchises: FranchiseModule
    }
})