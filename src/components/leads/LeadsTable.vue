<template>
    <div class="mb-12">
        <v-card>
            <v-card-title id="table-header" >
                <LeadSearchForm  @search="searchLeads"
                                 @reset="resetSearch" />
            </v-card-title>
            <v-data-table
                    :items="leads"
                    :options.sync="options"
                    :headers="headers"
                    :server-items-length="meta.total"
                    :single-expand="true"
                    :loading="loading"
                    :footer-props="footerProps"
                    @update:page="changeOptions"
                    @update:sort-by="changeOptions"
                    @update:sort-desc="changeOptions"
                    @update:items-per-page="changeOptions"
                    item-key="id"
                    class="elevation-0">

                <template v-slot:item.leadNumber="{item}">

                    <span>{{ item.leadNumber }}</span>
                    <span v-if="item.postcodeStatus === 'outside_of_franchise'" >
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                 <v-icon v-on="on" small color="orange" class="ml-2">mdi-alert-circle-outline</v-icon>
                            </template>
                            <span> Outside of Franchise </span>
                        </v-tooltip>

                    </span>
                </template>

                <template v-slot:item.leadDate="{item}">
                    <span>{{item.leadDate | formatDate }}</span>
                </template>

                <template v-slot:item.outcome="{item}">
                    <ChipOutcome :outcome="item.outcome" :small="true" />
                </template>

                <template v-slot:item.actions="{item}">
                   <v-container>
                       <v-row class="justify-sm-start">
                           <v-btn v-if="isHeadOffice"
                                   x-small fab text dark color="error" class="mr-3" @click="showDeleteConfirmation(item)">
                               <v-icon small > mdi-trash-can-outline </v-icon>
                           </v-btn>
                           <v-btn x-small fab text dark color="accent" @click="showLead(item)" :loading="item.leadId === selectedId" >
                               <v-icon small > mdi-file-outline </v-icon>
                           </v-btn>
                       </v-row>
                   </v-container>

                </template>

            </v-data-table>
        </v-card>




        <v-dialog v-model="deleteDialog" persistent max-width="650" class="px-2 py-5">
            <v-card v-if="forDeletionItem">
                <v-card-title class="headline">Delete Lead: {{ forDeletionItem.leadNumber }}  ?</v-card-title>
                <v-card-text>
                    <p class="body-1 font-weight-medium" > {{ forDeletionItem.firstName }} {{ forDeletionItem.lastName }} </p>
                    <p class="body-2 font-weight-medium">{{ forDeletionItem.suburb }}, {{ forDeletionItem.state }}, {{ forDeletionItem.postcode }}</p>
                    <p class="subtitle-1  red--text">You won't be able to recover this Sales Contact once deleted.</p>
                    <v-alert v-if="deleteError" text prominent type="error" icon="mdi-alert">
                        <v-row align="center">
                            <v-col class="grow">{{ deleteError }}</v-col>
                            <v-col class="shrink">
                                <v-btn @click="deleteError = null"
                                       text fab small color="red">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-alert>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" small dark @click="onCloseDelete" >Cancel</v-btn>
                    <v-btn color="red darken-1" small dark :loading="deleting" @click="onDelete" >
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>



    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex';
    //import ErrorHandler from "../../helpers/ErrorHandler";
    import LeadSearchForm from "./LeadSearchForm";
    import ChipOutcome from "./ChipOutcome";
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";

    export default {
        name: "LeadsTable",
        components: {LeadSearchForm, ChipOutcome},
        data(){
            return {
                loading:false,
                headers: [
                    { text: 'Lead Number',value: 'leadNumber'},
                    { text: 'Lead Date',value: 'leadDate'},
                    { text: 'First Name',value: 'firstName'},
                    { text: 'Last Name', value: 'lastName' },
                    { text: 'Suburb', value: 'suburb' },
                    { text: 'State', value: 'state' },
                    { text: 'Postcode', value: 'postcode' },
                    { text: 'Outcome', value: 'outcome' },
                    { text: 'Franchise', value: 'franchiseNumber' },
                    { text: 'Actions', value: 'actions', sortable: false }
                ],
                footerProps: {
                    "items-per-page-options": [5,10,15,20],
                    disablePagination: false,
                    disableItemsPerPage : false
                },
                options: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['leadDate'],
                    sortDesc: [true],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['leadDate'],
                    sortDesc: [true],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                searchIn: '',
                searchFor: '',
                isInitialLoad: true,
                dateToday: new Date().toISOString().substr(0, 10),
                selectedId: '',
                deleteDialog: false,
                forDeletionItem: null,
                deleting: false,
                deleteError: null
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('leads', ['leads', 'meta']),
            isHeadOffice(){
                const userType = this.$store.state.auth.currentUser.userType;
                return  userType === 'head_office';
            },
        },
        methods: {
            ...mapActions('leads', ['fetchLeads', 'deleteLead']),
            ...mapActions(['setSuccessMessage']),
            getLeads(options, searchOptions){

                if(!this.loading){ //Make sure to avoid multiple request when request is already sent
                    this.loading = true;
                    this.$set(this.footerProps, 'disablePagination', true)
                    this.$set(this.footerProps, 'disableItemsPerPage', true)

                    this.fetchLeads({options, searchOptions}).then(() => {
                        this.loading = false;
                    }).catch(error => {
                        this.handleError(error);
                    }).finally(() => {
                        this.loading = false;
                        this.$set(this.footerProps, 'disablePagination', false)
                        this.$set(this.footerProps, 'disableItemsPerPage', false)
                    })
                }

            },
            showDeleteConfirmation(item){
                this.deleteDialog = true;
                this.forDeletionItem = item
            },
            onDelete(){
                if(this.forDeletionItem){
                    this.deleting = true;
                    this.deleteLead(this.forDeletionItem.leadId).then(() => {
                        this.onCloseDelete();
                        this.changeOptions();
                        this.setSuccessMessage('Lead Successfully Deleted')
                    }).catch(error => {
                        this.handleError(error);
                    }).finally(() => {
                        this.deleting = false
                    })
                }
            },
            onCloseDelete(){
                this.deleteDialog = false;
                this.forDeletionItem = null
            },
            searchLeads({searchIn, searchFor}){
                this.searchFor = searchFor;
                this.searchIn = searchIn;

                // Reset the page options at the start of the search
                this.options = Object.assign({}, this.defaultOptions);

                if(this.searchIn.trim() !== '' && this.searchFor.trim() !== '')
                {
                    this.getLeads(this.options, {
                        searchFor: this.searchFor,
                        searchIn: this.searchIn
                    });
                }

            },
            resetSearch(){
                this.searchFor = '';
                this.searchIn = '';

                this.options = Object.assign({}, this.defaultOptions);
                //this.changePageOptions(this.defaultOptions);
                this.getLeads(this.defaultOptions);

            },
            showLead(item){
                this.selectedId = item.leadId
                this.$emit('showDetail', item.leadId);
            },
            changeOptions(){

                if(this.searchIn.trim() !== '' && this.searchFor.trim() !== '')
                {
                    this.getLeads(this.options, {
                        searchFor: this.searchFor,
                        searchIn: this.searchIn
                    });
                }else {
                    this.getLeads(this.options);
                }
            },
            stopLoading(){
                this.selectedId = ''
            }
        },
        async mounted() {
                this.getLeads(this.options);

        }
    }
</script>

<style scoped>

</style>