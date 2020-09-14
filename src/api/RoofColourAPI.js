import api from "@/api/api";


const RoofColourAPI = {

    async getRoofColours(){

        const uri = '/api/roof-colours';

        const response = await api().get(uri);


        return response.data


    }


}

export default RoofColourAPI;