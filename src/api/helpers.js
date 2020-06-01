import Utils from "../helpers/Utils";


export const URIBuilder = {

    build: (requestURI, options, searchOptions ) => {

        const size = options.itemsPerPage ? options.itemsPerPage : 10;

        let uri = `${requestURI}?size=${size}`;

        if (options.sortBy && options.sortBy.length > 0){
            const field = Utils.camelToSnake(options.sortBy[0])
            const direction = options.sortDesc[0] ? 'desc' : 'asc';

            uri = uri + `&sort=${field}&direction=${direction}`
        }

        if (options.page){
            uri = uri + `&page=${options.page}`
        }

        if (searchOptions && searchOptions.searchFor && searchOptions.searchIn){
            if(searchOptions.searchFor.trim() !== '' && searchOptions.searchIn.trim() !== ''){
                uri = uri + `&search=${encodeURIComponent(searchOptions.searchFor)}&on=${searchOptions.searchIn}`;
            }
        }else if (searchOptions && searchOptions.searchFor){
            if(searchOptions.searchFor.trim() !== ''){
                uri = uri + `&search=${encodeURIComponent(searchOptions.searchFor)}`;
            }
        }

        return uri;
    }

}