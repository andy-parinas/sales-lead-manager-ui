<template>
    <div class="mb-12">
        <v-card>
            <v-data-table
                :loading="loading"
                :headers="headers"
                :items="users"
                show-expand>

                <template v-slot:item.userType="{item}">
                    <ChipUserType :user-type="item.userType" />
                </template>

                <template v-slot:expanded-item="{}">
                    <v-row class="justify-sm-start mt-5 mb-12 mx-5" >
                        <v-btn small elevation="4" dark color="error" class="mr-3" >
                            Delete
                            <v-icon small right > mdi-trash-can-outline </v-icon>
                        </v-btn>
                        <v-btn @click="editUser"
                            small elevation="4" dark color="primary" class="mr-3" >
                            Edit
                            <v-icon small right > mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn small elevation="4" dark color="green darken-1" class="mr-3" >
                            Franchises
                            <v-icon small right > mdi-store</v-icon>
                        </v-btn>
                        <v-btn small elevation="4" dark color="orange darken-1" class="mr-3" >
                            Password Reset
                            <v-icon small right > mdi-lock </v-icon>
                        </v-btn>
                    </v-row>
                </template>


                <template v-slot:item.actions="{}">
                    <v-container>
                        <v-row class="justify-sm-start">
                            <v-btn x-small fab elevation="4" dark color="error" class="mr-3" >
                                <v-icon small > mdi-trash-can-outline </v-icon>
                            </v-btn>
                            <v-btn x-small fab elevation="4" dark color="primary" class="mr-3" >
                                <v-icon small > mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn x-small fab elevation="4" dark color="success" >
                                <v-icon small > mdi-file-outline </v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>
                </template>
            </v-data-table>

            <v-dialog v-model="showEditDialog" persistent max-width="850" class="px-2">
                <EditDialog @close="showEditDialog = false" />
            </v-dialog>

        </v-card>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex';
    import ChipUserType from "./ChipUserType";
    import EditDialog from "./EditDialog";

    export default {
        name: "UsersAdminTable",
        components: {EditDialog, ChipUserType},
        data(){
            return {
                loading: false,
                showEditDialog: false,
                headers : [
                    { text: 'Name',value: 'name'},
                    { text: 'Username',value: 'username'},
                    { text: 'Email',value: 'email'},
                    { text: 'User Type',value: 'userType'},
                    // { text: 'Actions',value: 'actions', sortable:false},
                    { text: '', value: 'data-table-expand' },
                ]
            }
        },
        computed: {
            ...mapState('users', ['users'])
        },
        methods:{
            ...mapActions('users', ['getUsers']),
            getAllUsers(){

                if(!this.loading){
                    this.loading = true;
                    this.getUsers().then(() => {
                        this.loading = false;
                        console.log('Users Loaded')
                    }).catch(error => {
                        console.log(error)
                        this.loading = false;
                    })
                }
            },
            editUser(){
                this.showEditDialog = true;
            }

        },
        mounted() {
            this.getAllUsers();
        }
    }
</script>

<style scoped>

</style>