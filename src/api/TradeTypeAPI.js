import api from "@/api/api";
import csrf from "@/api/csrf";


const TradeTypeAPI = {

    async getTradeTypes(){

        const uri = '/api/trade-types';

        const response = await api().get(uri);

        return response.data;

    },

    async createTradeType(formData){

        const uri = '/api/trade-types';

        const data = {
            name: formData.name
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);

        return response.data;
    },

    async updateTradeType(tradeTypeId, formData){

        const uri = `/api/trade-types/${tradeTypeId}`;

        const data = {
            name: formData.name
        }

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;

    }

}

export default TradeTypeAPI;