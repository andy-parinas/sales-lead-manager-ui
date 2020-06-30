import api from "./api";


const ContractAPI = {

    async getLeadContract(leadId){
        const uri = `/api/leads/${leadId}/contracts`;

        const response = await api().get(uri);

        return response;

    }


}

export default ContractAPI;