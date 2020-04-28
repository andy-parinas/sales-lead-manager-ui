
import SalesContact from "../../api/SalesContact";

export default {
    namespaced: true,

    state: {
        salesContacts: []
    },
    mutations: {
        setSalesContacts(state, contacts ){
            state.salesContacts = contacts;
        }
    },
    actions: {
        async fetchSalesContacts({commit}){
            const contacts = await SalesContact.getAll();

            commit('setSalesContacts', contacts);
        }
    }
}