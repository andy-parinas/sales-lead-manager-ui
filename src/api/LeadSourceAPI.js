
import api from "./api";

const LeadSoruceAPI = {

    async getleadSoruces(){

        const uri = '/api/lead-sources';

        const response = await api().get(uri);

        return response.data;
    }



}

export default LeadSoruceAPI;