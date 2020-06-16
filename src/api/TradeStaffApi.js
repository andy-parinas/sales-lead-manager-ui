import {URIBuilder} from "./helpers";
import api from "./api";


const TradeStaffAPI = {

    async getAll(pageOptions, searchOptions){

        const uri = URIBuilder.build('/api/trade-staffs', pageOptions, searchOptions);

        const response = await api().get(uri);

        console.log('API', response);

        return response.data;

    }

}

export default TradeStaffAPI;