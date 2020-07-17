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
        },

        insertTradeStaff(state, staff){
            state.tradeStaffs.push(staff);
        },

        removeTradeStaff(state, staff){
            const updatedStaffs = state.tradeStaffs.filter(s => s.id !== staff.id);

            return state.tradeStaffs = updatedStaffs;
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
        },

        async createTradeStaff({commit}, formData){

            const response = await TradeStaffAPI.create(formData);

            commit('insertTradeStaff', response.data);
        },

        async deleteTradeStaff({commit}, tradeStaffId){

            const response = await TradeStaffAPI.delete(tradeStaffId);

            commit('removeTradeStaff', response.data);
        }

    }
}