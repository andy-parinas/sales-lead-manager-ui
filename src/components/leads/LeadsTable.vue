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
                    item-key="id"
                    class="elevation-0">

                <template v-slot:item.leadNumber="{item}">
                    <span><v-icon small color="green" class="mr-2">mdi-check-decagram</v-icon></span>
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
                    <v-icon small class="mr-5" @click="showLead(item)"> mdi-forward </v-icon>
                </template>

            </v-data-table>
        </v-card>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex';
    import ErrorHandler from "../../helpers/ErrorHandler";
    import LeadSearchForm from "./LeadSearchForm";
    import ChipOutcome from "./ChipOutcome";

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
                    "items-per-page-options": [5,10,15,20]
                },
                options: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['leadNumber'],
                    sortDesc: [false],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['leadNumber'],
                    sortDesc: [false],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                searchIn: '',
                searchFor: '',
                isInitialLoad: true
            }
        },
        computed: {
            ...mapState('leads', ['leads', 'meta'])
        },
        methods: {
            ...mapActions('leads', ['fetchLeads']),

            getLeads(options, searchOptions){
                this.loading = true;
                this.fetchLeads({options, searchOptions}).then(() => {
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
            },
            searchLeads({searchIn, searchFor}){
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
            showLead(item){
               this.$emit('showDetail', item.leadId);
            }
        },
        watch: {
            options: {
                handler(){
                    if(!this.isInitialLoad){
                        if(this.searchIn.trim() !== '' && this.searchFor.trim() !== '')
                        {
                            this.getLeads(this.options, {
                                searchFor: this.searchFor,
                                searchIn: this.searchIn
                            });
                        }else {
                            this.getLeads(this.options);
                        }
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.$store.dispatch('setAppLoadingState', true)
            this.fetchLeads({options:this.options}).then(() => {
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