import api from "./api";
import csrf from "./csrf";


const FinanceAPI = {

    async getLeadFinance($leadId){

        const uri = `/api/leads/${$leadId}/finances`;

        const response = await api().get(uri);

        return response;

    },

    async getPaymentsMade(financeId){

      const uri = `api/finances/${financeId}/payments-made`;

      const response = await api().get(uri);

      return response.data

    },

    async addPayment(financeId, formData){

        const uri = `api/finances/${financeId}/payments-made`

        const data = {
            payment_date: formData.paymentDate,
            description: formData.description,
            amount: formData.amount
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);

        return response.data;

    }

}

export default FinanceAPI;