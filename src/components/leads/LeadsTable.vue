<template>
    <div>
        <v-card>
            <v-card-title id="table-header" >
                Sales Leads
            </v-card-title>
            <v-data-table
                    :items="leads"
                    :options.sync="options"
                    :headers="headers"
                    :server-items-length="30"
                    :single-expand="true"
                    :loading="loading"
                    :footer-props="footerProps"
                    item-key="id"
                    class="elevation-0">
            </v-data-table>
        </v-card>

    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex';
    import ErrorHandler from "../../helpers/ErrorHandler";

    export default {
        name: "LeadsTable",
        data(){
            return {
                loading:false,
                headers: [
                    { text: 'Lead Name',value: 'number'},
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
            }
        },
        computed: {
            ...mapState('leads', ['leads'])
        },
        methods: {
            ...mapActions('leads', ['fetchLeads']),

            getLeads(){
                this.fetchLeads().then(() => {
                    console.log('Fetch LEads Complete')
                }).catch(error => {
                    console.log(error.response)
                })
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