

function currency(value) {
    const amt = Number(value)
    return amt && amt.toLocaleString(undefined, {maximumFractionDigits:2}) || '0'
}

function formatContent(item, type) {

    switch (type) {
        case 'string':
            return item;

        case 'integer':
            return item;

        case 'currency':
            return currency(item)

        case 'percentage':
            return `${ Math.round(item)} %`

        default:
            return item;
    }
}


const DocDefinitionContentCreator = {

    createTable(header, content){

        return new Promise((resolve, reject) =>{

            if(!Array.isArray(header)) reject("Header must be an array");
            if(header.length === 0) reject("Header must contain elements");
            if(!Array.isArray(content)) reject("Content must be an array");

            const body = [];
            const headerColumns = header.map(head => {
                return head.title
            })

            body.push(headerColumns);

            content.map(item => {
                const row = []
                header.map(head => {

                    const column = {
                        text: formatContent(item[head.name], head.type),
                        alignment: head.type === 'string'? 'left' : 'right'
                    }
                    row.push(column)
                })

                body.push(row);
            })

            resolve(body);
        })
    }


}

export default DocDefinitionContentCreator;