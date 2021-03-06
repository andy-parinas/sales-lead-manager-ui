import api from "./api";
import {URIBuilder} from "./helpers";
import Csrf from "./csrf";
// import Csrf from './csrf';


const LeadAPI = {

    async getLeads(options, searchOption){

        const requestUri = '/api/leads'
        const uri = URIBuilder.build(requestUri, options, searchOption)

        console.log(uri);

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
                lead_number: formData.details.leadNumber,
                received_via: formData.details.receivedVia
            },
            job_type: {
                taken_by: formData.jobType.takenBy,
                date_allocated: formData.jobType.dateAllocated,
                description: formData.jobType.description,
                product_id: formData.jobType.productId,
                sales_staff_id: formData.jobType.designAssessorId
            },
            appointment: {
                appointment_date: `${formData.appointment.appointmentDate} ${formData.appointment.appointmentTime}`,
                followup_date: formData.appointment.followUp,
                appointment_notes: formData.appointment.notes,
                quoted_price: formData.appointment.quotedPrice,
                outcome: formData.appointment.outcome,
                comments: formData.appointment.comments,
                customer_touch_point: formData.appointment.customerTouchPoint
            }

        }

        console.log("Create Lead", data)
        const uri = `/api/franchises/${formData.details.franchiseId}/leads`;

        await Csrf.getCSRFCookie();

        const response = await api().post(uri, data);


        return response.data;

    },

    async updateLeadDetails(formData){

        //Normalize the data
        const data = {
            lead_number:  formData.leadNumber,
            lead_date: formData.leadDate,
            franchise_id: formData.franchiseId,
            lead_source_id: formData.leadSourceId,
            received_via: formData.receivedVia
        }

        const uri = `/api/leads/${formData.id}`;

        await Csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;
    },


    async updateJobType(leadId, formData){
        //Normalize the data
        const data = {
            taken_by: formData.takenBy,
            date_allocated: formData.dateAllocated,
            product_id: formData.productId,
            sales_staff_id: formData.designAssessorId,
            description: formData.description
        }

        const uri = `/api/leads/${leadId}/job-types/${formData.id}`;

        await Csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;
    },

    async updateAppointment(leadId, formData)
    {

        console.log('Updating');

        // Normalized Data
        const data = {
            appointment_date: formData.date,
            followup_date: formData.followUp,
            appointment_notes: formData.notes,
            outcome: formData.outcome,
            quoted_price: formData.quotedPrice,
            comments: formData.comments,
            customer_touch_point: formData.customerTouchPoint
        }

        console.log(data);

        const uri = `/api/leads/${leadId}/appointments/${formData.id}`;

        await Csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;
    },

    async deleteLead(leadId){
        const uri = `/api/leads/${leadId}`;

        await Csrf.getCSRFCookie();

        const response = await api().delete(uri);

        return response.data;
    },

    async sendEmailToDesignAdvisor($leadId, $salesStaffId){

        const uri = `api/job-types/${$leadId}/email/${$salesStaffId}`;

        await Csrf.getCSRFCookie();

        const response = await api().post(uri);

        return response.data;

    },

    async sendSmsToDesignAdvisor($leadId, $salesStaffId){

        const uri = `api/job-types/${$leadId}/sms/${$salesStaffId}`;

        await Csrf.getCSRFCookie();

        const response = await api().post(uri);

        return response.data;

    }
}


export default LeadAPI;