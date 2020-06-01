import FranchiseAPI from "../../api/FranchiseAPI";


export default {
    namespaced: true,

    state: {
        franchises: [],
        pagination: null,
        selectedFranchise: null,
        relatedFranchises: [],
        relatedPagination: null
    },

    mutations: {

        setFranchises(state, franchises) {
            state.franchises = franchises
        },

        setPagination(state, pagination) {
            state.pagination = pagination
        },

        setRelateFranchises(state, franchises){
            state.relatedFranchises = franchises
        },

        setRelatedPagination(state, pagination){
            state.relatedPagination = pagination;
        },

        setSelectedFranchise(state, franchise){
            state.selectedFranchise = franchise;
        }

    },

    actions: {

        async getFranchises({commit}, {pageOptions, searchOptions}){

            const response = await FranchiseAPI.getAllFranchise(pageOptions, searchOptions);

            commit('setFranchises', response.data);
            commit('setPagination', response.pagination);

        },

        setSelectedFranchise({commit}, franchise){

            commit('setSelectedFranchise', franchise);

        },
        async getRelatedFranchises({commit}, {franchiseId, pageOptions, searchOptions}){

            const response = await FranchiseAPI.getRelatedFranchise(franchiseId, pageOptions, searchOptions);

            commit('setRelateFranchises', response.data);
            commit('setRelatedPagination', response.pagination);
        }

    }
}