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
        },
        insertSalesStaff(state, staff){
            state.salesStaffs.push(staff);
        },
        deleteSalesStaff(state, staff){

            const updatedStaffs = state.salesStaffs.filter(s => s.id !== staff.id);

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

        },

        async createSalesStaff({commit}, formData){

            const response = await SalesStaffAPI.create(formData);

            commit('insertSalesStaff', response.data);
        },

        async deleteSalesStaff({commit}, salesStaffId){

            const response = await SalesStaffAPI.deleteStaff(salesStaffId);

            commit('deleteSalesStaff', response.data);
        }

    }
}