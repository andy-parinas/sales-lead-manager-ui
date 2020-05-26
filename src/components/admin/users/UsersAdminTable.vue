<template>
    <div class="mb-12">
        <v-card>
            <v-card-title id="table-header" >
                <UserSearchForm @search="onUserSearch" @reset="onTableReset" />
            </v-card-title>
            <v-data-table
                :loading="loading"
                :headers="headers"
                :items="users"
                :options.sync="pageOptions"
                :server-items-length="pagination.total"
                :footer-props="footerProps"
                single-expand
                @update:page="onPageOptionChanged"
                @update:sort-by="onPageOptionChanged"
                @update:sort-desc="onPageOptionChanged"
                @update:items-per-page="onPageOptionChanged"
                show-expand>

                <template v-slot:item.userType="{item}">
                    <ChipUserType :user-type="item.userType" />
                </template>

                <template v-slot:expanded-item="{item}">
                    <td :colspan="headers.length" class="py-4">
                        <v-row class="justify-sm-start mt-5 mb-12 mx-5" >
                            <v-btn small elevation="4" dark color="red darken-4" class="mr-3" >
                                Delete
                                <v-icon small right > mdi-trash-can-outline </v-icon>
                            </v-btn>
                            <v-btn @click="editUser(item)"
                                small elevation="4" dark color="blue darken-4" class="mr-3" >
                                Edit
                                <v-icon small right > mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn small elevation="4" dark color="green darken-4" class="mr-3" >
                                Franchises
                                <v-icon small right > mdi-store</v-icon>
                            </v-btn>
                            <v-btn small elevation="4" dark color="orange darken-4" class="mr-3" >
                                Password Reset
                                <v-icon small right > mdi-lock </v-icon>
                            </v-btn>
                        </v-row>
                    </td>
                </template>

            </v-data-table>

            <v-dialog v-model="showEditDialog" persistent max-width="850" class="px-2">
                <EditDialog @close="showEditDialog = false"  />
            </v-dialog>

            <v-dialog v-model="showFranchiseDialog" persistent max-width="850" class="px-2">
                <FranchisesDialog @close="showFranchiseDialog = false"  />
            </v-dialog>

        </v-card>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex';
    import ChipUserType from "./ChipUserType";
    import EditDialog from "./EditDialog";
    import UserSearchForm from "./UserSearchForm";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import FranchisesDialog from "./FranchisesDialog";

    export default {
        name: "UsersAdminTable",
        components: {FranchisesDialog, UserSearchForm, EditDialog, ChipUserType},
        data(){
            return {
                loading: false,
                showEditDialog: false,
                showFranchiseDialog: true,
                headers : [
                    { text: 'Name',value: 'name'},
                    { text: 'Username',value: 'username'},
                    { text: 'Email',value: 'email'},
                    { text: 'User Type',value: 'userType'},
                    { text: '', value: 'data-table-expand' },
                ],
                pageOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['name'],
                    sortDesc: [false],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                defaultPageOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['name'],
                    sortDesc: [false],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                searchIn: '',
                searchFor: '',
                footerProps: {
                    "items-per-page-options": [5,10,15,20],
                    disablePagination: false,
                    disableItemsPerPage : false
                },
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('users', ['users', 'pagination'])
        },
        methods:{
            ...mapActions('users', ['getUsers', 'selectUser']),
            getAllUsers(pageOptions, searchOptions){

                if(!this.loading){
                    this.loading = true;
                    this.$set(this.footerProps, 'disablePagination', true)
                    this.$set(this.footerProps, 'disableItemsPerPage', true)

                    this.getUsers({pageOptions, searchOptions}).then(() => {
                        this.loading = false;
                        console.log('Users Loaded')
                    }).catch(error => {
                        this.handleError(error)
                    }).finally(() => {
                        this.$set(this.footerProps, 'disablePagination', false)
                        this.$set(this.footerProps, 'disableItemsPerPage', false)
                    })
                }
            },
            editUser(item){
                this.selectUser(item);
                this.showEditDialog =true;
            },
            closeDialog(){
                this.showEditDialog = false;
            },
            onPageOptionChanged(){
                if(this.searchIn.trim() !== '' && this.searchFor.trim() !== '')
                {
                    this.getAllUsers(this.pageOptions, {
                        searchFor: this.searchFor,
                        searchIn: this.searchIn
                    });
                }else {
                    this.getAllUsers(this.pageOptions);
                }
            },
            onUserSearch({searchIn, searchFor}){
                this.searchFor = searchFor;
                this.searchIn = searchIn;

                // Reset the page options at the start of the search
                this.pageOptions = Object.assign({}, this.defaultPageOptions);

                if(this.searchIn.trim() !== '' && this.searchFor.trim() !== '')
                {
                    this.getAllUsers(this.pageOptions, {
                        searchFor:  this.searchFor,
                        searchIn: this.searchIn
                    });
                }
            },
            onTableReset(){
                this.searchFor = '';
                this.searchIn = '';

                this.pageOptions = Object.assign({}, this.defaultPageOptions);
                this.getAllUsers(this.defaultPageOptions);
            }

        },
        mounted() {
            this.getAllUsers(this.pageOptions, null);
        }
    }
</script>

<style scoped>

</style>