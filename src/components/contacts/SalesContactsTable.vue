<template>
    <div>
        <v-card>
            <v-card-title id="table-header" >
                <SalesContactSearchForm
                        @search="searchContacts"
                        @reset="resetSearch" />
            </v-card-title>
            <v-data-table
                    :items="salesContacts"
                    :options.sync="options"
                    :headers="headers"
                    :server-items-length="pagination.total"
                    :single-expand="true"
                    :loading="loading"
                    :footer-props="footerProps"
                    @update:page="onChangeOptions"
                    @update:sort-by="onChangeOptions"
                    @update:sort-desc="onChangeOptions"
                    @update:items-per-page="onChangeOptions"
                    item-key="id"
                    show-expand
                    class="elevation-0">

                <template v-slot:item.actions="{ item }">
                    <v-container>
                        <v-row class="justify-sm-start">
                            <v-btn x-small fab text dark color="error" class="mr-3"  v-if="isHeadOffice"  @click="deleteItem(item)">
                                <v-icon small >mdi-trash-can-outline </v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="accent" @click="editContact(item)" >
                                <v-icon small> mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="success" class="ml-3" @click="convertToLead(item)">
                                <v-icon small>mdi-account-convert</v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>
                </template>

                <template v-slot:expanded-item="{ headers, item }">
                    <SalesContactDetails :length="headers.length" :item="item" />
                </template>
            </v-data-table>

        </v-card>

        <v-dialog v-model="editDialog"  persistent width="850px">
            <SalesContactEditDialog :sales-contact="selectedItem"
                @close="closeEditDialog"/>
        </v-dialog>

        <v-dialog v-model="deleteDialog" persistent max-width="550" class="px-2">
            <SalesContactDeleteDialog :sales-contact="selectedItem"
                                      @close="closeDeleteDialog"/>
        </v-dialog>

    </div>
</template>

<script>
    import SalesContactDetails from "./SalesContactDetails";
    import {mapActions, mapState} from "vuex";
    import SalesContactSearchForm from "./SalesContactSearchForm";
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";
    import SalesContactDeleteDialog from "./SalesContactDeleteDialog";
    import SalesContactEditDialog from "./SalesContactEditDialog";

    export default {
        name: "SalesContactsTable",
        components: {
            SalesContactEditDialog,
            SalesContactDeleteDialog, SalesContactSearchForm, SalesContactDetails},
        props: {},
        data(){
            return {
                falseData: [],
                editDialog: false,
                deleteDialog: false,
                deleting: false,
                initialSearch: false,
                loading: false,
                formLoading: false,
                headers: [
                    { text: 'First Name',value: 'firstName'},
                    { text: 'Last Name', value: 'lastName' },
                    { text: 'Suburb', value: 'suburb' },
                    { text: 'State', value: 'state' },
                    { text: 'Postcode', value: 'postcode' },
                    { text: 'Actions', value: 'actions', sortable: false },
                    { text: '', value: 'data-table-expand' },
                ],
                searchFor: '',
                searchIn: '',
                options: {
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
                footerProps: {
                    "items-per-page-options": [5,10,15,20],
                    disablePagination: false,
                    disableItemsPerPage : false
                },
                editedItemIndex: -1,
                editedItem: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    email2: '',
                    contactNumber: '',
                    street1: '',
                    street2: '',
                    suburb: '',
                    state: '',
                    postcode: '',
                },
                defaultItem: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    email2: '',
                    contactNumber: '',
                    street1: '',
                    street2: '',
                    suburb: '',
                    state: '',
                    postcode: '',
                },
                selectedItem: null,
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('salesContacts', {
                salesContacts: state => state.salesContacts,
                pagination: state => state.pagination
            }),
            isHeadOffice(){
              const userType = this.$store.state.auth.currentUser.userType;
              return  userType === 'head_office';
            },
            formTitle(){
                return this.editedItemIndex === -1 ? 'Create New Contact' : 'Edit Contact'
            }
        },
        methods: {
            ...mapActions('salesContacts',
                ['fetchSalesContacts', 'updateSalesContact', 'createSalesContact', 'deleteSalesContact', 'selectContact']),
            ...mapActions(['setAppLoadingState', 'setSuccessMessage']),
            newContact(){
                this.editDialog = true;
            },
            editContact(item){
                this.selectedItem = Object.assign({}, item);
                this.editDialog = true;
                this.selectContact(item)
            },
            deleteItem(item){
                this.selectedItem = item;
                this.deleteDialog = true;
            },
            closeDeleteDialog(){
                this.selectedItem = null;
                this.deleteDialog = false;
            },
            closeEditDialog(){
                setTimeout(() => {
                    this.selectedItem = null;
                    this.selectContact(null)
                }, 100)

                this.editDialog = false;

            },
            searchContacts({searchIn, searchFor}){
                console.log('Searching Contact')
                this.searchFor = searchFor;
                this.searchIn = searchIn;

                this.options = Object.assign({}, this.defaultOptions);

                if(this.searchIn.trim() !== '' && this.searchFor.trim() !== '')
                {
                    this.getContacts(this.options, {
                        searchFor: this.searchFor,
                        searchIn: this.searchIn
                    });
                }
            },
            resetSearch(){
                this.searchFor = '';
                this.searchIn = '';
                this.options = Object.assign({}, this.defaultOptions);
                this.getContacts(this.defaultOptions);
            },
            getContacts(options, searchOptions){

                if(!this.loading){
                    this.loading = true;
                    this.$set(this.footerProps, 'disablePagination', true)
                    this.$set(this.footerProps, 'disableItemsPerPage', true)

                    this.fetchSalesContacts({options, searchOptions}).then(() => {
                        this.loading = false;
                    }).catch(error => {
                        this.handleError(error)
                    }).finally(() => {
                        this.loading = false;
                        this.$set(this.footerProps, 'disablePagination', false)
                        this.$set(this.footerProps, 'disableItemsPerPage', false)
                    })
                }
            },
            onChangeOptions(){
                console.log('Options Changed')
                if(this.searchIn.trim() !== '' && this.searchFor.trim() !== '')
                {
                    this.getContacts(this.options, {
                        searchFor: this.searchFor,
                        searchIn: this.searchIn
                    });
                }else {
                    this.getContacts(this.options);
                }
            },
            convertToLead(contact){
                this.selectContact(contact)
                this.$router.push({name: 'LeadCreate'})
            }
        },
        mounted() {
            this.getContacts(this.options)
        }
    }
</script>

<style scoped>

</style>