import UsersAPI from "../../api/UsersAPI";


export default {
    namespaced: true,
    state: {
        users: [],
        pagination: {},
    },
    mutations: {
        setUsers(state, users){
            state.users = users;
        },
        setPagination(state, pagination){
            state.pagination = Object.assign({}, pagination)
        }
    },
    
    actions: {
        async getUsers({commit}){
            const response = await UsersAPI.getUsers();

            const users = response.data;
            const pagination = response.pagination;

            console.log('Actions', response)

            commit('setUsers', users);
            commit('setPagination', pagination);
        }
    }
}