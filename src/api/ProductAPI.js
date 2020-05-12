
import api from "./api";

const ProductAPI = {

    async getProducts(){

        const uri = '/api/products';

        const response = await api().get(uri);

        return response.data;
    }

}

export default ProductAPI;