<template>
    <v-card outlined>
        <div class="mx-3 mt-5">
            <h3 class="mb-3">Available Franchises</h3>
            <v-text-field
                    placeholder="Search"
                    prepend-inner-icon="search"
                    filled
                    rounded
                    dense
            ></v-text-field>
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
            ></v-pagination>
            </template>
        </FranchiseList>
    </v-card>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import FranchiseList from "./shared/FranchiseList";


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
                searchOptions: {
                    searchFor: '',
                }
            }
        },
        computed: {
            ...mapState('franchises', ['franchises', 'pagination']),
            ...mapState('users', [ 'selectedUser'])
        },
        methods: {
            ...mapActions('franchises', ['getFranchises']),

            getAllFranchises(){
                this.loading = true;
                this.getFranchises({pageOptions: this.pageOptions,
                    searchOptions: this.searchOptions}).then(() => {

                        console.log('Frachises acquired')
                }).catch(error => {

                    console.log(error);
                }).finally(() => {
                    this.loading = false;
                })


            },

            addToUsersFranchise(item){
                console.log(item);
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