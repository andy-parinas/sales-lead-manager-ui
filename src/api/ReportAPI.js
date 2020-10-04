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

    async getSalesStaffSummary(formData){

        let params = `start_date=${encodeURIComponent(formData.startDate)}&end_date=${encodeURIComponent(formData.endDate)}`

        if(formData.franchiseId && formData.franchiseId !== ""){
            params = params + `&franchise_id=${formData.franchiseId}`
        }

        if(formData.designAdvisorId && formData.designAdvisorId !== ""){
            params = params + `&sales_staff_id=${formData.designAdvisorId}`
        }

        const uri = `/api/reports/sales-Staff-summary?${params}`;


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
    },

    async getOutcomeSummary(formData){


        let params = `start_date=${encodeURIComponent(formData.startDate)}&end_date=${encodeURIComponent(formData.endDate)}`

        if(formData.outcome && formData.outcome !== ""){
            params = params + `&outcome=${formData.outcome}`
        }

        if(formData.franchiseId && formData.franchiseId !== ""){
            params = params + `&franchise_id=${formData.franchiseId}`
        }


        const uri = `/api/reports/outcome-sales-staff?${params}`;
        console.log(uri)

        const response = await api().get(uri);

        return response.data;

    },

    async getOutcome(formData){

        let params = `start_date=${encodeURIComponent(formData.startDate)}&end_date=${encodeURIComponent(formData.endDate)}`

        if(formData.outcome && formData.outcome !== ""){
            params = params + `&outcome=${formData.outcome}`
        }

        if(formData.franchiseId && formData.franchiseId !== ""){
            params = params + `&franchise_id=${formData.franchiseId}`
        }


        const uri = `/api/reports/outcome?${params}`;
        console.log('outcome', uri)

        const response = await api().get(uri);

        return response.data;

    },

    async getLeadSources(formData){

        let params = `start_date=${encodeURIComponent(formData.startDate)}&end_date=${encodeURIComponent(formData.endDate)}`

        if(formData.source && formData.source !== ""){
            params = params + `&source=${formData.source}`
        }

        if(formData.outcome && formData.outcome !== ""){
            params = params + `&outcome=${formData.outcome}`
        }

        const uri = `/api/reports/lead-sources?${params}`;

        console.log(uri)

        const response = await api().get(uri);

        return response.data;
    }


}

export default ReportAPI;