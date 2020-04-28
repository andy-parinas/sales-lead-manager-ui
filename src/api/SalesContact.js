import api from "./api";


const SalesContact = {

    async getAll(){

        const response = await api().get('/api/contacts');

        return response.data.data;
    }


}

export default SalesContact;