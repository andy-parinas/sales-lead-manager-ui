import api from "./api";

import {URIBuilder} from "./helpers";
import csrf from "./csrf";


const UsersAPI = {

    async getUsers(pageOptions, searchOptions) {

        let requestUri = '/api/users';

        const uri = URIBuilder.build(requestUri, pageOptions, searchOptions)

        const response = await api().get(uri);

        console.log(response.data)

        return response.data;

    },

    async updateUser(userUpdates){
        const uri = `/api/users/${userUpdates.id}`;

        const data = {
            name: userUpdates.name,
            username: userUpdates.username,
            email: userUpdates.email,
            user_type: userUpdates.userType
        }

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;
    }


}

export  default UsersAPI