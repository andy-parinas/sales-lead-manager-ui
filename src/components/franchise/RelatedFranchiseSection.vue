<template>
    <div>
        <div class="d-flex flex-column mt-12 mb-5">
            <h3 class="mb-3">Related Franchises</h3>
        </div>
        <v-card outlined min-height="100px" :loading="loading">
            <FranchiseList :franchises="relatedFranchises" ></FranchiseList>
        </v-card>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import FranchiseList from "./shared/FranchiseList";
    export default {
        name: "RelatedFranchiseSection",
        components: {FranchiseList},
        data(){
            return {
                loading: false,
                pageOptions: {
                    page: 1,
                    itemsPerPage: 5,
                    sortBy: ['type'],
                    sortDesc: [false],
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 5,
                    sortBy: ['type'],
                    sortDesc: [false],
                },
                searchOptions: {
                    searchFor: '',
                }
            }
        },
        computed: {
            ...mapState('franchises', ['selectedFranchise', 'relatedFranchises', 'relatedPagination']),
        },
        methods: {
            ...mapActions('franchises', ['getRelatedFranchises']),

            getFranchises(){
                this.loading = true;
                this.getRelatedFranchises({
                    franchiseId: this.selectedFranchise.id,
                    pageOptions: this.pageOptions,
                    searchOptions: this.searchOptions
                }).then(() => {
                    console.log('fetched')
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.loading = false;
                })
            }
        },
        watch: {
            selectedFranchise: {
                handler(){
                    if(this.selectedFranchise){
                        this.getFranchises();
                    }
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>