<template>
    <div>
        <v-card>
            <v-card-title id="table-header" >
                <SearchForm
                        :search-items="searchItems"
                        @search="searchTradeStaffs"
                        @reset="reset"/>
            </v-card-title>
            <v-data-table
                    :items="tradeStaffs"
                    :headers="headers"
                    :options.sync="pageOptions"
                    :server-items-length="pagination.total"
                    :footer-props="footerProps"
                    :single-expand="true"
                    :show-expand="true"
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

                <template v-slot:expanded-item="{ headers, item }">
                    <TradeStaffDetails :length="headers.length" :item="item" />
                </template>

            </v-data-table>
        </v-card>
        <v-dialog v-model="showEditDialog" persistent width="850" class="px-2">
            <TradeStaffEditDialog :initial-data="selectedItem"
                                  ref="editDialog"
                                  @close="closeEditDialog" />
        </v-dialog>
        <v-dialog v-model="showDeleteDialog" persistent width="550" class="px-2">
            <TradeStaffDeleteDialog :trade-staff="selectedItem"
                                    @close="closeDeleteDialog" />
        </v-dialog>
    </div>
</template>

<script>
    import SearchForm from "../shared/SearchForm";
    import {mapState, mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";
    import TradeStaffDetails from "./TradeStaffDetails";
    import TradeStaffEditDialog from "./TradeStaffEditDialog";
    import TradeStaffDeleteDialog from "./TradeStaffDeleteDialog";


    export default {
        name: "TradeStaffTable",
        components: {TradeStaffDeleteDialog, TradeStaffEditDialog, TradeStaffDetails, SearchForm},
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
                    {text: 'Type', value: 'trade_type'},
                    {text: 'Franchise', value: 'franchise_number'},

                ],
                headers: [
                    { text: 'First Name',value: 'firstName'},
                    { text: 'Last Name', value: 'lastName' },
                    { text: 'E-Mail', value: 'email' },
                    { text: 'Type', value: 'tradeType' },
                    { text: 'Franchise', value: 'franchise' },
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
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('tradeStaffs', ['tradeStaffs', 'pagination']),
            isHeadOffice(){
                const userType = this.$store.state.auth.currentUser.userType;
                return  userType === 'head_office';
            },
        },
        methods: {
            ...mapActions('tradeStaffs', ['getAllTradeStaffs']),
            getTradeStaffs(pageOptions, searchOptions){
                if(!this.loading){
                    this.loading = true;
                    this.getAllTradeStaffs({pageOptions, searchOptions}).then(() => {

                    }).catch(error => {
                        this.handleError(error)
                    }).finally(() => {
                        this.loading = false;
                    })


                }
            },
            searchTradeStaffs({searchFor, searchIn}){
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
                    this.getTradeStaffs(this.pageOptions, this.searchOptions);
                },
                deep: true
            },
        },
        mounted() {
            this.getTradeStaffs(this.pageOptions, this.searchOptions);
        }
    }
</script>

<style scoped>

</style>