
import PostcodeAPI from "../../api/PostcodeAPI";

export default {
    namespaced: true,
    state:{
        postcodes: [],
        pagination: null,
        franchisePostcodes: [],
        franchisePostcodePagination: null
    },
    mutations: {
        setPostcodes(state, postcodes){
            state.postcodes = postcodes;
        },
        setPagination(state, pagination){
            state.pagination = Object.assign({}, pagination);
        },
        insertPostcode(state, postcode){
            state.postcodes.push(postcode);
        },
        setFranchisePostcodes(state, postcodes){
            state.franchisePostcodes = postcodes;
        },
        setFranchisePostcodePagination(state, pagination){
            state.franchisePostcodePagination = pagination;
        }
    },
    actions: {
        async getPostcodes({commit}, {pageOptions, searchOptions}){
            const response = await PostcodeAPI.getAll(pageOptions, searchOptions);

            commit('setPostcodes', response.data)
            commit('setPagination', response.pagination)
        },
        async findPostcodes({commit}, searchValue){
            const postcodes = await PostcodeAPI.search(searchValue);
            commit('setPostcodes', postcodes);
        },
        async pushPostCode({commit, state}, postcode){
            //Check if PostcodeAPI is already in the array.
            if(state.postcodes.indexOf(postcode) === -1){
                commit('insertPostcode', postcode)
            }
        },
        async getFranchisePostcodes({commit}, {franchiseId, pageOptions, searchOptions}){
            const response = await PostcodeAPI.getFranchisePostcodes(franchiseId, pageOptions, searchOptions);

            commit('setFranchisePostcodes', response.data);
            commit('setFranchisePostcodePagination', response.pagination);
        },

        clearFranchisePostcodes({commit}){
            commit('setFranchisePostcodes', []);
            commit('setFranchisePostcodePagination', null);
        }
    }
}