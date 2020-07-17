import api from './api';
import Csrf from './csrf';

export default {

    async login(loginData) {
        await Csrf.getCSRFCookie();

        const response =  await api().post('/api/login', loginData);

        console.log('AuthAPI', response);

        return response;
    },

    async logout(){
        await Csrf.getCSRFCookie();

        return api().post('/api/logout');
    }
}