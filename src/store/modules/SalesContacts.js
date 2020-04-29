
import SalesContact from "../../api/SalesContact";

export default {
    namespaced: true,

    state: {
        salesContacts: []
    },
    getters: {
        getSalesContactById(state){
            // return id => {
            //     return state.salesContacts.find(contact => contact.id === id);
            // }
            return id => state.salesContacts.find(contact => contact.id === id);
        }
    },
    mutations: {
        setSalesContacts(state, contacts ){
            state.salesContacts = contacts;
        },
    },
    actions: {
        async fetchSalesContacts({commit}, options){
            const contacts = await SalesContact.getAll(options);

            commit('setSalesContacts', contacts);
        },
        async updateSalesContact({commit, state}, updates){
            const newContact = await SalesContact.update(updates);

            const updatedContacts = state.salesContacts.map(contact => {
                    if(contact.id === newContact.id){
                        return newContact
                    }else {
                        return contact
                    }
            })

            console.log('Inside Actions', updatedContacts);

            commit('setSalesContacts', updatedContacts);

        }
    }
}