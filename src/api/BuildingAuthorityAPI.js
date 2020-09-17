import csrf from "@/api/csrf";
import api from "@/api/api";


const BuildingAuthorityAPI = {

    async getBuildingAuthority(leadId){

        const uri = `/api/leads/${leadId}/authorities`

        console.log(uri);

        const response = await api().get(uri);

        return response;

    },


    async createBuildingAuthority(leadId, formData){

        const uri = `/api/leads/${leadId}/authorities`

        await csrf.getCSRFCookie();

        const data = {
            approval_required: formData.approvalRequired,
            building_authority_name: formData.buildingAuthorityName,
            date_plans_sent_to_draftsman: formData.datePlansSentToDraftsman,
            date_plans_completed: formData.datePlansCompleted,
            date_plans_sent_to_authority: formData.datePlansSentToAuthority,
            building_authority_comments: formData.buildingAuthorityComments,
            date_anticipated_approval: formData.dateAnticipatedApproval,
            date_received_from_authority: formData.dateReceivedFromAuthority,
            permit_number: formData.permitNumber,
            security_deposit_required: formData.securityDepositRequired,
            building_insurance_name: formData.buildingInsuranceName,
            building_insurance_number: formData.buildingInsuranceNumber,
            date_insurance_request_sent: formData.dateInsuranceRequestSent,

        }

        const response = await api().post(uri, data);

        return response.data;

    },


    async updateBuildingAuthority(leadId, buildingAuthorityId, formData){

        const uri = `/api/leads/${leadId}/authorities/${buildingAuthorityId}`

        const data = {
            approval_required: formData.approvalRequired,
            building_authority_name: formData.buildingAuthorityName,
            date_plans_sent_to_draftsman: formData.datePlansSentToDraftsman,
            date_plans_completed: formData.datePlansCompleted,
            date_plans_sent_to_authority: formData.datePlansSentToAuthority,
            building_authority_comments: formData.buildingAuthorityComments,
            date_anticipated_approval: formData.dateAnticipatedApproval,
            date_received_from_authority: formData.dateReceivedFromAuthority,
            permit_number: formData.permitNumber,
            security_deposit_required: formData.securityDepositRequired,
            building_insurance_name: formData.buildingInsuranceName,
            building_insurance_number: formData.buildingInsuranceNumber,
            date_insurance_request_sent: formData.dateInsuranceRequestSent,

        }


        const response = await api().patch(uri, data);


        return response.data;

    }


}

export  default BuildingAuthorityAPI;