import FranchiseAPI from "../../api/FranchiseAPI";


export default {
    namespaced: true,

    state: {
        franchises: [],
        pagination: null
    },

    mutations: {

        setFranchises(state, franchises) {
            state.franchises = franchises
        },

        setPagination(state, pagination) {
            state.pagination = pagination
        }

    },

    actions: {

        async getFranchises({commit}, {pageOptions, searchOptions}){

            const response = await FranchiseAPI.getAllFranchise(pageOptions, searchOptions);

            commit('setFranchises', response.data);
            commit('setPagination', response.pagination);

        },



    }
}