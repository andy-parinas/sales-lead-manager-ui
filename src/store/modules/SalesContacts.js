
import SalesContactAPI from "../../api/SalesContactAPI";

export default {
    namespaced: true,

    state: {
        salesContacts: [],
        pagination: {},
        selectedContact: null
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
        setSalesContactPagination(state, pagination){
            state.pagination = Object.assign({}, pagination);
        },
        addSalesContact(state, contact){
            state.salesContacts.push(contact);
        },
        setSelectedContact(state, contact){
            state.selectedContact = contact;
        }
    },
    actions: {
        async fetchSalesContacts({commit}, {options, searchOptions}){
            const response = await SalesContactAPI.getContacts(options, searchOptions);
            const contacts = response.data;
            console.log('Actions', response)

            commit('setSalesContacts', contacts);
            commit('setSalesContactPagination', response.pagination);
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

            commit('setSalesContacts', updatedContacts);

        },
        async createSalesContact({commit, state}, newContact){

            const createdContact = await SalesContactAPI.create(newContact);
            const newMeta = {
                ...state.pagination,
                total: state.pagination.total + 1,
            }

            commit('addSalesContact', createdContact);
            commit('setSalesContactPagination', newMeta);

        },
        async deleteSalesContact({state, commit}, contactId){
            const deletedContact = await SalesContactAPI.delete(contactId);

            const contacts = state.salesContacts.filter(contact => contact.id !== deletedContact.id);
            const newMeta = {
                ...state.pagination,
                total: state.pagination.total - 1,
            }

            commit('setSalesContacts', contacts);
            commit('setSalesContactPagination', newMeta);

        },
        selectContact({commit}, contact){
            commit('setSelectedContact', contact)
        }
    }
}