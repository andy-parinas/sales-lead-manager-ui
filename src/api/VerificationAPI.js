import api from "@/api/api";
import csrf from "@/api/csrf";


const VerificationAPI = {

    async getVerification(leadId){

        const uri = `/api/leads/${leadId}/verifications`;

        const response = await api().get(uri);

        return response;

    },

    async createVerification(leadId, formData){

        const uri = `/api/leads/${leadId}/verifications`;

        const data = {
            design_correct: formData.designCorrect,
            date_design_check: formData.dateDesignCheck,
            costing_correct: formData.costingCorrect,
            date_costing_check: formData.dateCostingCheck,
            estimated_build_days: formData.estimatedBuildDays,
            trades_required: formData.tradesRequired,
            building_supervisor: formData.buildingSupervisor,
            roof_sheet_id: formData.roofSheetId,
            roof_colour_id: formData.roofColourId,
            lineal_metres: formData.linealMetres,
            franchise_authority: formData.franchiseAuthority,
            authority_date: formData.authorityDate,
            date_maintenance_letter_sent: formData.dateMaintenanceLetterSent
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);

        return response.data

    },

    async updateVerification(leadId, verificationId, formData){


        const uri = `/api/leads/${leadId}/verifications/${verificationId}`;

        const data = {
            design_correct: formData.designCorrect,
            date_design_check: formData.dateDesignCheck,
            costing_correct: formData.costingCorrect,
            date_costing_check: formData.dateCostingCheck,
            estimated_build_days: formData.estimatedBuildDays,
            trades_required: formData.tradesRequired,
            building_supervisor: formData.buildingSupervisor,
            roof_sheet_id: formData.roofSheetId,
            roof_colour_id: formData.roofColourId,
            lineal_metres: formData.linealMetres,
            franchise_authority: formData.franchiseAuthority,
            authority_date: formData.authorityDate,
            date_maintenance_letter_sent: formData.dateMaintenanceLetterSent
        }

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data

    }


};

export default VerificationAPI;