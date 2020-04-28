import api from "./api";


const SalesContact = {

    async getAll(){

        const response = await api().get('/api/contacts');

        console.log(response);

        return response.data.data;
    }


}

export default SalesContact;