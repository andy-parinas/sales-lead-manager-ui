import api from "./api";
import Csrf from './csrf';

import Utils from "../helpers/Utils";

const nomalizeData = (data) => {
    return {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        email2: data.email2,
        contact_number: data.contactNumber,
        street1: data.street1,
        street2: data.street2,
        suburb: data.suburb,
        state: data.state,
        postcode_id: data.postcodeId,
        customer_type: data.customerType,
        status: data.status
    }
}

const SalesContactAPI = {

    async getContacts(options, searchOptions){


        const size = options.itemsPerPage ? options.itemsPerPage : 10;

        let uri = '/api/contacts?size=' + size;

        if (searchOptions && searchOptions.searchFor && searchOptions.searchIn){
            if(searchOptions.searchFor.trim() !== '' && searchOptions.searchIn.trim() !== ''){
                uri = uri + `&search=${encodeURIComponent(searchOptions.searchFor)}&on=${searchOptions.searchIn}`;
            }
        }else if(searchOptions && searchOptions.searchFor){
            if(searchOptions.searchFor.trim() !== ''){

                uri = '/api/contacts/search?size=' + size;

                uri = uri + `&search=${encodeURIComponent(searchOptions.searchFor)}`;

            }
        }


        if (options.sortBy.length > 0){
            const field = Utils.camelToSnake(options.sortBy[0])
            const direction = options.sortDesc[0] ? 'desc' : 'asc';

            uri = uri + `&sort=${field}&direction=${direction}`
        }

        if (options.page){
            uri = uri + `&page=${options.page}`
        }

        console.log('API uri', uri);

        const response = await api().get(uri);
        console.log('API', response);

        return response.data;
    },

    async update(data){
        // Normalize the data for submission to backend
        const formData = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            email2: data.email2,
            contact_number: data.contactNumber,
            customer_type: data.customerType,
            status: data.status,
            street1: data.street1,
            street2: data.street2,
            suburb: data.suburb,
            state: data.state,
            postcode_id: data.postcodeId,
        }


        await Csrf.getCSRFCookie();

        const response = await api().put(`/api/contacts/${data.id}`, formData);

        return response.data.data;

    },
    async create(data){

        const formData = nomalizeData(data);

        await Csrf.getCSRFCookie();

        const response = await api().post('/api/contacts', formData);

        return response.data.data;
    },

    async delete(id){

        await Csrf.getCSRFCookie();

        const response = await api().delete(`/api/contacts/${id}`);

        return response.data.data;
    }


}

export default SalesContactAPI;