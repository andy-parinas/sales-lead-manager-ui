import api from "./api";
import {URIBuilder} from "./helpers";
import csrf from "./csrf";
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

    async getPostcodeById(postcodeId){

        const uri = `/api/postcodes/${postcodeId}`;

        const response = await api().get(uri);

        return response.data;

    },


    async getFranchisePostcodes(franchiseId, pageOptions, searchOptions){

        const uri = URIBuilder.build(`/api/franchises/${franchiseId}/postcodes`, pageOptions, searchOptions);

        const response = await api().get(uri);

        return response.data;
    },



    async getAvailableFranchisePostcode(franchiseId, pageOptions, searchOptions){

        const uri = URIBuilder.build(`/api/franchises/${franchiseId}/postcodes/available`, pageOptions, searchOptions);

        const response = await api().get(uri);

        return response.data;

    },


    async checkFranchisePostcode(franchiseId, postCodeId){

        const uri =   `/api/franchises/${franchiseId}/postcodes/${postCodeId}/check`

        const response = await api().get(uri);

        return response.data;

    },

    async addPostcodes(franchiseId, postcodes){

        const uri = `/api/franchises/${franchiseId}/postcodes`;

        const response = await api().post(uri, {postcodes: postcodes})

        return response.data;

    },

    async removePostcodes(franchiseId, postcodes){

        const uri = `/api/franchises/${franchiseId}/postcodes/detach`;

        const response = await api().post(uri, {postcodes: postcodes})

        return response.data;

    },

    async addPostcodeToFranchise(franchiseId, postcodeId){

        const uri = `/api/franchises/${franchiseId}/postcodes/${postcodeId}/attach`

        await csrf.getCSRFCookie();

        const response = await api().post(uri);

        return response.data;

    },

    async removePostcodeFromFranchise(franchiseId, postcodeId){

        const uri = `/api/franchises/${franchiseId}/postcodes/${postcodeId}/detach`

        await csrf.getCSRFCookie();

        const response = await api().post(uri);

        return response.data;

    }
}

export default PostcodeAPI;