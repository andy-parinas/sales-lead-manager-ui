import api from "./api";


const ReportAPI = {

    async getSalesSummary(formData){


        let params = `start_date=${encodeURIComponent(formData.startDate)}&end_date=${encodeURIComponent(formData.endDate)}`

        if(formData.franchiseId && formData.franchiseId !== ""){
            params = params + `&franchise_id=${formData.franchiseId}`
        }

        if(formData.designAdvisorId && formData.designAdvisorId !== ""){
            params = params + `&sales_staff_id=${formData.designAdvisorId}`
        }

        if(formData.productId && formData.productId !== ""){
            params = params + `&product_id=${formData.productId}`
        }

        const uri = `/api/reports/sales-summary?${params}`;


        const response = await api().get(uri);

        return response.data;

    },

    async getProductSalesSummary(formData){

        let params = `start_date=${encodeURIComponent(formData.startDate)}&end_date=${encodeURIComponent(formData.endDate)}`

        if(formData.productId && formData.productId !== ""){
            params = params + `&product_id=${formData.productId}`
        }

        const uri = `/api/reports/product-sales-summary?${params}`;

        const response = await api().get(uri);

        return response.data;
    }


}

export default ReportAPI;