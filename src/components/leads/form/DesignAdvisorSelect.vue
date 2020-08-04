<template>
    <div> <v-autocomplete
            v-model="salesStaff"
            :items="salesStaffs"
            :search-input.sync="search"
            :loading="loading"
            :rules="isRequired? [v => !!v || 'This field is required'] : []"
            clearable
            item-value="id"
            item-text="title"
            color="black"
            label="Design Advisor"
            no-filter
            prepend-icon="mdi-card-account-details"
            hint="Enter 3 characters to search"
            persistent-hint
            @keyup="searchOnKeyUp"
            @change="salesStaffValueChange"
            return-object
    ></v-autocomplete>
    </div>
</template>

<script>
    import SalesStaffAPI from "../../../api/SalesStaffAPI";

    export default {
        name: "DesignAdvisorSelect",
        props: ['isRequired'],
        data(){
            return {
                salesStaff: '',
                salesStaffs: [],
                loading: false,
                search: '',


            }
        },
        methods: {

            searchSalesStaff(){
               if(!this.loading){
                   this.loading = true;
                   SalesStaffAPI.search(this.search).then(response => {
                       console.log(' staff: ', response.data);
                       this.salesStaffs = response.data;
                   }).catch(error => {
                       console.log(error.response)
                   }).finally(() => {
                       this.loading = false;
                   })
               }
            },


            searchOnKeyUp(event){

                const excludedKeys = [
                    9,16,18,17, 112,113,114,115,116,117,118,119,120,121,122, 123,
                    36,35,144,20,45,33,34,27,37,38,39,40,91,13
                ]

                if(event && !excludedKeys.includes(event.keyCode)){
                    if(this.search && this.search.length >= 3 && this.search.trim() !== '' ){
                        this.searchSalesStaff()
                    }
                }

            },
            salesStaffValueChange(){
                this.$emit('onValueChanged', this.salesStaff)
            }
        }
    }
</script>

<style scoped>

</style>