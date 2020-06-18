import TradeStaffAPI from "../../api/TradeStaffApi";


export default {
    namespaced: true,
    state: {
        tradeStaffs: [],
        pagination: {}
    },
    mutations: {
        setTradeStaffs(state, staffs){
            state.tradeStaffs = staffs;
        },

        setPagination(state, pagination){
            state.pagination = pagination
        },

        updateTradeStaff(state, staff){
            const updatedStaffs = state.tradeStaffs.map(s => {
                if(s.id === staff.id){
                    return staff;
                }else {
                    return s;
                }
            })

            state.tradeStaffs = updatedStaffs;
        }
    },
    actions: {

        async getAllTradeStaffs({commit}, {pageOptions, searchOptions}){

            const response = await TradeStaffAPI.getAll(pageOptions, searchOptions);

            commit('setTradeStaffs', response.data);
            commit('setPagination', response.pagination);
        },

        async updateTradeStaff({commit}, formData){

            const response = await TradeStaffAPI.update(formData);

            commit('updateTradeStaff', response.data);
        }

    }
}