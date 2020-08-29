<template>
  <div>
    <v-autocomplete
        v-model="postcodeId"
        :items="postcodes"
        :search-input.sync="search"
        :loading="loading"
        :rules="required? [v => !!v || 'This field is required'] : []"
        item-value="id"
        item-text="title"
        color="black"
        label="Suburb, Postcode, State"
        no-filter
        prepend-icon="mdi-mailbox"
        persistent-hint
        @keyup="searchOnKeyUp"
        @change="postcodeValueChange"
    ></v-autocomplete>
  </div>
</template>

<script>
import PostcodeAPI from "@/api/PostcodeAPI";

export default {
    name: "PostcodeSelectField",
    props: {
        required: {type: Boolean},
        initialPostcodeId: { required: false },
    },
    data(){
        return {
            loading: false,
            postcodes: [],
            search: '',
            postcodeId: ''
        }
    },
    methods: {
        searchOnKeyUp(event){

            const excludedKeys = [
                9,16,18,17, 112,113,114,115,116,117,118,119,120,121,122, 123,
                36,35,144,20,45,33,34,27,37,38,39,40,91,13
            ]

            // Do not listen for the Tab Key
            if(event && !excludedKeys.includes(event.keyCode)){
                if(this.search && this.search.length >= 3 && this.search.trim() !== '' ){
                    this.onSearchPostcode()
                }
            }
        },
        postcodeValueChange(){
            this.$emit('onValueChanged', this.postcodeId)
        },
        onSearchPostcode(){
            if(!this.loading){
                this.loading = true;
                PostcodeAPI.search(this.search).then(response => {
                  this.postcodes = response.data.data;
                }).catch(error => {
                  this.handleError(error)
                }).finally(() => {
                  this.loading = false;
                })
            }
        },
        getPostcodeById(postcodeId){
            if(!this.loading){
                this.loading = true;
                PostcodeAPI.getPostcodeById(postcodeId).then(response => {

                  this.postcodes = [response.data];
                  this.postcodeId = response.data.id

                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.loading = false;
                })
            }
        },
    },
    watch: {
        initialPostcodeId: {
            handler(){
                if(this.initialPostcodeId){
                    this.getPostcodeById(this.initialPostcodeId);
                }else {
                    this.postcodes = [];
                    this.postcodeId = '';
                }
            },
            deep: true
        }
    },
    mounted() {

        if(this.initialPostcodeId){
            this.getPostcodeById(this.initialPostcodeId);
        }
    }
}
</script>

<style scoped>

</style>