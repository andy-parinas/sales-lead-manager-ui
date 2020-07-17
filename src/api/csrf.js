import api from "./api";

const getCookie = (key) => {
    let value = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key)
        .replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null

    if(value && value.substring(0,1) === "{" && value.substring(value.length-1,value.length) === "}") {
        try {
            value = JSON.parse(value)
        }catch (e) {
            return value;
        }
    }
    return value;
}

export default {

    getCSRFCookie(){
        let token = getCookie("XSRF-TOKEN");

        if(token){
            return new Promise(resolve => {
                resolve(token);
            })
        }

        return api().get('/sanctum/csrf-cookie');
    }
}