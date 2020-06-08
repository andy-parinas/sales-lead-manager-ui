import api from "./api";


const DocumentAPI = {

    async getDocuments(leadId, pageOption){
        const uri = `/api/leads/${leadId}/documents`;

        console.log(pageOption)

        const response = await api().get(uri)

        return response.data
    }

}

export default DocumentAPI;