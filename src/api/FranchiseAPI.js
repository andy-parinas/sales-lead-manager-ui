import {URIBuilder} from "./helpers";
import api from "./api";
import csrf from "./csrf";


const FranchiseAPI = {

    async getAllFranchise(pageOptions, searchOptions){

        const requestUri = '/api/franchises';

        const uri = URIBuilder.build(requestUri, pageOptions, searchOptions);

        const response = await api().get(uri)

        return response.data;

    },

    async getAllSubFranchises(pageOptions, searchOptions){

        const requestUri = '/api/franchises/sub-franchises';

        const uri = URIBuilder.build(requestUri, pageOptions, searchOptions);

        const response = await api().get(uri)

        return response.data;

    },

    async attachUsersFranchise(userId, franchiseId){

        const uri = `/api/users/${userId}/franchises/${franchiseId}`;

        await csrf.getCSRFCookie();

        const response = await api().post(uri);


        return response.data;

    },

    async getRelatedFranchise(franchiseId, pageOptions, searchOptions){

        const requestUri = `/api/franchises/${franchiseId}/related`;

        const uri = URIBuilder.build(requestUri, pageOptions, searchOptions);

        const response = await api().get(uri);

        return response.data;
    },

    async getParentFranchises(){

        const uri = '/api/franchises/parents';

        const response = await api().get(uri);

        return response.data;
    },

    async updateFranchise(updates){

        const uri = `/api/franchises/${updates.id}`
        //normalize data
        const data = {
            franchise_number: updates.franchiseNumber,
            name: updates.name,
            description: updates.description,
            parent_id: typeof updates.parentId === 'undefined'? null : updates.parentId
        }

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data)

        return response.data;

    },

    async createFranchise(formData){

        const uri = '/api/franchises'

        const data = {
            franchise_number: formData.franchiseNumber,
            name: formData.name,
            description: formData.description,
            parent_id: typeof formData.parentId === 'undefined'? null : formData.parentId
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data)

        return response.data;

    }

}


export default FranchiseAPI;