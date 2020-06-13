<template>
    <div>
        <v-card>
            <v-card-title id="table-header" >
                <SearchForm
                        :search-items="searchItems"
                        @search="searchSalesStaffs"/>
            </v-card-title>
            <v-data-table
                    :items="salesStaffs"
                    :headers="headers"
                    :options.sync="pageOptions"
                    :server-items-length="pagination.total"
                    :footer-props="footerProps"
                    :single-expand="true"
                    :loading="loading"
            ></v-data-table>
        </v-card>
    </div>
</template>

<script>
    import SearchForm from "../shared/SearchForm";
    import {mapActions, mapState} from "vuex";
    export default {
        name: "SalesStaffTable",
        components: {SearchForm},
        data(){
            return {
                loading: false,
                searchItems: [
                    {text: 'First Name', value: 'first_name'},
                    {text: 'Last Name', value: 'last_name'},
                    {text: 'Suburb', value: 'email'},
                ],
                headers: [
                    { text: 'First Name',value: 'firstName'},
                    { text: 'Last Name', value: 'lastName' },
                    { text: 'E-Mail', value: 'email' },
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
                    sortDesc: [true],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['firstName'],
                    sortDesc: [true],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
            }
        },
        computed: {
            ...mapState('salesStaffs', ['salesStaffs', 'pagination'])
        },
        methods: {
            ...mapActions('salesStaffs', ['fetchAllSalesStaff']),
            getSalesStaffs(pageOptions, searchOptions){
                if(!this.loading){
                    this.loading = true;
                    this.fetchAllSalesStaff({pageOptions, searchOptions}).then(() => {

                    }).catch(error => {
                        console.log(error)
                    }).finally(() => {
                        this.loading = false;
                    })
                }
            },
            searchSalesStaffs({searchFor, searchIn}){

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