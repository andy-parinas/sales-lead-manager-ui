<template>
    <v-card outlined :loading="loading">
        <div class="mx-3 mt-5">
            <h3 class="mb-3">Franchise Postcodes</h3>
            <div class="d-flex">
                <v-text-field
                        v-model="searchOptions.searchFor"
                        class="mr-1"
                        placeholder="Search"
                        prepend-inner-icon="search"
                        filled
                        rounded
                        dense
                        hint="Enter 3 characters to search"
                        persistent-hint
                ></v-text-field>
                <v-btn @click="reset"
                       x-small fab text color="green darken-1" dark class="mt-1">
                    <v-icon >refresh</v-icon>
                </v-btn>
            </div>
        </div>
        <PostcodeList :items="postcodes" :remove="true" >
            <template v-slot:pagination>
                <v-pagination class="mt-2" v-if="pagination"
                              v-model="pageOptions.page"
                              :length="pagination.total_pages"
                              :total-visible="6"
                              :disabled="loading"
                ></v-pagination>
            </template>
        </PostcodeList>
    </v-card>
</template>

<script>
    import PostcodeList from "./PostcodeList";
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "FranchisePostcode",
        props: {
            franchise: {required: true}
        },
        components: {PostcodeList},
        data(){
            return {
                loading: false,
                pageOptions: {
                    page: 1,
                    itemsPerPage: 5,
                    sortBy: ['pcode'],
                    sortDesc: [false],
                },
                defaultPageOptions: {
                    page: 1,
                    itemsPerPage: 5,
                    sortBy: ['pcode'],
                    sortDesc: [false],
                },
                searchOptions: {
                    searchFor: '',
                },
            }
        },
        computed: {
            ...mapState('postcodes',{
                postcodes: state => state.franchisePostcodes,
                pagination: state => state.franchisePostcodePagination
            })
        },
        methods: {
            ...mapActions('postcodes', ['getFranchisePostcodes','clearFranchisePostcodes']),
            getAllFranchisePostcodes(franchiseId, pageOptions,searchOptions ){
               if(!this.loading){
                   this.loading = true;
                   this.getFranchisePostcodes({ franchiseId,  pageOptions, searchOptions }).then(() => {

                   }).catch(error => {
                       console.log(error)
                   }).finally(() => {
                       this.loading = false
                   })
               }
            },
            reset(){

            }
        },
        watch: {
            franchise: {
                handler(){
                    if(this.franchise){
                        console.log('watch', this.pageOptions)
                        this.getAllFranchisePostcodes(this.franchise.id, this.pageOptions, this.searchOptions);
                    }else {
                        this.clearFranchisePostcodes();
                    }
                },
                deep: true
            }
        },
        mounted() {
            if(this.franchise){
                this.getAllFranchisePostcodes(this.franchise.id, this.pageOptions, this.searchOptions);
            }
        }
    }
</script>

<style scoped>

</style>