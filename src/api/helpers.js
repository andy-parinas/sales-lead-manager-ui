// import Utils from "../helpers/Utils";


export const URIBuilder = {

    build: (requestURI, options, searchOptions ) => {

        const size = options.itemsPerPage ? options.itemsPerPage : 10;

        let uri = `${requestURI}?size=${size}`;

        if (options.sortBy.length > 0){
            const field = options.sortBy[0]
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
        }

        return uri;
    }

}