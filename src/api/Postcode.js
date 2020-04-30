import api from "./api";
// import csrf from "./csrf";

const Postcode = {

    async search(value){
        const uri = '/api/postcodes?search=' + encodeURIComponent(value)

        const response = await api().get(uri);

        return response.data.data;
    }
}

export default Postcode;