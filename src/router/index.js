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
                component: () => import(/* webpackChunkName: "dashboard" */ "@/views/franchise/FranchiseListView.vue"),
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
                        component: () => import(/* webpackChunkName: "lead-create" */ "@/views/leads/LeadCreateView.vue"),
                        meta: {requiresAuth: true},
                    }
                ]
            },
            {
                path: 'reports',
                name: 'reports',
                component: () => import(/* webpackChunkName: "leadMain" */ "@/views/reports/ReportMainPage.vue"),
                meta: {requiresAuth: true},
                children: [
                    {
                        path: 'sales-summary',
                        name: 'SalesSummary',
                        component: () => import(/* webpackChunkName: "sales-summary" */ "@/views/reports/SalesStaffSummary.vue"),
                        meta: {requiresAuth: true},
                    },
                    {
                        path: 'product-sales-summary',
                        name: 'ProductSalesSummary',
                        component: () => import(/* webpackChunkName: "sales-summary" */ "@/views/reports/ProductSalesSummary.vue"),
                        meta: {requiresAuth: true},
                    },
                    {
                        path: 'sales_staff-products',
                        name: 'ProductSalesSummary',
                        component: () => import(/* webpackChunkName: "sales-staff-product-summary" */ "@/views/reports/SalesStaffProductSummary.vue"),
                        meta: {requiresAuth: true},
                    },
                    {
                        path: 'outcome-report',
                        name: 'OutcomeReport',
                        component: () => import(/* webpackChunkName: "sales-staff-product-summary" */ "@/views/reports/OutcomeReport.vue"),
                        meta: {requiresAuth: true},
                    },
                    {
                        path: 'lead-sources-report',
                        name: 'LeadSourcesReport',
                        component: () => import(/* webpackChunkName: "sales-staff-product-summary" */ "@/views/reports/LeadSourcesReport.vue"),
                        meta: {requiresAuth: true},
                    },
                    {
                        path: 'customer-satisfaction-report',
                        name: 'LeadSourcesReport',
                        component: () => import(/* webpackChunkName: "sales-staff-product-summary" */ "@/views/reports/CustomerSatisfactionReport.vue"),
                        meta: {requiresAuth: true},
                    },
                ]
            },
            {
                path: 'sales-contact',
                name: 'sales-contact',
                component: () => import(/* webpackChunkName: "ales-contact" */ "@/views/sales-contact/SalesContactListView.vue"),
                meta: {requiresAuth: true}

            },
            {
                path: 'sales-staff',
                name: 'sales-staff',
                component: () => import(/* webpackChunkName: "sales-staff" */ "@/views/sales-staff/SalesStaffListView.vue"),
                meta: {requiresAuth: true}

            },
            {
                path: 'trade-staff',
                name: 'trade-staff',
                component: () => import(/* webpackChunkName: "trade-staff" */ "@/views/trade-staff/TradeStaffListView.vue"),
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
                        path: 'lead-source',
                        name: 'LeadSourceAdmin',
                        component: () => import(/* webpackChunkName: "leadsourceadmin" */"@/views/admin/LeadSourceAdminPage.vue"),
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