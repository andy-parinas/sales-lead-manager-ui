import UsersAPI from "../../api/UsersAPI";


export default {
    namespaced: true,
    state: {
        users: [],
        pagination: {},
        selectedUser: null,
        franchises: [],
        franchisePagination: null
    },
    mutations: {
        setUsers(state, users){
            state.users = users;
        },
        setPagination(state, pagination){
            state.pagination = Object.assign({}, pagination)
        },
        setSelectedUser(state, user){
            state.selectedUser = Object.assign({}, user)
        },
        updateUserInUsers(state, updatedUser){

            const updatedUsers = state.users.map(user => {
                if(updatedUser.id === user.id){
                    return updatedUser
                }else {
                    return user
                }
            })

            state.users = updatedUsers;
        },
        setUsersFranchises(state, franchises){
            state.franchises = franchises;
        },
        setUsersFranchisesPagination(state, pagination){
            state.franchisePagination = pagination;
        }
    },
    
    actions: {
        async getUsers({commit}, options){

            const response = await UsersAPI.getUsers(options.pageOptions, options.searchOptions);

            const users = response.data;
            const pagination = response.pagination;

            console.log('Actions', response)

            commit('setUsers', users);
            commit('setPagination', pagination);
        },
        async updateUser({commit}, userUpdates){

            const response = await UsersAPI.updateUser(userUpdates);

            commit('updateUserInUsers', response.data);

        },
        async createUser(context, userData){

             const response = await UsersAPI.createUser(userData);

             console.log(response.data);

        },

        async getUsersFranchises({commit}, userOptions){

            const response = await UsersAPI.getUsersFranchises(userOptions.userId,
                userOptions.pageOptions, userOptions.searchOptions)

            console.log(response.data)
            console.log(response.pagination)
            commit('setUsersFranchises', response.data);
            commit('setUsersFranchisesPagination', response.pagination)
        },

        clearUsersFranchisesData({commit}){
            commit('setUsersFranchises', []);
            commit('setUsersFranchisesPagination', null)
        },
        selectUser({commit}, user){
            commit('setSelectedUser', user)
        },



    }
}