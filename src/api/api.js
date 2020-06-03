import axios from 'axios';

const api = () => axios.create({
        baseURL: "http://tplus.com.au",
        withCredentials: true
    })

// api.defaults.withCredentials = true
//baseURL: "http://homestead.test",
export default api;