import LeadAPI from "../../api/LeadAPI";


export default {
    namespaced: true,
    state: {
        leads: [],
        meta: {}
    },
    mutations: {
        setLeads(state, leads){
            state.leads = leads;
        },
        setMeta(state, meta){
            state.meta = meta;
        }
    },
    actions: {
        async fetchLeads({commit}, {options, searchOptions}){

            console.log('Fetch Leads Actions');
            const response = await LeadAPI.getLeads(options, searchOptions);

            const leads = response.data;
            const meta = {
                total: response.total,
                currentPage: response.current_page,
                lastPage: response.last_page,
                perPage: response.per_page
            }

            commit('setLeads', leads);
            commit('setMeta', meta);

        }

    }
}