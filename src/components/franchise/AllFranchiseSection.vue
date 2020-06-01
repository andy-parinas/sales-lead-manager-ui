<template>
    <div>
        <div class="d-flex flex-column">
            <h3 class="mb-3">All Franchises</h3>
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
                <v-btn
                       x-small fab text color="green darken-1" dark class="mt-1">
                    <v-icon >refresh</v-icon>
                </v-btn>
            </div>
        </div>
        <v-card outlined>
            <FranchiseList :franchises="franchises" ></FranchiseList>
        </v-card>
        <v-pagination class="mt-2"
                      v-model="pageOptions.page"
                      :length="4"
                      :total-visible="6"
                      :disabled="loading"
        ></v-pagination>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex'
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";
    import FranchiseList from "./shared/FranchiseList";

    export default {
        name: "AllFranchiseSection",
        components: {FranchiseList},
        data(){
            return {
                loading: false,
                pageOptions: {
                    page: 1,
                    itemsPerPage: 5,
                    sortBy: ['franchiseNumber'],
                    sortDesc: [false],
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 5,
                    sortBy: ['franchiseNumber'],
                    sortDesc: [false],
                },
                searchOptions: {
                    searchFor: '',
                }
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('franchises', ['franchises'])
        },
        methods: {
            ...mapActions('franchises', ['getFranchises']),

            getAllFranchises(){
                this.loading = true;
                this.getFranchises({pageOptions: this.pageOptions,
                    searchOptions: this.searchOptions}).then(() => {

                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.loading = false;
                })
            }
        },
        mounted() {
            this.getAllFranchises();
        }
    }
</script>

<style scoped>

</style>