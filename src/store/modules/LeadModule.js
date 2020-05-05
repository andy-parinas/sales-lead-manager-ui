import LeadAPI from "../../api/LeadAPI";


export default {
    namespaced: true,
    state: {
        leads: []
    },
    mutations: {
        setLeads(state, leads){
            state.leads = leads;
        }
    },
    actions: {
        async fetchLeads({commit}, {options, searchOptions}){

            console.log('Fetch Leads Actions');
            const leads = await LeadAPI.getLeads(options, searchOptions);

            commit('setLeads', leads);

        }

    }
}