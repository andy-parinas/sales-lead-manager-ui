import api from "./api";


const ReportAPI = {

    async getSalesSummary(startDate, endDate){


        const uri = `/api/reports/sales-summary?start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}`;

        const response = await api().get(uri);

        return response.data;

    }


}

export default ReportAPI;