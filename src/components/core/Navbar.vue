<template>
    <nav>
        <v-app-bar clipped-left app color="blue darken-3" dark >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
                <!-- <span class="hidden-sm-and-down">Ezi-Task CRM</span> -->
                <span class="font-weight-light">Ezi-Task</span>
                <span>CRM</span>
            </v-toolbar-title>
            <v-spacer />
            <v-btn text @click="logoutFromApp" >
              <span>Logout</span>
              <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" clipped app class="px-2" >
            <v-list class="mt-3">
                <v-list-item v-for="(link, index) in links" :key="index" router :to="link.route" active-class="border">
                    <v-list-item-action>
                    <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                    <v-list-item-title>{{link.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
     </nav>
</template>

<script>

    import {mapActions} from 'vuex';

    export default {
        name: 'Navbar',
        components: {},
        data: () => ({
            drawer: true,
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
            links(){
                const user = this.$store.state.auth.currentUser;
                let links = [];

                if(user && user.userType === 'staff_user'){
                    links = [
                        {icon: 'dashboard', text: 'Dashboard', route: '/'},
                        {icon: 'perm_contact_calendar', text: 'Contacts', route: '/sales-contact'},
                        {icon: 'person_pin', text: 'Leads', route: '/lead'},
                    ]
                }

                if(user && user.userType === 'franchise_admin'){
                    links = [
                        {icon: 'dashboard', text: 'Dashboard', route: '/'},
                        {icon: 'store', text: 'Franchise', route: '/franchise'},
                        {icon: 'perm_contact_calendar', text: 'Contacts', route: '/sales-contact'},
                        {icon: 'person_pin', text: 'Leads', route: '/lead'},
                    ]
                }

                if(user && user.userType === 'head_office'){
                    links = [
                        {icon: 'dashboard', text: 'Dashboard', route: '/'},
                        {icon: 'store', text: 'Franchise', route: '/franchise'},
                        {icon: 'perm_contact_calendar', text: 'Contacts', route: '/sales-contact'},
                        {icon: 'person_pin', text: 'Leads', route: '/lead'},
                    ]
                }

                return links;

            }
        }
    }
</script>

<style>

</style>