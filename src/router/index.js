import Vue from 'vue';
import VueRouter from 'vue-router';

import MainPage from '../views/MainPage';
import Login from '../views/Login';

Vue.use(VueRouter);

// const authenticated = false;

function isLoggedIn() {
    return localStorage.getItem("auth-user");
}

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if(isLoggedIn()){
                next({name: 'dashboard'})
            }else {
                next();
            }
        }
    },
    {
        path: '/',
        component: MainPage,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
                meta: {requiresAuth: true}
        
            },
            {
                path: 'franchise',
                name: 'franchise',
                component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Franchise.vue"),
                meta: {requiresAuth: true}

            },
            {
                path: 'lead',
                name: 'lead',
                component: () => import(/* webpackChunkName: "leadMain" */ "@/views/leads/LeadMainView.vue"),
                meta: {requiresAuth: true},
                children: [
                    {
                        path: '',
                        name: 'LeadTable',
                        component: () => import(/* webpackChunkName: "leadTable" */ "@/views/leads/LeadTableView.vue"),
                        meta: {requiresAuth: true},
                    },
                    {
                        path: 'create',
                        name: 'LeadCreate',
                        component: () => import(/* webpackChunkName: "leadTable" */ "@/views/leads/LeadCreateView.vue"),
                        meta: {requiresAuth: true},
                    }
                ]
            },
            {
                path: 'sales-contact',
                name: 'sales-contact',
                component: () => import(/* webpackChunkName: "dashboard" */ "@/views/PageSalesContact.vue"),
                meta: {requiresAuth: true}
        
            },
            {
                path: 'admin',
                name: 'AdminPage',
                component: () => import(/* webpackChunkName: "adminPage" */ "@/views/admin/AdminPage.vue"),
                meta: {requiresAuth: true},
                children: [
                    {
                        path: 'users',
                        name: 'UsersAdmin',
                        component: () => import(/* webpackChunkName: "usersAdmin" */"@/views/admin/UsersAdminPage.vue"),
                        meta: {requiresAuth: true}
                    },
                    {
                        path: 'postcodes',
                        name: 'PostcodeAdmin',
                        component: () => import(/* webpackChunkName: "postcodeAdmin" */"@/views/admin/PostcodeAdminPage.vue"),
                        meta: {requiresAuth: true}
                    },
                    {
                        path: 'products',
                        name: 'ProductAdmin',
                        component: () => import(/* webpackChunkName: "productAdmin" */"@/views/admin/ProductAdminPage.vue"),
                        meta: {requiresAuth: true}
                    },
                    {
                        path: 'trade-types',
                        name: 'TradeTypeAdmin',
                        component: () => import(/* webpackChunkName: "tradeTypeAdmin" */"@/views/admin/TradeTypeAdminPage.vue"),
                        meta: {requiresAuth: true}
                    }
                ]
            }
        ],

    }
];


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});



router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn()){
        next({name: 'login'})
    }else {
        next();
    }
})

export default router;