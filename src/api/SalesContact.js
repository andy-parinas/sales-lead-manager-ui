import api from "./api";
import Csrf from './csrf';

import Utils from "../helpers/Utils";

const SalesContact = {

    async getAll(options){
        console.log(options);

        const size = options.itemsPerPage ? options.itemsPerPage : 10;

        let uri = '/api/contacts?size=' + size;

        if (options.sortBy.length > 0){
            const field = Utils.camelToSnake(options.sortBy[0])
            const direction = options.sortDesc[0] ? 'desc' : 'asc';

            uri = uri + `&sort=${field}&direction=${direction}`
        }

        if (options.page){
            uri = uri + `&page=${options.page}`
        }

        console.log(uri)

        const response = await api().get(uri);

        console.log(response);

        return response.data.data;
    },
    async update(data){
        // Normalize the data for submission to backend
        const formData = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            email2: data.email2,
            contact_number: data.contactNumber,
            // street1: data.street1,
            // street2: data.street2,
            // suburb: data.suburb,
            // state: data.state,
            // postcode: data.postcode,
        }

        console.log('From the API', data);

        await Csrf.getCSRFCookie();

        const response = await api().put(`/api/contacts/${data.id}`, formData);

        return response.data.data;

    }


}

export default SalesContact;