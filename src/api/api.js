import axios from 'axios';

export const baseUrl ="http://homestead.test"
// export const baseUrl ="http://tplus.com.au"
// export const baseUrl ="http://api.spanline.com.au"

export const frontEndUrl = "http://app.homestead.test:8080"

const api = () => axios.create({
        baseURL: baseUrl,
        withCredentials: true
    })

// api.defaults.withCredentials = true
//baseURL: "http://homestead.test",
//baseURL: "http://tplus.com.au"
export default api;