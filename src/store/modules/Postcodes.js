
import PostcodeAPI from "../../api/PostcodeAPI";

export default {
    namespaced: true,
    state:{
        postcodes: []
    },
    mutations: {
        setPostcodes(state, postcodes){
            state.postcodes = postcodes;
        },
        insertPostcode(state, postcode){
            state.postcodes.push(postcode);
        }
    },
    actions: {
        async findPostcodes({commit}, searchValue){
            const postcodes = await PostcodeAPI.search(searchValue);
            commit('setPostcodes', postcodes);
        },
        async pushPostCode({commit, state}, postcode){
            //Check if PostcodeAPI is already in the array.
            if(state.postcodes.indexOf(postcode) === -1){
                commit('insertPostcode', postcode)
            }
        }
    }
}