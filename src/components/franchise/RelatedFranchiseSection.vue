<template>
    <div>
        <div class="d-flex flex-column mt-12 mb-5">
            <h3 class="mb-3">Related Franchises</h3>
<!--            <div class="d-flex">-->
<!--                <v-text-field-->
<!--                        v-model="searchOptions.searchFor"-->
<!--                        class="mr-1"-->
<!--                        placeholder="Search"-->
<!--                        prepend-inner-icon="search"-->
<!--                        filled-->
<!--                        rounded-->
<!--                        dense-->
<!--                ></v-text-field>-->
<!--                <v-btn-->
<!--                        x-small fab text color="green darken-1" dark class="mt-1">-->
<!--                    <v-icon >refresh</v-icon>-->
<!--                </v-btn>-->
<!--            </div>-->
        </div>
        <v-card outlined min-height="100px">
            <FranchiseList ></FranchiseList>
        </v-card>
    </div>
</template>

<script>
    import FranchiseList from "../admin/users/shared/FranchiseList";
    export default {
        name: "RelatedFranchiseSection",
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
    }
</script>

<style scoped>

</style>