<template>
    <v-card outlined :loading="loading">
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
        <PostcodeList :items="postcodes" :add="true" >
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
    import {mapState, mapActions} from 'vuex';
    import PostcodeList from "./PostcodeList";

    export default {
        name: "AllPostcode",
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
                }
            }
        },
        computed: {
            ...mapState('postcodes', ['postcodes', 'pagination'])
        },
        methods: {
            ...mapActions('postcodes', ['getPostcodes']),
            getAllPostcodes(){
                if(!this.loading){
                    this.loading = true;
                    this.getPostcodes({pageOptions: this.pageOptions,
                        searchOptions: this.searchOptions}).then(() => {
                        console.log('Got Postcodes')
                    }).catch(error => {
                        console.log('error on postcodes', error);
                    }).finally(() => {
                        this.loading = false;
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
                    this.getAllPostcodes();
                },
                deep: true
            },
            searchOptions: {
                handler(){
                    if(!this.loading && this.searchOptions.searchFor.length >= 2){
                        this.getAllPostcodes();
                    }
                },
                deep: true
            }
        },
        mounted() {
            if(this.postcodes.length === 0){
                this.getAllPostcodes();
            }
        }
    }
</script>

<style scoped>

</style>