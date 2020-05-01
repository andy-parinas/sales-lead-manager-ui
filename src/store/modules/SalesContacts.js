
import SalesContact from "../../api/SalesContact";

export default {
    namespaced: true,

    state: {
        salesContacts: [],
        meta: {}
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
        setSalesContactMeta(state, meta){
            state.meta = meta;
        },
        addSalesContact(state, contact){
            state.salesContacts.push(contact);
        }
    },
    actions: {
        async fetchSalesContacts({commit}, {options, searchOptions}){
            const data = await SalesContact.getContacts(options, searchOptions);
            const contacts = data.data;

            const meta = {
                total: data.total,
                currentPage: data.current_page,
                lastPage: data.last_page,
                perPage: data.per_page
            }

            commit('setSalesContacts', contacts);
            commit('setSalesContactMeta', meta);
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

        },
        async createSalesContact({commit}, newContact){

            const createdContact = await SalesContact.create(newContact);

            console.log('CreatedActions', createdContact);

            commit('addSalesContact', createdContact)
        }
    }
}