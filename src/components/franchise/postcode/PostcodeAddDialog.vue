<template>
    <v-card>
        <DialogHeader title="Add Postcodes">
            <template v-slot:action>
                <v-btn icon @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text>
            <div class="d-flex align-center">
                <v-text-field
                        v-model="searchOptions.search"
                        class="mr-1"
                        placeholder="Search"
                        prepend-inner-icon="search"
                ></v-text-field>
                <v-btn @click="reset" class="mx-3"
                       small color="green darken-1" dark>
                    Refresh
                </v-btn>
            </div>

            <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :footer-props="footerProps"
                    :items="postcodes"
                    :loading="loading"
                    :options.sync="pageOptions"
                    :server-items-length="pagination.total"
                    show-select
                    @update:page="onPageOptionChanged"
                    @update:sort-by="onPageOptionChanged"
                    @update:sort-desc="onPageOptionChanged"
                    @update:items-per-page="onPageOptionChanged">

            </v-data-table>
        </v-card-text>

    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import PostcodeAPI from "../../../api/PostcodeAPI";
    export default {
        name: "PostcodeAddDialog",
        components: {DialogHeader},
        props: ['franchise'],
        data(){
            return {
                headers: [
                    { text: 'Postcode',value: 'postcode'},
                    { text: 'Suburb', value: 'locality' },
                    { text: 'State', value: 'state' },
                ],
                footerProps: {
                    "items-per-page-options": [5,10,15,20],
                    disablePagination: false,
                    disableItemsPerPage : false
                },
                pageOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['postcode'],
                    sortDesc: [false],
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['postcode'],
                    sortDesc: [false],
                },
                searchOptions: {
                    search: '',
                },
                postcodes: [],
                pagination: {},
                loading: false,
                selected: []
            }
        },
        methods: {
            getAvailablePostcodes(){
                this.loading = true;
                PostcodeAPI.getAvailableFranchisePostcode(this.franchise.id,
                    this.pageOptions, this.searchOptions).then(response => {
                    this.postcodes = response.data;
                    this.pagination = Object.assign({}, response.pagination)
                    console.log(response)
                }).catch(error => {
                    console.log(error.response)
                }).finally(() => {
                    this.loading = false
                })


            },
            onPageOptionChanged(){
                this.getAvailablePostcodes();
            },
            reset(){
                this.selected = [];
                this.pageOptions = Object.assign({}, this.defaultOptions);
                this.searchOptions.search = '';

                this.getAvailablePostcodes();
            }
        },
        watch: {
            searchOptions: {
                handler(){
                    if(!this.loading && this.searchOptions.search.length >= 4){
                        this.pageOptions = Object.assign({}, this.defaultPageOptions)
                        this.getAvailablePostcodes();
                    }
                },
                deep: true
            }
        },
        mounted() {
            if(this.franchise){
                this.getAvailablePostcodes();
            }
        }
    }
</script>

<style scoped>

</style>