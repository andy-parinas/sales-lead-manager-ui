<template>
    <v-card outlined :loading="loading" min-height="300px">
        <div class="mx-3 mt-5">
            <h3 class="mb-3">Available Postcodes</h3>
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
        <PostcodeList
                :items="postcodes"
                :add="true"
                :adding="adding"
            @onAddClicked="addPostcodeToFranchise">
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
    import PostcodeAPI from "../../../api/PostcodeAPI";
    import PostcodeList from "./PostcodeList";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";

    export default {
        name: "AllPostcode",
        components: {PostcodeList},
        props: {
            franchise: {required: true}
        },
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
                postcodes: [],
                pagination: null,
                adding: 0
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            getAllAvailablePostcodes(pageOptions, searchOptions){
                if(!this.loading) {
                    this.loading = true
                    PostcodeAPI.getAll(pageOptions, searchOptions).then(response => {
                        this.postcodes = response.data;
                        this.pagination = response.pagination;
                    }).catch(error => {
                        console.log(error)
                    }).finally(() => {
                        this.loading = false;
                    })
                }
            },
            getParentPostcodes(parentId, pageOptions, searchOptions ){
                if(!this.loading) {
                    this.loading = true
                    PostcodeAPI.getFranchisePostcodes(parentId, pageOptions, searchOptions).then(response => {
                        this.postcodes = response.data;
                        this.pagination = response.pagination;
                    }).catch(error => {
                        console.log(error)
                    }).finally(() => {
                        this.loading = false;
                    })
                }
            },
            getPostcodes(parentId, pageOptions, searchOptions ){
                if(this.franchise && this.franchise.parentId === null){
                    this.getAllAvailablePostcodes(pageOptions, searchOptions)
                }

                if(this.franchise && this.franchise.parentId !== null){
                    this.getParentPostcodes(parentId, pageOptions, searchOptions);
                }
            },
            reset(){
                if(!this.loading){
                    this.searchOptions.searchFor = ''
                    this.pageOptions = Object.assign({}, this.defaultPageOptions)
                }
            },
            addPostcodeToFranchise(postcode){
                if(this.franchise && postcode){
                    this.adding = postcode.id;
                    PostcodeAPI.addPostcodeToFranchise(this.franchise.id, postcode.id).then(response => {
                        this.$emit('onPostcodeAdded', response.data)
                    }).catch(error => {
                        this.handleError(error)
                    }).finally(() => {
                        this.adding = 0
                    })
                }
            }
        },
        watch: {
            pageOptions: {
                handler(){
                    if(this.franchise) {
                        this.getPostcodes(this.franchise.parentId, this.pageOptions, this.searchOptions)
                    }
                },
                deep: true
            },
            searchOptions: {
                handler(){
                    if(!this.loading && this.searchOptions.searchFor.length >= 2){
                        this.pageOptions = Object.assign({}, this.defaultPageOptions)
                    }
                },
                deep: true
            },
            franchise: {
                handler(){
                    if(this.franchise){
                        this.getPostcodes(this.franchise.parentId, this.pageOptions, this.searchOptions)
                    }else {
                        //this.clearFranchisePostcodes();
                        this.postcodes = [];
                        this.pagination = null;
                        this.reset();
                    }
                },
                deep: true
            }
        },
        mounted() {
            if(this.franchise){
                this.getPostcodes(this.franchise.parentId, this.pageOptions, this.searchOptions);
            }
        }
    }
</script>

<style scoped>

</style>