import {URIBuilder} from "./helpers";
import api from "./api";


const SalesStaffAPI = {

    async getAllSalesStaff(pageOptions, searchOptions){

        const requestUri = '/api/sales-staffs';

        const uri = URIBuilder.build(requestUri, pageOptions, searchOptions);

        const response = await api().get(uri);

        console.log('SalesStaffAPi', response)

        return response.data;


    }

}

export default SalesStaffAPI;