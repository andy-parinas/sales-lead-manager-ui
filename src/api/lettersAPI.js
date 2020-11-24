import csrf from "@/api/csrf";
import api from "@/api/api";


const lettersAPI = {

    async sendUnAssignedIntoLetter(leadId, salesContactId){

        const uri = `/api/leads/${leadId}/letters/unassigned-intro/${salesContactId}`;

        await csrf.getCSRFCookie();

        const response = await api().post(uri);

        return response.data

    },

    async sendAssignedIntoLetter(leadId, salesContactId){

        const uri = `/api/leads/${leadId}/letters/assigned-intro/${salesContactId}`;

        await csrf.getCSRFCookie();

        const response = await api().post(uri);

        return response.data

    }


}

export default lettersAPI;