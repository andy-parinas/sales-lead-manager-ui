<template>
    <v-card outlined>
        <div class="mx-3 mt-5">
            <h3 class="mb-3">Users Franchises</h3>
            <v-text-field
                    placeholder="Search"
                    prepend-inner-icon="search"
                    filled
                    rounded
                    dense
            ></v-text-field>
        </div>
        <FranchiseList :items="franchises" :loading="loading"
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
                searchOptions: {
                    searchFor: '',
                }

            }
        },
        computed: {
            ...mapState('users', ['franchises', 'selectedUser', 'franchisePagination'])
        },
        methods: {
            ...mapActions('users', ['getUsersFranchises']),
            getFranchises(){
                if(this.selectedUser && Object.keys(this.selectedUser).length > 0){

                    this.loading = true;

                    this.getUsersFranchises({
                        userId: this.selectedUser.id,
                        pageOptions: this.pageOptions,
                        searchOptions: this.searchOptions
                    }).then(() => {
                        console.log('done fetching')
                    }).catch(error => {
                        console.log(error)
                    }).finally(() => {
                        this.loading = false;
                    })
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