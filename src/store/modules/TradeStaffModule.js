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
        }
    },
    actions: {

        async getAllTradeStaffs({commit}, {pageOptions, searchOptions}){

            const response = await TradeStaffAPI.getAll(pageOptions, searchOptions);

            commit('setTradeStaffs', response.data);
            commit('setPagination', response.pagination);
        }

    }
}