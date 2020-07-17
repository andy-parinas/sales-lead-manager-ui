<template>
    <div>
        <v-card>
            <v-card-title id="table-header" >
                <FranchiseSearchForm
                        @search="searchFranchise"
                        @reset="resetSearch" />
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="franchises"
                    :footer-props="footerProps"
                    :server-items-length="pagination.total"
                    :loading="loading"
                    @update:page="onPageOptionChanged"
                    @update:sort-by="onPageOptionChanged"
                    @update:sort-desc="onPageOptionChanged"
                    @update:items-per-page="onPageOptionChanged">


                <template v-slot:item.type="{item}">
                    <ChipFranchiseType :franchise-type="item.type" />
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-container>
                        <v-row class="justify-sm-start">
                            <v-btn x-small fab text dark color="error" class="mr-3"   @click="deleteItem(item)">
                                <v-icon small >mdi-trash-can-outline </v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="accent" @click="editFranchise(item)" >
                                <v-icon small> mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="success" class="ml-3" @click="showFranchise(item)">
                                <v-icon small>mdi-arrow-right-bold</v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>
                </template>


            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    import FranchiseSearchForm from "./FranchiseSearchForm";
    import {mapState, mapActions} from 'vuex'
    import ChipFranchiseType from "./shared/ChipFranchiseType";

    export default {
        name: "FranchiseTable",
        components: {ChipFranchiseType, FranchiseSearchForm},
        data(){
            return{
                loading: false,
                pageOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['id'],
                    sortDesc: [false],
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['id'],
                    sortDesc: [false],
                },
                searchOptions: {
                    searchFor: '',
                    searchIn: ''
                },
                searchFor: '',
                searchIn: '',
                headers: [
                    { text: 'Franchise Number',value: 'franchiseNumber'},
                    { text: 'Franchise Name', value: 'name' },
                    { text: 'Franchise Type', value: 'type' },
                    { text: 'Parent Franchise', value: 'parent' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                footerProps: {
                    "items-per-page-options": [5,10,15,20],
                    disablePagination: false,
                    disableItemsPerPage : false
                },
            }
        },
        computed: {
            ...mapState('franchises', ['franchises', 'pagination'])
        },
        methods: {
            ...mapActions('franchises', ['getFranchises', 'setSelectedFranchise']),
            getAllFranchises(pageOptions, searchOptions){
                this.loading = true;
                this.getFranchises({pageOptions,searchOptions}).then(() => {

                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.loading = false;
                })
            },
            searchFranchise(){

            },
            resetSearch(){

            },
            deleteItem(){

            },
            editFranchise(){

            },
            showFranchise(){

            },
            onPageOptionChanged(){
                if(this.searchIn.trim() !== '' && this.searchFor.trim() !== '')
                {
                    this.getAllFranchises(this.pageOptions, {
                        searchFor: this.searchFor,
                        searchIn: this.searchIn
                    });
                }else {
                    this.getAllUsers(this.pageOptions);
                }
            }
        },
        mounted() {
            this.getAllFranchises(this.pageOptions,this.searchOptions);
        }
    }
</script>

<style scoped>

</style>