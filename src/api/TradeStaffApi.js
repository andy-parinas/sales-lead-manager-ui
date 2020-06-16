import {URIBuilder} from "./helpers";
import api from "./api";


const TradeStaffAPI = {

    async getAll(pageOptions, searchOptions){

        const uri = URIBuilder.build('/api/trade-staffs', pageOptions, searchOptions);

        const response = await api().get(uri);

        return response.data;

    },

    async getTradeTypes(){
        const uri = '/api/trade-types';

        const response = await api().get(uri);

        return response.data;
    }

}

export default TradeStaffAPI;