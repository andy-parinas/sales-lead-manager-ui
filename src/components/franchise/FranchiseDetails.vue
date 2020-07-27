<template>
    <v-card>
        <v-toolbar flat color="blue-grey" dark>
            <v-toolbar-title> Franchise Details </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text @click="$emit('goBack')">
                <v-icon>mdi-arrow-left-bold</v-icon>
                <span> Go Back </span>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-row v-if="franchise">
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-store</v-icon>
                    <span class="ml-2 caption font-weight-bold">Franchise Number:</span> <span class="ml-1"> {{franchise.franchiseNumber}} </span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-store</v-icon>
                    <span class="ml-2 caption font-weight-bold">Franchise Name: </span> <span class="ml-1"> {{franchise.name }} </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-btn small color="error" :disabled="selected.length === 0" >
                        Remove from Franchise
                    </v-btn>
                </v-col>

            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :footer-props="footerProps"
                    :items="postcodes"
                    :loading="loading"
                    :options.sync="pageOptions"
                    :server-items-length="pagination.total"
                    show-select
                    item-key="id"
                    @update:page="onPageOptionChanged"
                    @update:sort-by="onPageOptionChanged"
                    @update:sort-desc="onPageOptionChanged"
                    @update:items-per-page="onPageOptionChanged">

            </v-data-table>
        </v-card-text>
<!--        <pre>Selected {{selected}}</pre>-->
    </v-card>
</template>

<script>
    import PostcodeAPI from "../../api/PostcodeAPI";

    export default {
        name: "FranchiseDetails",
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
                    searchFor: '',
                    searchIn: ''
                },
                postcodes: [],
                pagination: {},
                loading: true,
                selected: []
            }
        },
        methods: {
            getFranchisePostcode(){
                this.loading = true;
                PostcodeAPI.getFranchisePostcodes(this.franchise.id, this.pageOptions, this.searchOptions).then(response => {
                    console.log(response)
                    this.postcodes = response.data
                    this.pagination = Object.assign({}, response.pagination)
                }).catch(error => {
                    console.log(error)

                }).finally(() => {
                    this.loading = false;
                })

            },
            onPageOptionChanged(){
                this.getFranchisePostcode();
            }
        },
        mounted() {
            if(this.franchise){
                this.getFranchisePostcode();
            }
        }
    }
</script>

<style scoped>

</style>