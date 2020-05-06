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
            </v-data-table>
        </v-card>
        <v-btn bottom color="pink" dark fab fixed right >
            <v-icon  >add</v-icon>
        </v-btn>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex';
    import ErrorHandler from "../../helpers/ErrorHandler";
    import LeadSearchForm from "./LeadSearchForm";

    export default {
        name: "LeadsTable",
        components: {LeadSearchForm},
        data(){
            return {
                loading:false,
                headers: [
                    { text: 'Lead Number',value: 'number'},
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
                    sortBy: ['number'],
                    sortDesc: [false],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['number'],
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