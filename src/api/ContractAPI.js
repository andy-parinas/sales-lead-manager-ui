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

    },

    async updateLeadContract(leadId, formData){

        const uri =   `/api/leads/${leadId}/contracts/${formData.id}`;

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

        const response = await api().patch(uri, data);

        return response.data;

    },

    async getContractVariations(contractId){

        const uri = `/api/contracts/${contractId}/contract-variations`;

        const response = await api().get(uri);

        return response.data;

    },

    async createContractVariations(contractId, formData){

        const uri = `/api/contracts/${contractId}/contract-variations`;

        const data = {
            variation_date: formData.variationDate,
            description: formData.description,
            amount: formData.amount,
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);

        return response.data;

    },

    async updateContractVariation(contractId, formData){

        const uri = `/api/contracts/${contractId}/contract-variations/${formData.id}`;

        const data = {
            variation_date: formData.variationDate,
            description: formData.description,
            amount: formData.amount,
        }

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;

    },

    async deleteContractVariation(contractId, variationId){

        const uri = `/api/contracts/${contractId}/contract-variations/${variationId}`;


        await csrf.getCSRFCookie();

        const response = await api().delete(uri);


        return response.data;

    }

}

export default ContractAPI;