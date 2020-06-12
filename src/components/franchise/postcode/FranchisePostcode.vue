<template>
    <v-card outlined :loading="loading" min-height="300px">
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
        <PostcodeList :items="postcodes" :remove="true"
                      :removing="removing"
                      @onRemoveClicked="detachPostcode">
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
    //import {mapState, mapActions} from 'vuex';
    import PostcodeAPI from "../../../api/PostcodeAPI";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";

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
                postcodes: [],
                pagination: null,
                removing: 0
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            getFranchisePostcodes(franchiseId, pageOptions,searchOptions){
                if(!this.loading) {
                    this.loading = true;
                    PostcodeAPI.getFranchisePostcodes(franchiseId, pageOptions, searchOptions).then(response => {
                        this.postcodes = response.data;
                        this.pagination = response.pagination;
                    }).catch(error => {
                        this.handleError(error);
                    }).finally(() => {
                        this.loading = false
                    })
                }

            },
            updatePostcodes(postcode){
                this.postcodes.push(postcode)
            },
            detachPostcode(postcode){
                if(this.franchise && postcode){
                    this.removing = postcode.id;
                    PostcodeAPI.removePostcodeFromFranchise(this.franchise.id, postcode.id).then(response => {
                        this.$emit('onPostcodeRemoved', response.data)
                        const updatedPostcodes = this.postcodes.filter(pcode => pcode.id !== response.data.id)
                        this.postcodes = updatedPostcodes;
                    }).catch(error => {
                        this.handleError(error)
                    }).finally(() => {
                        this.removing = 0
                    })
                }
            },
            reset(){
                if(!this.loading){
                    this.searchOptions.searchFor = ''
                    this.pageOptions = Object.assign({}, this.defaultPageOptions)
                }
            }
        },
        watch: {
            pageOptions: {
                handler(){
                    if(this.franchise) {
                        this.getFranchisePostcodes(this.franchise.id, this.pageOptions, this.searchOptions)
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
                        this.getFranchisePostcodes(this.franchise.id, this.pageOptions, this.searchOptions);
                    }else {
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
                this.getFranchisePostcodes(this.franchise.id, this.pageOptions, this.searchOptions);
            }
        }
    }
</script>

<style scoped>

</style>