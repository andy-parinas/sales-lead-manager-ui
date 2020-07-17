import Auth from "@/api/Auth";


export default {
    namespaced: true,
    state: {
        currentUser: {},
        usersFranchises: []
    },

    mutations: {
        setCurrentUser(state, user){
            state.currentUser = user;
        },
        setFranchises(state, franchises){
            state.usersFranchises = franchises;
        }
    },

    actions: {
        async login({commit}, loginData){
            const response = await Auth.login(loginData)

            console.log('login actions', response.data);
            const franchises = response.data.franchises;

            const data = response.data.data;
            const user = {
                id: data.id,
                name: data.name,
                userType: data.user_type,
                email: data.email,
                username: data.username
            }


            localStorage.setItem('auth-user', JSON.stringify(user));
            localStorage.setItem('user-franchises', JSON.stringify(franchises));
            commit('setCurrentUser', user);
            commit('setFranchises', franchises);
        },

        async logout({commit, dispatch}){
            dispatch('setAppLoadingState', true, {root:true})

            const response = await Auth.logout();

            if(response){
                localStorage.removeItem('auth-user');
                localStorage.removeItem('user-franchises');
                commit('setCurrentUser', {});
                commit('setFranchises', []);
                dispatch('clearAllState', null, {root: true})

            }
            dispatch('setAppLoadingState', false, {root: true})

        },

        getUserFromStorage({commit}){
            const user = localStorage.getItem('auth-user');
            const franchises = localStorage.getItem('user-franchises')
            if(user){
                commit('setCurrentUser',  JSON.parse(user))
            }

            if (franchises){
                commit('setFranchises', JSON.parse(franchises));
            }
        }
    }
}