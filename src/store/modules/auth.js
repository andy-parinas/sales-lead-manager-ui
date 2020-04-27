import Auth from "@/api/Auth";


export default {
    namespaced: true,
    state: {
        currentUser: {}
    },

    mutations: {
        setCurrentUser(state, user){
            state.currentUser = user;
        }
    },

    actions: {
        async login({commit}, loginData){
            const response = await Auth.login(loginData)
            const data = response.data.data;
            const user = {
                id: data.id,
                name: data.name,
                userType: data.user_type,
                email: data.email,
                username: data.username
            }


            localStorage.setItem('auth-user', user.username);
            commit('setCurrentUser', user);
        },

        async logout({commit}){
            const response = await Auth.logout();

            if(response){
                localStorage.removeItem('auth-user');
                commit('setCurrentUser', {});
            }
        }
    }
}