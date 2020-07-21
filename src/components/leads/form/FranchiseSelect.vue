<template>
    <div>
        <v-autocomplete
                v-model="franchiseId"
                :items="franchises"
                :search-input.sync="searchOptions.searchFor"
                :loading="loading"
                :rules="required? [v => !!v || 'This field is required'] : []"
                item-value="id"
                item-text="title"
                color="black"
                label="Franchise Number"
                no-filter
                prepend-icon="mdi-store"
                hint="Enter 3 characters to search"
                persistent-hint
                @keyup="searchOnKeyUp"
                @change="franchiseValueChange"
                return-object
        ></v-autocomplete>
    </div>
</template>

<script>

    import FranchiseAPI from "../../../api/FranchiseAPI";

    export default {
        name: "FranchiseSelect",
        props: ['initialData', 'required'],
        data(){
            return {
                loading: false,
                pageOptions: {
                    sortBy: ['franchise_number'],
                    sortDesc: [false],
                    itemsPerPage: 50 //Will ensure to have enough items returned.
                },
                searchOptions: {
                    searchFor: '',
                    searchIn: 'franchise_number'
                },
                search: '',
                franchiseId: '',
                franchises: []
            }
        },
        methods: {
            getAllFranchises(){
                this.loading = true;
                FranchiseAPI.getAllSubFranchises(this.pageOptions,
                    this.searchOptions).then(response => {
                    this.franchises = response.data
                    console.log(response.data)
                }).catch(error => {
                    console.log(error.response)
                }).finally(() => {
                    this.loading = false;
                })

            },

            getFranchiseById(id){
                this.loading = true;
                FranchiseAPI.getFranchiseById(id).then(response => {
                    this.franchises = [response.data];
                    this.franchiseId = response.data.id
                }).catch(error => {
                    console.log(error)
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
                this.$emit('onValueChanged', this.franchiseId)
            }
        },
        watch: {
            initialData: {
                handler(){
                    if(this.initialData){
                        this.getFranchiseById(this.initialData)
                    }else {
                        this.franchises = [];
                        this.franchiseId = ''
                    }
                },
                deep: true
            }
        },
        mounted() {

            if(this.initialData){
                this.franchise = Object.assign({}, this.initialData)
                this.franchises.push(this.franchise)
            }
        }

    }
</script>

<style scoped>

</style>