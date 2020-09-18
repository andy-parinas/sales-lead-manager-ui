<template>
    <div>
        <v-autocomplete
            v-model="tradeStaff"
            :items="tradeStaffs"
            :search-input.sync="search"
            :loading="loading"
            :rules="isRequired? [v => !!v || 'This field is required'] : []"
            clearable
            item-value="id"
            item-text="title"
            color="black"
            label="Trade Staff"
            no-filter
            prepend-icon="mdi-tools"
            persistent-hint
            @keyup="searchOnKeyUp"
            @change="tradeStaffValueChange"
            return-object>
        </v-autocomplete>
    </div>
</template>

<script>
    import TradeStaffAPI from "../../api/TradeStaffApi";

    export default {
        name: "TradeStaffSelectField",
        props: ['isRequired', 'initialId'],
        data(){
            return {
                tradeStaff: '',
                tradeStaffs: [],
                loading: false,
                search: '',


            }
        },
        methods: {
            searchTradeStaff(search){
                this.loading = true
                TradeStaffAPI.search(search).then(response => {
                    this.tradeStaffs = response.data.data
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.loading = false;
                })

            },
            getTradeStaffById(tradeStaffId){
               if(tradeStaffId){
                   this.loading = true
                   TradeStaffAPI.getTradeStaffById(tradeStaffId).then(response => {
                       this.tradeStaffs = [response.data]
                       this.tradeStaff = response.data.id
                   }).catch(error => {
                       console.log(error)
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
                        this.searchTradeStaff(this.search)
                    }
                }
            },
            tradeStaffValueChange(){
                this.$emit('onValueChanged', this.tradeStaff)
            }
        },
        watch: {
            initialId: {
                handler(){
                    if(this.initialId){
                        this.getTradeStaffById(this.initialId);
                    }else {
                        this.postcodes = [];
                        this.postcodeId = '';
                    }
                },
                deep: true
            }
        },
        mounted() {

            if(this.initialId){
                this.getTradeStaffById(this.initialId);
            }
        }
    }
</script>

<style scoped>

</style>