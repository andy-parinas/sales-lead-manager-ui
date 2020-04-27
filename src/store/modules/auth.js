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


            localStorage.setItem('auth-user', JSON.stringify(user));
            commit('setCurrentUser', user);
        },

        async logout({commit, dispatch}){
            dispatch('setAppLoadingState', true, {root:true})

            const response = await Auth.logout();

            if(response){
                localStorage.removeItem('auth-user');
                commit('setCurrentUser', {});
            }
            dispatch('setAppLoadingState', false, {root: true})

        },

        getUserFromStorage({commit}){
            const user = localStorage.getItem('auth-user');
            if(user){
                commit('setCurrentUser', JSON.parse(localStorage.getItem('auth-user')))
            }
        }
    }
}