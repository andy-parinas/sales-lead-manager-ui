import api from "./api";
import {URIBuilder} from "./helpers";
// import Csrf from './csrf';


const LeadAPI = {

    async getLeads(options, searhOption){

        const requestUri = '/api/leads'
        const uri = URIBuilder.build(requestUri, options, searhOption)

        const response = await api().get(uri);

        return response.data.data
    }

}


export default LeadAPI;