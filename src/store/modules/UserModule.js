import UsersAPI from "../../api/UsersAPI";
import FranchiseAPI from "../../api/FranchiseAPI";


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
        },
        addUsersFranchise(state, franchise){
            state.franchises.push(franchise)
        },
        removeUsersFranchise(state, franchise){
            const updatedFranchise = state.franchises.filter(f => f.id !== franchise.id)
            state.franchises = updatedFranchise;
        },
        removeUser(state, userId){
            const updatedUsers = state.users.filter(u => u.id !== userId);
            state.users = updatedUsers;
        }
    },
    
    actions: {
        async getUsers({commit}, options){

            const response = await UsersAPI.getUsers(options.pageOptions, options.searchOptions);

            const users = response.data;
            const pagination = response.pagination;


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

        async attachFranchise({commit}, payload){

            const response = await FranchiseAPI.attachUsersFranchise(payload.userId, payload.franchiseId);

            commit('addUsersFranchise', response.data);
        },

        async detachFranchise({commit}, {userId, franchiseId}){

            const response = await UsersAPI.detachFranchise(userId, franchiseId);

            commit('removeUsersFranchise', response.data);
        },

        async deleteUser({commit}, userId){

            await UsersAPI.deleteUser(userId);

            commit('removeUser', userId);
        }

    }
}