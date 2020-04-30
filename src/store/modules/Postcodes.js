
import Postcode from "../../api/Postcode";

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
            const postcodes = await Postcode.search(searchValue);
            commit('setPostcodes', postcodes);
        },
        async pushPostCode({commit, state}, postcode){
            //Check if Postcode is already in the array.
            if(state.postcodes.indexOf(postcode) === -1){
                commit('insertPostcode', postcode)
            }
        }
    }
}