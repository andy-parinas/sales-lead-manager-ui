import {URIBuilder} from "./helpers";
import api from "./api";
import csrf from "./csrf";


const SalesStaffAPI = {

    async getAllSalesStaff(pageOptions, searchOptions){

        const requestUri = '/api/sales-staffs';

        const uri = URIBuilder.build(requestUri, pageOptions, searchOptions);

        console.log('api', uri)

        const response = await api().get(uri);

        return response.data;


    },

    async update(formData){

        const uri = `/api/sales-staffs/${formData.id}`

        const data = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            contact_number: formData.contactNumber,
            franchise_id: formData.franchiseId,
            status: formData.status,
        }

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;


    },

    async create(formData){
        const uri = `/api/sales-staffs`

        const data = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            contact_number: formData.contactNumber,
            franchise_id: formData.franchiseId,
            status: formData.status,
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);

        return response.data;
    },

    async deleteStaff(staffId){
        const uri = `/api/sales-staffs/${staffId}`

        await csrf.getCSRFCookie();

        const response = await api().delete(uri);

        return response.data;

    }

}

export default SalesStaffAPI;