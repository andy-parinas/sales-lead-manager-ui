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

    },

    async sendWelcomeLetter(leadId){


        const uri = `/api/contracts/${leadId}/letters/welcome`;

        await csrf.getCSRFCookie();

        const response = await api().post(uri);

        return response.data


    },

    async sendIntroCouncil(leadId){

        const uri = `/api/authorities/${leadId}/letters/council-intro`;

        await csrf.getCSRFCookie();

        const response = await api().post(uri);

        return response.data

    },

    async sendOutOfCouncil(leadId){

        const uri = `/api/authorities/${leadId}/letters/out-of-council`;

        await csrf.getCSRFCookie();

        const response = await api().post(uri);

        return response.data

    },

    async sendNoCouncil(leadId){

        const uri = `/api/authorities/${leadId}/letters/no-council`;

        await csrf.getCSRFCookie();

        const response = await api().post(uri);

        return response.data
    }


}

export default lettersAPI;