import api from "./api";
// import Csrf from './csrf';


const LeadAPI = {

    async getLeads(){

        console.log('Fetching Leads')

        const uri = '/api/leads'

        const response = await api().get(uri);

        return response.data.data
    }

}


export default LeadAPI;