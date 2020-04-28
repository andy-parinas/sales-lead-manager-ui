import api from "./api";
import Utils from "../helpers/Utils";

const SalesContact = {

    async getAll(options){
        console.log(options);

        const size = options.itemsPerPage ? options.itemsPerPage : 10;

        let uri = '/api/contacts?size=' + size;

        if (options.sortBy.length > 0){
            const field = Utils.camelToSnake(options.sortBy[0])
            const direction = options.sortDesc[0] ? 'desc' : 'asc';

            uri = uri + `&sort=${field}&direction=${direction}`
        }

        if (options.page){
            uri = uri + `&page=${options.page}`
        }

        console.log(uri)

        const response = await api().get(uri);

        console.log(response);

        return response.data.data;
    }


}

export default SalesContact;