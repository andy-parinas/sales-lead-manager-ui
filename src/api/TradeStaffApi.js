import {URIBuilder} from "./helpers";
import api from "./api";
import csrf from "./csrf";


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
    },

    async update(formData){
        const uri = `/api/trade-staffs/${formData.id}`;

        const data = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            contact_number: formData.contactNumber,
            trade_type_id: formData.tradeTypeId,
            company: formData.company,
            abn: formData.abn,
            builders_license: formData.buildersLicense,
            status: formData.status,
            franchise_id: formData.franchiseId
        }


        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);


        return response.data;

    },

    async create(formData){

        const uri = '/api/trade-staffs'

        const data = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            contact_number: formData.contactNumber,
            trade_type_id: formData.tradeTypeId,
            company: formData.company,
            abn: formData.abn,
            builders_license: formData.buildersLicense,
            status: formData.status,
            franchise_id: formData.franchiseId
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);


        return response.data;
    },

    async delete(tradeStaffId){

        const uri = `/api/trade-staffs/${tradeStaffId}`

        await csrf.getCSRFCookie();

        const response = await api().delete(uri);

        return response.data;
    }

}

export default TradeStaffAPI;