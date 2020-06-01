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
                    :server-items-length="meta.total"
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
                                <v-icon small> mdi-lead-pencil</v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="success" class="ml-3" @click="convertToLead(item)">
                                <v-icon small>mdi-fast-forward-outline</v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>


                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <SalesContactDetails :length="headers.length" :item="item" />
                </template>]
                <template v-slot:top>
                    <v-dialog v-model="editDialog"  persistent width="800px">
                        <SalesContactForm
                                @closeForm="closeEditDialog"
                                :item="editedItem"
                                :formTitle="formTitle"
                                :loading="formLoading"
                                ref="salesContactForm"
                        />
                    </v-dialog>
                    <v-dialog v-model="deleteDialog" persistent max-width="350" class="px-2">
                        <v-card>
                            <v-card-title class="headline">Delete Sales Contact?</v-card-title>
                            <v-card-text>
                                <p class="body-1 font-weight-medium red--text">{{ deletedItem.name }}</p>
                                <p>You won't be able to recover this Sales Contact once deleted.</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="grey darken-1" text :disabled="deleting" @click="cancelDelete">Cancel</v-btn>
                                <v-btn color="red darken-1" class="mr-3" text @click="confirmDelete" :loading="deleting" >
                                    Delete
                                    <template v-slot:loader>
                                       <v-row>
                                           <span class="mr-1">Deleting...</span>
                                       </v-row>
                                    </template>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </template>
            </v-data-table>

        </v-card>

        <v-btn bottom color="pink" dark fab fixed right @click="newContact" >
            <v-icon  >add</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import SalesContactDetails from "./SalesContactDetails";
    import {mapActions, mapState} from "vuex";
    import SalesContactForm from "./SalesContactForm";
    import SalesContactSearchForm from "./SalesContactSearchForm";
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";

    export default {
        name: "SalesContactsTable",
        components: {SalesContactSearchForm, SalesContactDetails, SalesContactForm},
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
                deletedItem: {
                    name: '',
                    id: ''
                },
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
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('salesContacts', {
                salesContacts: state => state.salesContacts,
                meta: state => state.meta
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
                this.editedItemIndex = this.salesContacts.indexOf(item)
                this.editedItem = Object.assign({}, item);
                this.editDialog = true;

                if(this.$refs.salesContactForm){
                    console.log('With SalesContactForm')
                    this.$refs.salesContactForm.assignPostcode(this.editedItem.postcode);
                    this.$refs.salesContactForm.copyPropsToState(this.editedItem);
                }
            },
            deleteItem(item){
                this.deletedItem.name = `${item.firstName} ${item.lastName}`
                this.deletedItem.id = item.id
                this.deleteDialog = true;
            },
            confirmDelete(){
                this.deleting = true;
                this.deleteSalesContact(this.deletedItem).then(() => {
                    console.log('successfully deleted')
                    this.snackbar.message = "Contact Successfully Deleted"
                    this.snackbar.show = true;
                }).catch(error => {
                    console.error(error.response);
                    this.snackbar.show = true;
                    this.snackbar.color = 'error';
                    if(error.response && error.response.status && error.response.status === 409){
                        this.snackbar.message = "Can't delete Sales Contact converted to Lead";
                    }else {
                        this.snackbar.message = "Error deleting Sales Contact. Please check with you Administrator";
                    }
                }).finally(() => {
                    console.log('Finally')
                    this.cancelDelete();
                })
            },
            cancelDelete(){
                this.deletedItem.name = '';
                this.deletedItem.id = '';
                this.deleteDialog = false;
                this.deleting = false;
            },
            resetSelectedItem(){
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedItemIndex = -1
            },
            closeEditDialog(){
                setTimeout(() => {
                    this.resetSelectedItem()
                }, 500)

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
                console.log('Contact to Convert', contact)
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