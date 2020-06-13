import SalesStaffAPI from "../../api/SalesStaffAPI";


export default {

    namespaced: true,
    state: {
        salesStaffs: [],
        pagination: {}
    },
    mutations: {
        setSalesStaffs(state, staffs){
            state.salesStaffs = staffs;
        },

        setPagination(state, pagination){
            state.pagination = pagination
        }
    },
    actions: {

        async fetchAllSalesStaff({commit}, {pageOptions, searchOptions}){
            const response = await SalesStaffAPI.getAllSalesStaff(pageOptions, searchOptions)

            commit('setSalesStaffs', response.data);
            commit('setPagination', response.pagination)
        }

    }
}