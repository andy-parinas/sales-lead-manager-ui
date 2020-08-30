
import api from "./api";
import csrf from "@/api/csrf";

const LeadSourceAPI = {

    async getleadSources(){

        const uri = '/api/lead-sources';

        const response = await api().get(uri);

        return response.data;
    },


    async createLeadSource(formData){

        const uri = '/api/lead-sources';

        const data = {
            name: formData.name
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);

        return response.data

    }

}

export default LeadSourceAPI;