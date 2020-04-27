import axios from 'axios';

const api = () => axios.create({
        baseURL: "http://homestead.test",
        withCredentials: true
    })

// api.defaults.withCredentials = true

export default api;