import api from "./api";


const ReportAPI = {

    async getSalesSummary(formData){

        console.log('GetReport', formData)

        let params = `start_date=${encodeURIComponent(formData.startDate)}&end_date=${encodeURIComponent(formData.endDate)}`

        if(formData.franchiseId && formData.franchiseId !== ""){
            params = params + `&franchise_id=${formData.franchiseId}`
        }

        if(formData.productId && formData.productId !== ""){
            params = params + `&product_id=${formData.productId}`
        }

        if(formData.designAdvisorId && formData.designAdvisorId !== ""){
            params = params + `&sales_staff_id=${formData.designAdvisorId}`
        }

        const uri = `/api/reports/sales-summary?${params}`;

        console.log('URI', uri)

        const response = await api().get(uri);

        return response.data;

    }


}

export default ReportAPI;