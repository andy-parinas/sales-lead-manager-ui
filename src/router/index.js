import Vue from 'vue';
import VueRouter from 'vue-router';

import MainPage from '../views/MainPage';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Franchise from '../views/Franchise';
import Lead from '../views/Lead';
import SalesContact from '../views/SalesContact';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        component: MainPage,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: Dashboard
        
            },
            {
                path: 'franchise',
                name: 'franchise',
                component: Franchise
        
            },
            {
                path: 'lead',
                name: 'lead',
                component: Lead
        
            },
            {
                path: 'sales-contact',
                name: 'sales-contact',
                component: SalesContact
        
            }
        ]
    }
];


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;