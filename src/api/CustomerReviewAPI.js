import csrf from "@/api/csrf";
import api from "@/api/api";


const CustomerReviewAPI = {

    async createCustomerReview(leadId, formData){

        const uri = `/api/leads/${leadId}/customer-reviews`;

        const data = {
            date_project_completed: formData.dateProjectCompleted,
            date_warranty_received: formData.dateWarrantyReceived,
            home_addition_type: formData.homeAdditionType,
            home_addition_description: formData.homeAdditionDescription,
            service_received_rating: formData.serviceReceivedRating,
            workmanship_rating: formData.workmanshipRating,
            finished_product_rating: formData.finishedProductRating,
            design_consultant_rating: formData.designConsultantRating,
            comments: formData.comments,
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);

        return response.data;

    }

}

export default CustomerReviewAPI;