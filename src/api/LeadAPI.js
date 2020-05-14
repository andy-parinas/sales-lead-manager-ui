import api from "./api";
import {URIBuilder} from "./helpers";
// import Csrf from './csrf';


const LeadAPI = {

    async getLeads(options, searhOption){

        const requestUri = '/api/leads'
        const uri = URIBuilder.build(requestUri, options, searhOption)
        const response = await api().get(uri);

        return response.data;
    },

    async getSingleLead(leadId){

        const requestUri = `/api/leads/${leadId}`

        const response = await api().get(requestUri);

        return response.data.data;
    },

    async createLead(formData){

        //Normalize the Data
        const data = {
            lead: {
                sales_contact_id: formData.sales_contact_id,
                lead_source_id: formData.details.leadSourceId,
                lead_date: formData.details.leadDate,
                lead_number: formData.details.leadNumber
            },
            job_type: {
                taken_by: formData.jobType.takenBy,
                date_allocated: formData.jobType.dateAllocated,
                description: formData.jobType.description,
                product_id: formData.jobType.productId,
                design_assessor_id: formData.jobType.designAssessorId
            },
            appointment: {
                appointment_date: `${formData.appointment.appointmentDate} ${formData.appointment.appointmentTime}`,
                appointment_notes: formData.appointment.notes,
                quoted_price: formData.appointment.quotedPrice,
                outcome: formData.appointment.outcome,
                comments: formData.appointment.comments,
            }

        }

        const uri = `/api/franchises/${formData.details.franchiseId}/leads`;

        console.log(uri)

        console.log('Normalize Data', data);

        const response = await api().post(uri, data);

        console.log('API Response', response);

        return response.data;

    }
}


export default LeadAPI;