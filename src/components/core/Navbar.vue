<template>
    <nav>
        <v-app-bar clipped-left app color="blue darken-3" dark >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title style="width: 400px" class="ml-0 pl-4">
                <div class="d-flex">
                    <v-img
                        contain
                        :lazy-src="logo"
                        max-height="30"
                        max-width="150"
                        :src="logo"
                        ></v-img>
                    <div class="font-weight-light">Ezi-Task</div>
                    <div>CMC</div>
                </div>
            </v-toolbar-title>
            <v-spacer />
            <v-btn text @click="logoutFromApp" >
              <span>Logout</span>
              <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" clipped app class="px-2" >
            <v-list>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon color="primary" large>mdi-account-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ currentUser.username }}</v-list-item-title>
                        <v-list-item-subtitle> <span class="overline">{{ currentUser.userType }}</span> </v-list-item-subtitle>
<!--                        <v-list-item-subtitle>-->
<!--                            <span   class="overline"-->
<!--                                    v-for="franchise in franchises" :key="franchise.id">{{ franchise.franchiseNumber}} | </span>-->
<!--                        </v-list-item-subtitle>-->
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list class="mt-3">
                <v-list-item v-for="(link, index) in links" :key="index" router :to="link.route" active-class="border">
                    <v-list-item-icon>
                    <v-icon >{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{link.text}}</v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>

                <v-list-group >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>
                                Reports
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item v-for="(report, i) in reports" :key="i" link router :to="report.route" active-class="border">
                        <v-list-item-icon> <v-icon v-text="report.icon"></v-icon> </v-list-item-icon>
                        <v-list-item-title v-text="report.text"></v-list-item-title>
                    </v-list-item>

                </v-list-group>
                
                <v-divider></v-divider>

                <v-list-group >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>
                                Staffs
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item v-for="(staff, i) in staffs" :key="i" link router :to="staff.route" active-class="border">
                        <v-list-item-icon> <v-icon v-text="staff.icon"></v-icon> </v-list-item-icon>
                        <v-list-item-title v-text="staff.text"></v-list-item-title>
                    </v-list-item>

                </v-list-group>
                <v-divider></v-divider>
<!--                <v-subheader v-if="currentUser && currentUser.userType === 'head_office'"-->
<!--                        class="mt-4 grey&#45;&#45;text text&#45;&#45;darken-1">ADMIN AND SETTINGS</v-subheader>-->
                <v-list-group
                            v-if="currentUser && currentUser.userType === 'head_office'"
                            v-model="adminMenu">
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>
                                Admin Menu
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item v-for="(admin, i) in admins" :key="i" link router :to="admin.route" active-class="border">
                        <v-list-item-icon> <v-icon v-text="admin.icon"></v-icon> </v-list-item-icon>
                        <v-list-item-title v-text="admin.text"></v-list-item-title>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
     </nav>
</template>

<script>

    import {mapActions, mapState} from 'vuex';
import { frontEndUrl } from '../../api/api';

    export default {
        name: 'Navbar',
        components: {},
        data: () => ({
            drawer: true,
            adminMenu: false,
            admins: [
                {icon: 'mdi-account-settings', text: 'User Admin', route: '/admin/users'},
                {icon: 'mdi-map', text: 'Lead Source Admin', route: '/admin/lead-source'},
                {icon: 'mdi-cart', text: 'Product Admin', route: '/admin/products'},
                {icon: 'mdi-hammer-screwdriver', text: 'Trade Type Admin', route: '/admin/trade-types'}
            ],
            staffs: [
                {icon: 'mdi-briefcase', text: 'Sales Staff', route: '/sales-staff'},
                {icon: 'mdi-hammer-screwdriver', text: 'Trade Staff', route: '/trade-staff'}
            ],
            reports: [
                {icon: 'mdi-chart-areaspline', text: 'Sales Staff', route: '/reports/sales-summary'},
                {icon: 'mdi-chart-areaspline', text: 'Sales Staff - Product', route: '/reports/sales_staff-products'},
                {icon: 'mdi-chart-areaspline', text: 'Product Sales', route: '/reports/product-sales-summary'},
                {icon: 'mdi-chart-areaspline', text: 'Outcome Summary', route: '/reports/outcome-report'},
                {icon: 'mdi-chart-areaspline', text: 'Lead Sources', route: '/reports/lead-sources-report'},
                {icon: 'mdi-chart-areaspline', text: 'Customer Satisfaction', route: '/reports/customer-satisfaction-report'},
            ]
        }),
        methods: {
            ...mapActions('auth', ['logout']),
            async logoutFromApp(){
                try {
                    await this.logout();
                    this.$router.push('/login');

                }catch (e) {
                    console.log('Error logging out', e.response);
                }
            }
        },
        computed: {
            ...mapState('auth', ['currentUser', 'franchises']),
            logo(){
                return `${frontEndUrl}/spanline_logo.png`
            },
            links(){
                const user = this.$store.state.auth.currentUser;
                let links = [];

                if(user && user.userType === 'staff_user'){
                    links = [
                        {icon: 'dashboard', text: 'Dashboard', route: '/'},
                        {icon: 'perm_contact_calendar', text: 'Contacts', route: '/sales-contact'},
                        {icon: 'mdi-account-group', text: 'Leads', route: '/lead'},
                    ]
                }

                if(user && user.userType === 'franchise_admin'){
                    links = [
                        {icon: 'dashboard', text: 'Dashboard', route: '/'},
                        {icon: 'store', text: 'Franchise', route: '/franchise'},
                        {icon: 'perm_contact_calendar', text: 'Contacts', route: '/sales-contact'},
                        {icon: 'mdi-account-group', text: 'Leads', route: '/lead'},
                    ]
                }

                if(user && user.userType === 'head_office'){
                    links = [
                        {icon: 'dashboard', text: 'Dashboard', route: '/'},
                        {icon: 'store', text: 'Franchise', route: '/franchise'},
                        {icon: 'perm_contact_calendar', text: 'Contacts', route: '/sales-contact'},
                        {icon: 'mdi-account-group', text: 'Leads', route: '/lead'},
                    ]
                }

                return links;

            }
        }
    }
</script>

<style>

</style>