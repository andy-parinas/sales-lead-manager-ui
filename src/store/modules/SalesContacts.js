
import SalesContactAPI from "../../api/SalesContactAPI";

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
            const response = await SalesContactAPI.getContacts(options, searchOptions);
            const contacts = response.data;

            const meta = {
                total: response.total,
                currentPage: response.current_page,
                lastPage: response.last_page,
                perPage: response.per_page
            }

            commit('setSalesContacts', contacts);
            commit('setSalesContactMeta', meta);
        },
        async updateSalesContact({commit, state}, updates){
            const newContact = await SalesContactAPI.update(updates);

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
        async createSalesContact({commit, state}, newContact){

            const createdContact = await SalesContactAPI.create(newContact);
            const newMeta = {
                ...state.meta,
                total: state.meta.total + 1,
            }

            commit('addSalesContact', createdContact);
            commit('setSalesContactMeta', newMeta);

        },
        async deleteSalesContact({state, commit}, contact){
            const deletedContact = await SalesContactAPI.delete(contact.id);

            const contacts = state.salesContacts.filter(contact => contact.id !== deletedContact.id);
            const newMeta = {
                ...state.meta,
                total: state.meta.total - 1,
            }

            commit('setSalesContacts', contacts);
            commit('setSalesContactMeta', newMeta);

        }
    }
}