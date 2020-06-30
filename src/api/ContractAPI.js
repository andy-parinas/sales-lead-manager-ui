import api from "./api";
import csrf from "./csrf";


const ContractAPI = {

    async getLeadContract(leadId){
        const uri = `/api/leads/${leadId}/contracts`;

        const response = await api().get(uri);

        // Just returning Response since Header is needed in the execution
        return response;

    },

    async createLeadContract(leadId, formData){

        const uri = `/api/leads/${leadId}/contracts`;

        const data = {
            contract_date: formData.contractDate,
            contract_number: formData.contractNumber,
            contract_price: formData.contractPrice,
            deposit_amount: formData.depositAmount,
            date_deposit_received: formData.dateDepositReceived,
            warranty_required: formData.warrantyRequired,
            date_warranty_sent: formData.dateWarrantySent,
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);

        return response.data;

    }

}

export default ContractAPI;