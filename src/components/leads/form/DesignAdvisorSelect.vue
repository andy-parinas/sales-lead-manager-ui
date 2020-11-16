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
    import ErrorHandlerMixins from "@/mixins/ErrorHandler";
    import EventBus from "@/helpers/EventBus";

    export default {
        name: "DesignAdvisorSelect",
        props: ['isRequired', 'designAdvisor'],
        data(){
            return {
                salesStaff: '',
                salesStaffs: [],
                loading: false,
                search: '',


            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {

            searchSalesStaff(){
               if(!this.loading){
                   this.loading = true;
                   SalesStaffAPI.search(this.search).then(response => {
                       this.salesStaffs = response.data;
                   }).catch(error => {
                       this.handleError(error)
                   }).finally(() => {
                       this.loading = false;
                   })
               }
            },

            findSalesStaffById(salesStaffId){
                this.loading = true;
                SalesStaffAPI.findSalesStaffById(salesStaffId).then(response => {
                    this.salesStaffs = [response.data];
                    this.salesStaff = response.data.id;
                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.loading = false;
                })
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
                EventBus.$emit('DESIGN_ADVISOR_SELECT_CHANGED', this.salesStaff);
                this.$emit('onValueChanged', this.salesStaff)
            }
        },

        mounted() {
            if (this.designAdvisor){
                //this.findSalesStaffById(this.designAdvisorId);
                this.salesStaffs = [this.designAdvisor]
                this.salesStaff = this.designAdvisor.id
            }
        }

    }
</script>

<style scoped>

</style>