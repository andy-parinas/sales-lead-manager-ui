import {URIBuilder} from "./helpers";
import api from "./api";


const FranchiseAPI = {

    async getAllFranchise(pageOptions, searchOptions){

        const requestUri = '/api/franchises';

        const uri = URIBuilder.build(requestUri, pageOptions, searchOptions);

        const response = await api().get(uri)

        console.log('Franchises', response.data);
        return response.data;

    }

}


export default FranchiseAPI;