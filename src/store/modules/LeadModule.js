import LeadAPI from "../../api/LeadAPI";


export default {
    namespaced: true,
    state: {
        leads: [],
        meta: {},
        lead: null
    },
    mutations: {
        setLeads(state, leads){
            state.leads = leads;
        },
        setMeta(state, meta){
            state.meta = meta;
        },

        setLead(state, lead){
            state.lead = lead;
        }
    },
    actions: {
        async fetchLeads({commit}, {options, searchOptions}){
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

        },

        async fetchSingleLead({commit}, leadId)
        {
            const lead = await LeadAPI.getSingleLead(leadId);

            commit('setLead', lead);

        },
        clearLeadObject({commit}){
            commit('setLead', null);
        },

        async createLead({commit}, formData){
            const response = await  LeadAPI.createLead(formData);

            commit('setLead', response.data);
            console.log(response);
        },

         async updateLeadDetails({commit}, formData){
            const response = await LeadAPI.updateLeadDetails(formData);

            commit('setLead', response.data);
        }

    }
}