import api from './api';
import Csrf from './csrf';

export default {

    async login(loginData) {
        await Csrf.getCSRFCookie();

        return api().post('/api/login', loginData);
    },

    async logout(){
        await Csrf.getCSRFCookie();

        return api().post('/api/logout');
    }
}