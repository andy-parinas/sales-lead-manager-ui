import api from "./api";
import csrf from "./csrf";


const ConstructionAPI = {

    async getConstruction(leadId){

        const uri = `/api/leads/${leadId}/constructions`;

        const response = await api().get(uri);

        return response;

    },

    async createConstruction(leadId, formData){

        const uri = `/api/leads/${leadId}/constructions`;

        const data = {
             site_address : formData.siteAddress,
             postcode_id : formData.postcodeId,
             material_list : formData.materialList,
             date_materials_received : formData.dateMaterialsReceived,
             date_assembly_completed : formData.dateAssemblyCompleted,
             date_anticipated_delivery : formData.dateAnticipatedDelivery,
             date_finished_product_delivery : formData.dateFinishedProductDelivery,
             coil_number : formData.coilNumber,
             trade_staff_id : formData.tradeStaffId,
             anticipated_construction_start : formData.anticipatedConstructionStart,
             anticipated_construction_complete : formData.anticipatedConstructionComplete,
             actual_construction_start : formData.actualConstructionStart,
             actual_construction_complete : formData.actualConstructionComplete,
             comments : formData.comments,
             final_inspection_date : formData.finalInspectionDate,
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);

        return response.data;

    }


}

export default ConstructionAPI;