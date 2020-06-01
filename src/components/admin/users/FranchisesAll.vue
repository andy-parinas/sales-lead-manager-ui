<template>
    <v-card outlined>
        <div class="mx-3 mt-5">
            <h3 class="mb-3">Available Franchises</h3>
            <div class="d-flex">
                <v-text-field
                        v-model="searchOptions.searchFor"
                        class="mr-1"
                        placeholder="Search"
                        prepend-inner-icon="search"
                        filled
                        rounded
                        dense
                ></v-text-field>
                <v-btn @click="reset"
                        x-small fab text color="green darken-1" dark class="mt-1">
                    <v-icon >refresh</v-icon>
                </v-btn>
            </div>
        </div>
        <FranchiseList :items="franchises"
                       :loading="loading"
                       @onAddClicked="addToUsersFranchise"
                       add
        >
            <template v-slot:pagination>
            <v-pagination class="mt-2" v-if="pagination"
                          v-model="pageOptions.page"
                          :length="pagination.total_pages"
                          :total-visible="6"
                          :disabled="loading"
            ></v-pagination>
            </template>
        </FranchiseList>
    </v-card>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import FranchiseList from "./shared/FranchiseList";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";


    export default {
        name: "FranchisesAll",
        components: {FranchiseList},
        data(){
            return {
                loading: false,
                pageOptions: {
                    page: 1,
                    itemsPerPage: 5,
                    sortBy: ['name'],
                    sortDesc: [false],
                },
                defaultPageOptions: {
                    page: 1,
                    itemsPerPage: 5,
                    sortBy: ['name'],
                    sortDesc: [false],
                },
                searchOptions: {
                    searchFor: '',
                }
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('franchises', ['franchises', 'pagination']),
            ...mapState('users', [ 'selectedUser'])
        },
        methods: {
            ...mapActions('franchises', ['getFranchises']),
            ...mapActions('users', ['attachFranchise']),
            getAllFranchises(){
                this.loading = true;
                this.getFranchises({pageOptions: this.pageOptions,
                    searchOptions: this.searchOptions}).then(() => {

                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.loading = false;
                })

            },

            addToUsersFranchise(item){
                console.log(item);
                this.loading = true;
                this.attachFranchise({userId: this.selectedUser.id, franchiseId: item.id}).then(() => {
                    console.log('success')
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.loading = false;
                })
            },

            reset(){
                if(!this.loading){
                    this.searchOptions.searchFor = ''
                    this.pageOptions = Object.assign({}, this.defaultPageOptions)

                    //this.getAllFranchises();
                }
            }
        },
        watch: {
            selectedUser: {
                handler(){
                    if(this.selectedUser && Object.keys(this.selectedUser).length > 0 && this.franchises.length === 0) {
                        this.getAllFranchises()
                    }
                },
                deep: true
            },
            pageOptions: {
                handler(){
                    if(!this.loading){
                        this.getAllFranchises();
                    }
                },
                deep: true
            },
            searchOptions: {
                handler(){
                    if(!this.loading && this.searchOptions.searchFor.length >= 2){
                        this.getAllFranchises();
                    }
                },
                deep: true
            }
        },
        mounted() {
            if(this.selectedUser && Object.keys(this.selectedUser).length > 0 && this.franchises.length === 0) {
                this.getAllFranchises();
            }
        }
    }
</script>

<style scoped>

</style>