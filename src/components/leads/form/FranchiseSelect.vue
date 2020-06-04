<template>
    <v-autocomplete
        v-model="franchise"
        :search-input.sync="searchOptions.searchFor"
        :loading="loading"
        :items="franchises"
        hint="Enter 3 character of Franchise Number to Search"
        persistent-hint
        @keyup="searchOnKeyUp"
        @change="franchiseValueChange"
        label="Franchise Number"
        prepend-icon="mdi-store"
        no-filter
        cache-items
        clearable
        return-object
    >

    </v-autocomplete>
</template>

<script>

    import FranchiseAPI from "../../../api/FranchiseAPI";

    export default {
        name: "FranchiseSelect",
        data(){
            return {
                loading: false,
                pageOptions: {
                    sortBy: ['franchiseNumber'],
                    sortDesc: [false],
                },
                searchOptions: {
                    searchFor: '',
                },
                search: '',
                franchise: '',
                franchises: []
            }
        },
        methods: {
            getAllFranchises(){
                this.loading = true;
                FranchiseAPI.getAllFranchise(this.pageOptions,
                    this.searchOptions).then(response => {
                        console.log('FranchiseSelect', response.data)
                        this.franchises = response.data.map(franchise => {
                            return {
                                value: franchise.id,
                                text: `${franchise.franchiseNumber} - ${franchise.type}`
                            }
                        })
                }).catch(error => {
                    console.log(error.response)
                }).finally(() => {
                    this.loading = false;
                })
            },
            searchOnKeyUp(event){

                const excludedKeys = [
                    9,16,18,17, 112,113,114,115,116,117,118,119,120,121,122, 123,
                    36,35,144,20,45,33,34,27,37,38,39,40,91,13
                ]

                // Do not listen for the Tab Key
                if(event && !excludedKeys.includes(event.keyCode)){
                    if(this.searchOptions.searchFor && this.searchOptions.searchFor.length >= 3 && this.searchOptions.searchFor.trim() !== '' ){
                        this.getAllFranchises()
                    }
                }

            },
            franchiseValueChange(){
                this.$emit('onValueChanged', this.franchise)
            }
        },
        mounted() {
            //this.getAllFranchises();
        }

    }
</script>

<style scoped>

</style>