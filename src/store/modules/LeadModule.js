import LeadAPI from "../../api/LeadAPI";
import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        leads: [],
        meta: {},
        lead: null,
        pageOptions: {
            page: 1,
            itemsPerPage: 10,
            sortBy: ['leadDate'],
            sortDesc: [true],
            groupBy: [],
            groupDesc: [],
            mustSort: false,
            multiSort: false
        },
        newLeads: []
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
        },
        updateLeads(state, updateInfo){
            Vue.set(state.leads, updateInfo.index, updateInfo.lead)
        },
        insertToLeads(state, lead) {
            state.newLeads.push(lead)
        },
        changePageOptions(state, options){
            state.pageOptions = Object.assign({}, options)
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

            const lead = response.data;

            commit('setLead',lead);
            //dispatch('insertToLeads', lead)
        },

        async deleteLead(context, leadId){
            await LeadAPI.deleteLead(leadId);
        },

         async updateLeadDetails({commit, dispatch}, formData){
            const response = await LeadAPI.updateLeadDetails(formData);

             const lead = response.data;

             commit('setLead', lead);
             dispatch('updateLeadsArray', lead);
        },

        async updateLeadJobType({commit, state, dispatch}, formData){
            const leadId = state.lead.details.id
            const response = await  LeadAPI.updateJobType(leadId, formData);

            const lead = response.data;

            commit('setLead', lead);
            dispatch('updateLeadsArray', lead);
        },

        async updateLeadAppointment({commit,state, dispatch}, formData){
            const leadId = state.lead.details.id
            const response = await LeadAPI.updateAppointment(leadId, formData);

            const lead = response.data;

            commit('setLead', lead);
            dispatch('updateLeadsArray', lead);
        },

        updateLeadsArray({state, commit}, lead){

            const leadObject = {
                contactNumber: lead.details.contactNumber,
                created_at: lead.details.created_at,
                email: lead.details.email,
                firstName: lead.details.firstName,
                franchiseNumber: lead.details.franchiseNumber,
                lastName: lead.details.lastName,
                leadDate: lead.details.leadDate,
                leadId: lead.details.id,
                leadNumber: lead.details.leadNumber,
                outcome: lead.appointment.outcome,
                postcode: lead.details.postcode,
                source: lead.details.leadSource,
                state: lead.details.state,
                suburb: lead.details.suburb,
                postcodeStatus: lead.details.postcodeStatus
            }

            let index = state.leads.findIndex(l => l.leadId === leadObject.leadId)

            if(index !== -1){
                commit('updateLeads' , {index: index, lead: leadObject})
            }

        },

        insertToLeads({commit}, lead){

            const newLead = {
                contactNumber: lead.details.contactNumber,
                created_at: lead.details.created_at,
                email: lead.details.email,
                firstName: lead.details.firstName,
                franchiseNumber: lead.details.franchiseNumber,
                lastName: lead.details.lastName,
                leadDate: lead.details.leadDate,
                leadId: lead.details.id,
                leadNumber: lead.details.leadNumber,
                outcome: lead.appointment.outcome,
                postcode: lead.details.postcode,
                source: lead.details.leadSource,
                state: lead.details.state,
                suburb: lead.details.suburb,
                postcodeStatus: lead.details.postcodeStatus,
                isNew: true
            }

            commit('insertToLeads', newLead)
        },

        changePageOptions({commit}, options){
            commit('changePageOptions', options)
        }

    }
}