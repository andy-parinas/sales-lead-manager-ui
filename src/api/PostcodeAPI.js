import api from "./api";
import {URIBuilder} from "./helpers";
// import csrf from "./csrf";

const PostcodeAPI = {


    async getAll(pageOptions, searchOptions){

        const uri = URIBuilder.build('/api/postcodes', pageOptions, searchOptions);

        const response = await api().get(uri);

        console.log('Postcode APi', response);

        return response.data;
    },

    async search(value){
        const uri = '/api/postcodes/search?search=' + encodeURIComponent(value)

        const response = await api().get(uri);

        return response.data;
    },


    async getFranchisePostcodes(franchiseId){
        const uri = `/api/franchises/${franchiseId}/postcodes`;

        const response = await api().get(uri);

        return response.data;
    }
}

export default PostcodeAPI;