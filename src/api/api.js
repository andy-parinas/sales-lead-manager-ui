import axios from 'axios';

export const baseUrl ="http://homestead.test"
// export const baseUrl ="http://tplus.com.au"
// export const baseUrl ="http://api.spanline.com.au"

export const frontEndUrl = "http://app.homestead.test:8080"
// export const frontEndUrl = "http://ezitask.spanline.com.au"

const api = () => axios.create({
        baseURL: baseUrl,
        withCredentials: true
    })

// api.defaults.withCredentials = true
//baseURL: "http://homestead.test",
//baseURL: "http://tplus.com.au"
export default api;