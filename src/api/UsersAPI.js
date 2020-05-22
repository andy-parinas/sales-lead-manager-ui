import api from "./api";


const UsersAPI = {

    async getUsers() {
        const uri = '/api/users';

        const response = await api().get(uri);

        console.log(response.data)

        return response.data;

    }


}

export  default UsersAPI