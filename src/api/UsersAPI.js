import api from "./api";

import {URIBuilder} from "./helpers";
import csrf from "./csrf";


const UsersAPI = {

    async getUsers(pageOptions, searchOptions) {

        let requestUri = '/api/users';

        const uri = URIBuilder.build(requestUri, pageOptions, searchOptions)

        const response = await api().get(uri);

        return response.data;

    },

    async createUser(userData){

        const uri = '/api/users';

        const data = {
            name: userData.name,
            username: userData.username,
            email: userData.email,
            user_type: userData.userType,
            password: userData.password,
            password_confirmation: userData.passwordConfirmation
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);

        return response.data;

    },

    async updateUser(userUpdates){
        const uri = `/api/users/${userUpdates.id}`;

        const data = {
            name: userUpdates.name,
            username: userUpdates.username,
            email: userUpdates.email,
            user_type: userUpdates.userType,
        }

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;
    },

    async updatePassword(userUpdates){

        const uri = `/api/users/${userUpdates.id}`;

        const data = {
            password: userUpdates.password,
            password_confirmation: userUpdates.passwordConfirmation
        }

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;
    },

    async getUsersFranchises(userId, pageOptions, searchOptions){

        const requesturi = `/api/users/${userId}/franchises`;

        const uri = URIBuilder.build(requesturi, pageOptions, searchOptions);

        const response = await api().get(uri);

        return response.data;
    },

    async detachFranchise(userId, franchiseId){

        const uri = `/api/users/${userId}/franchises/${franchiseId}`;

        await csrf.getCSRFCookie();

        const response = await api().delete(uri);

        return response.data;

    },

    async deleteUser(userId){

        const uri = `/api/users/${userId}`;


        await csrf.getCSRFCookie();

        const response = await api().delete(uri);

        return response;

    }

}

export  default UsersAPI