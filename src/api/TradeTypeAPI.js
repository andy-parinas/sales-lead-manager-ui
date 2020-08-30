import api from "@/api/api";


const TradeTypeAPI = {

    async getTradeTypes(){

        const uri = '/api/trade-types';

        const response = await api().get(uri);

        return response.data;

    }


}

export default TradeTypeAPI;