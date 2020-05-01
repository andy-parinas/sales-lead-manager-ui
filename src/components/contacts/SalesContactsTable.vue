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
                    item-key="id"
                    show-expand
                    class="elevation-0">

                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-5" @click="editContact(item)" > mdi-pencil</v-icon>
                    <v-icon small @click="deleteItem(item)" v-if="isHeadOffice" > mdi-delete </v-icon>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <SalesContactDetails :length="headers.length" :item="item" />
                </template>]
                <template v-slot:top>
                    <v-dialog v-model="dialog" width="800px">
                        <SalesContactForm
                                @closeForm="close"
                                @save="save"
                                :item.sync="editedItem"
                                :formTitle="formTitle"
                                :loading="formLoading"
                                ref="salesContactForm"
                        />
                    </v-dialog>
                </template>
            </v-data-table>

        </v-card>

        <v-snackbar v-model="snackbar.show"
                :color="snackbar.color"
                :timeout="snackbar.timeout"
                :bottom="true" >
            {{ snackbar.message }}
            <v-btn dark text @click="snackbar.show = false" > Close </v-btn>
        </v-snackbar>

        <v-btn bottom color="pink" dark fab fixed right @click="newContact" >
            <v-icon  >add</v-icon>
        </v-btn>
<!--        <pre>{{this.options}}</pre>-->
<!--        <pre>{{this.searchFor}} {{this.searchIn}} </pre>-->
    </div>
</template>

<script>
    import SalesContactDetails from "./SalesContactDetails";
    import {mapActions, mapState} from "vuex";
    import SalesContactForm from "./SalesContactForm";
    import ErrorHandler from "../../helpers/ErrorHandler";
    import SalesContactSearchForm from "./SalesContactSearchForm";

    export default {
        name: "SalesContactsTable",
        components: {SalesContactSearchForm, SalesContactDetails, SalesContactForm},
        props: {},
        data(){
            return {
                falseData: [],
                dialog: false,
                isInitialLoad: true,
                initialSearch: false,
                loading: false,
                formLoading: false,
                snackbar: {
                    show: false,
                    message: '',
                    color: 'success',
                    timeout: 6000,
                },
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
                    "items-per-page-options": [5,10,15,20]
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
            }
        },
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
                ['fetchSalesContacts', 'updateSalesContact', 'createSalesContact']),
            ...mapActions(['setAppLoadingState']),
            newContact(){
                // this.$refs.contactForm.resetForm()
                if(this.$refs.salesContactForm){
                    this.$refs.salesContactForm.resetForm();
                }
                this.resetSelectedItem();
                this.dialog = true;
            },
            editContact(item){
                this.editedItemIndex = this.salesContacts.indexOf(item)
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
                console.log('contactform status',this.$refs.salesContactForm )
                if(this.$refs.salesContactForm){
                    this.$refs.salesContactForm.assignPostcode(this.editedItem.postcode);
                }
            },
            deleteItem(item){
                console.log('delete', item)
            },
            save(){
                this.formLoading = true;
                if(this.editedItemIndex > -1){
                    console.log('Updating the Form')
                    this.updateSalesContact(this.editedItem).then(() => {
                        this.snackbar.message = "Contact Successfully Save"
                        this.snackbar.show = true;
                        this.dialog = false;
                        this.resetSelectedItem();
                    }).catch(error => {
                        if(error.response && error.response.status){
                            ErrorHandler.handlerError(error.response.status, (message) => {
                                this.$refs.salesContactForm.showErrorMessage(message);
                            })
                        }else {
                            ErrorHandler.handlerError(503, (message) => {
                                this.$refs.salesContactForm.showErrorMessage(message);
                            })
                        }
                    }).finally(() => {
                        this.formLoading = false;
                    })

                }else {
                    console.log('Saving the Form')
                    this.createSalesContact(this.editedItem).then(() => {
                        this.snackbar.message = "Contact Successfully Save"
                        this.snackbar.show = true;
                        this.dialog = false;
                        this.resetSelectedItem();
                    }).catch(error => {
                        if(error.response && error.response.status){
                            ErrorHandler.handlerError(error.response.status, (message) => {
                                this.$refs.salesContactForm.showErrorMessage(message);
                            })
                        }else {
                            ErrorHandler.handlerError(503, (message) => {
                                this.$refs.salesContactForm.showErrorMessage(message);
                            })
                        }
                    }).finally(() => {
                        this.formLoading = false;
                    })
                }
            },
            close(){
                this.dialog=false
                setTimeout(() => {
                    this.resetSelectedItem()
                }, 300)
            },
            resetSelectedItem(){
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedItemIndex = -1
            },
            searchContacts({searchIn, searchFor}){

                this.searchFor = searchFor;
                this.searchIn = searchIn;

                console.log('Search', this.searchIn, this.searchFor)

                // This will trigger the watcher in the options.
                // With the SearchFor and SearchIn having a value, this will trigger the search in api
                this.options = Object.assign({}, this.defaultOptions);
            },
            resetSearch(){
                this.searchFor = '';
                this.searchIn = '';
                this.options = Object.assign({}, this.defaultOptions);
            },
            getContacts(options, searchOptions){
                console.log(searchOptions);
                this.loading = true;
                this.fetchSalesContacts({options, searchOptions}).then(() => {
                    this.loading = false;
                }).catch(error => {
                    console.error(error.response)
                    if(error.response && error.response.status){
                        ErrorHandler.handlerError(error.response.status, (message) => {
                            this.$emit('throwError', true, message);
                        })
                    }else {
                        console.error(error);
                        ErrorHandler.handlerError(503, (message) => {
                            this.$emit('throwError', true, message);
                        })
                    }
                }).finally(() => {
                    this.loading = false;
                })
            }
        },
        watch: {
            options: {
                handler(){
                    if(!this.isInitialLoad){
                        if(this.searchIn.trim() !== '' && this.searchFor.trim() !== '')
                        {
                            this.getContacts(this.options, {
                                searchFor: this.searchFor,
                                searchIn: this.searchIn
                            });
                        }else {
                            this.getContacts(this.options);
                        }
                    }
                },
                deep: true
            },
        },
        mounted() {
            this.$store.dispatch('setAppLoadingState', true)
            this.fetchSalesContacts({options:this.options}).then(() => {
                this.isInitialLoad = false;
            }).catch(error => {
                if(error.response && error.response.status){
                    console.error(error.response);
                    ErrorHandler.handlerError(error.response.status, (message) => {
                        this.$emit('throwError', true, message);
                    })
                }else {
                    console.error(error);
                    ErrorHandler.handlerError(503, (message) => {
                        this.$emit('throwError', true, message);
                    })
                }
            }).finally(() => {
                this.$store.dispatch('setAppLoadingState', false)
            })
        }
    }
</script>

<style scoped>

</style>