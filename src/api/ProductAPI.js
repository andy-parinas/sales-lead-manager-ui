
import api from "./api";
import csrf from "@/api/csrf";

const ProductAPI = {

    async getProducts(){

        const uri = '/api/products';

        const response = await api().get(uri);

        return response.data;
    },

    async createProduct(formData){

        const uri = '/api/products';

        const data= {
            name: formData.name,
            description: formData.description
        }

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);

        return response.data


    },

    async updateProduct(productId, formData){

        const uri = `/api/products/${productId}`;

        const data = {
            name: formData.name,
            description: formData.description
        }


        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data


    },

    async deleteProduct(productId){

        const uri = `/api/products/${productId}`;

        await csrf.getCSRFCookie();

        const response = await api().delete(uri);

        return response.data

    }

}

export default ProductAPI;