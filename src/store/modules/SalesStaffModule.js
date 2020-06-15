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
        },

        updateSalesStaffs(state, staff){
            const updatedStaffs = state.salesStaffs.map(s => {
                if(s.id === staff.id){
                    return staff
                }else {
                    return s;
                }
            })

            state.salesStaffs = updatedStaffs;
        }
    },
    actions: {

        async fetchAllSalesStaff({commit}, {pageOptions, searchOptions}){
            const response = await SalesStaffAPI.getAllSalesStaff(pageOptions, searchOptions)

            commit('setSalesStaffs', response.data);
            commit('setPagination', response.pagination)
        },

        async updateSalesStaff({commit}, formData){
            const response = await SalesStaffAPI.update(formData);

            commit('updateSalesStaffs', response.data);

        }

    }
}