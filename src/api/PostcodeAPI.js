import api from "./api";
// import csrf from "./csrf";

const PostcodeAPI = {

    async search(value){
        const uri = '/api/postcodes?search=' + encodeURIComponent(value)

        const response = await api().get(uri);

        return response.data.data;
    },


    async getFranchisePostcodes(franchiseId){
        const uri = `/api/franchises/${franchiseId}/postcodes`;

        const response = await api().get(uri);

        return response.data;
    }
}

export default PostcodeAPI;