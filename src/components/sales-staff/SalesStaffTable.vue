<template>
    <div>
        <v-card>
            <v-card-title id="table-header" >
                <SearchForm
                        :search-items="searchItems"
                        @search="searchSalesStaffs"
                        @reset="reset"/>
            </v-card-title>
            <v-data-table
                    :items="salesStaffs"
                    item-key="key"
                    :headers="headers"
                    :options.sync="pageOptions"
                    :server-items-length="pagination.total"
                    :footer-props="footerProps"
                    :single-expand="true"
                    :loading="loading">

                <template v-slot:item.status="{item}">
                    <v-chip small label :color="item.status === 'blocked' ? 'red' : 'green'" text-color="white">
                        {{item.status | capitalize }}
                    </v-chip>
                </template>


                <template v-slot:item.actions="{item}">
                    <v-container>
                        <v-row class="justify-sm-start">
                            <v-btn x-small fab text dark color="accent"
                                   v-if="isHeadOffice"
                                   @click="edit(item)" >
                                <v-icon small > mdi-pencil </v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="error" class="mr-3"
                                   v-if="isHeadOffice"
                                   @click="deleteItem(item)">
                                <v-icon small > mdi-trash-can-outline </v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>

                </template>

<!--                <template v-slot:expanded-item="{ headers, item }">-->
<!--                    <SalesStaffDetails :length="headers.length" :item="item" />-->
<!--                </template>-->

            </v-data-table>
        </v-card>
        <v-dialog v-model="showEditDialog" persistent width="850" class="px-2">
            <SalesStaffEditDialog :initial-data="selectedItem"
                                  ref="editDialog"
                    @close="closeEditDialog" />
        </v-dialog>
        <v-dialog v-model="showDeleteDialog" persistent width="550" class="px-2">
            <SalesStaffDeleteDialog :sales-staff="selectedItem"
                    @close="closeDeleteDialog" />
        </v-dialog>
    </div>
</template>

<script>
    import SearchForm from "../shared/SearchForm";
    import {mapActions, mapState} from "vuex";
    // import SalesStaffDetails from "./SalesStaffDetails";
    import SalesStaffEditDialog from "./SalesStaffEditDialog";
    import SalesStaffDeleteDialog from "./SalesStaffDeleteDialog";
    import ErrorHandlerMixins from "@/mixins/ErrorHandler";
    export default {
        name: "SalesStaffTable",
        components: {SalesStaffDeleteDialog, SalesStaffEditDialog, SearchForm},
        data(){
            return {
                loading: false,
                showEditDialog: false,
                showDeleteDialog: false,
                searchItems: [
                    {text: 'First Name', value: 'first_name'},
                    {text: 'Last Name', value: 'last_name'},
                    {text: 'Email', value: 'email'},
                    {text: 'Status', value: 'status'},
                ],
                headers: [
                    { text: 'First Name',value: 'firstName'},
                    { text: 'Last Name', value: 'lastName' },
                    { text: 'E-Mail', value: 'email' },
                    { text: 'Contact Number', value: 'contactNumber' },
                    { text: 'Franchises', value: 'franchises'},
                    { text: 'Status', value: 'status' },
                    { text: 'Actions', value: 'actions', sortable: false },
                    { text: '', value: 'data-table-expand' },
                ],
                footerProps: {
                    "items-per-page-options": [5,10,15,20],
                    disablePagination: false,
                    disableItemsPerPage : false
                },
                pageOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['firstName'],
                    sortDesc: [false],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['firstName'],
                    sortDesc: [false],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                searchOptions: {
                    searchIn: '',
                    searchFor: '',
                },
                selectedItem: null
            }
        },
        computed: {
            ...mapState('salesStaffs', ['salesStaffs', 'pagination']),
            isHeadOffice(){
                const userType = this.$store.state.auth.currentUser.userType;
                return  userType === 'head_office';
            },
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('salesStaffs', ['fetchAllSalesStaff']),
            getSalesStaffs(pageOptions, searchOptions){
                if(!this.loading){
                    this.loading = true;
                    this.fetchAllSalesStaff({pageOptions, searchOptions}).then(() => {

                    }).catch(error => {
                        this.handleError(error)
                    }).finally(() => {
                        this.loading = false;
                    })
                }
            },
            searchSalesStaffs({searchFor, searchIn}){
                this.searchOptions.searchIn = searchIn;
                this.searchOptions.searchFor = searchFor;
                this.pageOptions = Object.assign({}, this.defaultOptions);
            },
            reset(){
                this.searchOptions.searchIn = '';
                this.searchOptions.searchFor = '';
                this.pageOptions = Object.assign({}, this.defaultOptions);
            },
            edit(item){
                this.selectedItem = item;
                this.showEditDialog = true;
            },
            deleteItem(item){
                this.selectedItem = item;
                this.showDeleteDialog = true;
            },
            closeEditDialog(){
                setTimeout(() => {
                    this.selectedItem = null;
                }, 100)
                this.showEditDialog = false;
            },
            closeDeleteDialog(){
                setTimeout(() => {
                    this.selectedItem = null;
                }, 100)
                this.showDeleteDialog = false;
            }
        },
        watch: {
            pageOptions: {
                handler(){
                    this.getSalesStaffs(this.pageOptions, this.searchOptions);
                },
                deep: true
            },
            searchOptions: {
                handler(){

                },
                deep: true
            }
        },
        mounted() {
            this.getSalesStaffs(this.pageOptions, this.searchOptions);
        }
    }
</script>

<style scoped>

</style>