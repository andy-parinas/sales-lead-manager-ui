import api from "./api";

const DesignAssessorAPI = {

    async search(searchString){

        const uri = `/api/design-assessors?search=${searchString}`;

        const response = await api().get(uri);

        return response.data;
    }

}

export default DesignAssessorAPI;