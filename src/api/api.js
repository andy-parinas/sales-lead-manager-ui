import axios from 'axios';

export const baseUrl ="http://homestead.test"

const api = () => axios.create({
        baseURL: baseUrl,
        withCredentials: true
    })

// api.defaults.withCredentials = true
//baseURL: "http://homestead.test",
//baseURL: "http://tplus.com.au"
export default api;