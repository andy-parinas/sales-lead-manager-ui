import api from "@/api/api";


const RoofSheetAPI = {

    async getRoofSheets(){

        const uri = '/api/roof-sheets';

        const response = await api().get(uri);

        return response.data;

    }

}

export default RoofSheetAPI;