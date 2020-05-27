import {URIBuilder} from "./helpers";
import api from "./api";
import csrf from "./csrf";


const FranchiseAPI = {

    async getAllFranchise(pageOptions, searchOptions){

        const requestUri = '/api/franchises';

        const uri = URIBuilder.build(requestUri, pageOptions, searchOptions);

        const response = await api().get(uri)

        console.log('Franchises', response.data);
        return response.data;

    },

    async attachUsersFranchise(userId, franchiseId){

        const uri = `/api/users/${userId}/franchises/${franchiseId}`;

        await csrf.getCSRFCookie();

        const response = await api().post(uri);


        return response.data;

    }

}


export default FranchiseAPI;