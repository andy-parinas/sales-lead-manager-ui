
import api from "./api";

const LeadSourceAPI = {

    async getleadSources(){

        const uri = '/api/lead-sources';

        const response = await api().get(uri);

        return response.data;
    }



}

export default LeadSourceAPI;