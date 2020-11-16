import {URIBuilder} from "./helpers";
import api from "./api";
import csrf from "./csrf";


const SalesStaffAPI = {

    async getAllSalesStaff(pageOptions, searchOptions){

        const requestUri = '/api/sales-staffs';

        const uri = URIBuilder.build(requestUri, pageOptions, searchOptions);

        const response = await api().get(uri);

        return response.data;


    },

    async findSalesStaffById(salesStaffId){

        const uri = `/api/sales-staffs/${salesStaffId}`

        const response = await api().get(uri);

        return response.data

    },

    async update(formData){

        const uri = `/api/sales-staffs/${formData.id}`

        const data = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            contact_number: formData.contactNumber,
            sales_phone: formData.salesPhone,
            franchises: formData.franchises,
            status: formData.status,
        }

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;


    },


    async search(search){

        const uri = `/api/sales-staffs/search?search=${encodeURIComponent(search)}`;

        const response = await api().get(uri);


        return response.data;
    },

    async create(formData){
        const uri = `/api/sales-staffs`

        const data = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            contact_number: formData.contactNumber,
            sales_phone: formData.salesPhone,
            franchises: formData.franchises,
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

    },

    async getSalesStaff(staffId){
        const uri = `/api/sales-staffs/${staffId}`

        const response = await api().get(uri);

        return response.data;

    }

}

export default SalesStaffAPI;