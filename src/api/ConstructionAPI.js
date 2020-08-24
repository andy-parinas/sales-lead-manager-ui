import api from "./api";


const ConstructionAPI = {

    async getConstruction(leadId){

        const uri = `/api/leads/${leadId}/constructions`;

        const response = await api().get(uri);

        return response;

    }


}

export default ConstructionAPI;