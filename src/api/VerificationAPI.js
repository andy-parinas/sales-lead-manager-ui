import api from "@/api/api";


const VerificationAPI = {

    async getVerification(leadId){

        const uri = `/api/leads/${leadId}/verifications`;

        const response = await api().get(uri);

        return response;

    }


};

export default VerificationAPI;