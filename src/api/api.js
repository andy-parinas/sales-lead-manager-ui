import axios from 'axios';

const api = () => axios.create({
        baseURL: "http://homestead.test",
        withCredentials: true
    })

// api.defaults.withCredentials = true
//baseURL: "http://homestead.test",
//baseURL: "http://tplus.com.au"
export default api;