import api from "./api";


const FinanceAPI = {

    async getLeadFinance($leadId){

        const uri = `/api/leads/${$leadId}/finances`;

        const response = await api().get(uri);

        return response;

    }

}

export default FinanceAPI;