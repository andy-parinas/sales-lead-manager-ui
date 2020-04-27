import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from "./modules/auth";

export default new Vuex.Store({
    state: {
      appLoading: false
    },
    mutations: {
        setAppLoading(state, status){
            state.appLoading = status;
        }
    },
    actions: {
        setAppLoadingState({commit}, status){
            commit('setAppLoading', status);
        }
    },
    modules: {
        auth,
    }
})