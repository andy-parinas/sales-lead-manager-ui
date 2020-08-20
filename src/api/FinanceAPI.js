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

    },

    async updatePayment(financeId, paymentId, formData){

        const uri = `api/finances/${financeId}/payments-made/${paymentId}`

        const data = {
            payment_date: formData.paymentDate,
            description: formData.description,
            amount: formData.amount
        }

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;


    },

    async deletePayment(financeId, paymentId){

        const uri = `api/finances/${financeId}/payments-made/${paymentId}`;

        await csrf.getCSRFCookie();

        const response = await api().delete(uri);

        return response.data;

    },

    async getPaymentsSchedule(financeId){

        const uri = `api/finances/${financeId}/payment-schedules`;

        const response = await api().get(uri);

        return response.data;

    },

    async addPaymentSchedule($financeId, formData){

        const uri = `api/finances/${$financeId}/payment-schedules`

        const data = {
            due_date: formData.dueDate,
            description: formData.description,
            amount: formData.amount
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);

        return response.data;

    },

    async updatePaymentSchedule(financeId, paymentId, formData ){

        const uri = `api/finances/${financeId}/payment-schedules/${paymentId}`;


        const data = {
            due_date: formData.dueDate,
            description: formData.description,
            amount: formData.amount
        }


        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;

    },

    async deletePaymentSchedule(financeId, paymentId){

        const uri = `api/finances/${financeId}/payment-schedules/${paymentId}`;

        await csrf.getCSRFCookie();

        const response = await api().delete(uri);

        return response.data;

    },

    async convertPaymentSchedule(financeId, paymentId){

        const uri = `api/finances/${financeId}/payment-schedules/${paymentId}/convert`;

        await csrf.getCSRFCookie();

        const response = await api().post(uri);

        return response.data;

    }

}

export default FinanceAPI;