<template>
    <v-card outlined>
        <div class="mx-3 mt-5">
            <h3 class="mb-3">Users Franchises</h3>
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
                    <v-icon>refresh</v-icon>
                </v-btn>
            </div>
        </div>
        <FranchiseList @onRemoveClicked="removeFranchise"
                    :items="franchises" :loading="loading"
                    remove >
            <template v-slot:pagination>
                <v-pagination class="mt-2" v-if="franchisePagination"
                              v-model="pageOptions.page"
                              :length="franchisePagination.total_pages"
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
        name: "FranchisesUsers",
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
            ...mapState('users', ['franchises', 'selectedUser', 'franchisePagination'])
        },
        methods: {
            ...mapActions('users', ['getUsersFranchises', 'detachFranchise']),
            getFranchises(){
                if(this.selectedUser && Object.keys(this.selectedUser).length > 0){

                    this.loading = true;

                    this.getUsersFranchises({
                        userId: this.selectedUser.id,
                        pageOptions: this.pageOptions,
                        searchOptions: this.searchOptions
                    }).then(() => {

                    }).catch(error => {
                        this.handleError(error)
                    }).finally(() => {
                        this.loading = false;
                    })
                }

            },
            removeFranchise(item){
                this.loading = true;
                this.detachFranchise({userId: this.selectedUser.id,
                    franchiseId: item.id}).then(() => {

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
                    console.log('FranchiseUsers Change on selectedUser')
                    this.getFranchises()
                },
                deep: true
            },
            pageOptions: {
                handler(){
                    if(!this.loading){
                        this.getFranchises();
                    }
                },
                deep: true
            },
            searchOptions: {
                handler(){
                    if(!this.loading && this.searchOptions.searchFor.length >= 2){
                        this.getFranchises();
                    }
                },
                deep: true
            }
        },
        mounted() {
            console.log('FranchiseUsers mounted')
            this.getFranchises()
        }
    }
</script>

<style scoped>

</style>