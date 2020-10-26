<template>
    <div>
        <v-autocomplete
                v-model="postcodeId"
                :items="postcodes"
                :search-input.sync="search"
                :loading="loading"
                :rules="required? [v => !!v || 'This field is required'] : []"
                :disabled="edit"
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
    import PostcodeAPI from "../../../api/PostcodeAPI";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import {mapState} from 'vuex';

    export default {
        name: "PostcodeSelect",
        props: {
            required: {type: Boolean},
            initialPostcodeId: {type: [String, null]},
            edit: {type: Boolean}
        },
        data(){
            return {
                loading: false,
                postcodes: [],
                search: '',
                postcodeId: ''
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('salesContacts', ['selectedContact']),
        },
        methods: {
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
            getPostcodeById(){
                if(!this.loading){
                    this.loading = true;
                    PostcodeAPI.getPostcodeById(this.selectedContact.postcodeId).then(response => {

                        this.postcodes = [response.data];
                        this.postcodeId = response.data.id

                    }).catch(error => {
                        this.handleError(error)
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
            reset(){
              this.postcodeId = '';
            }
        },
        watch: {
            selectedContact: {
                handler(){
                    if(this.selectedContact && this.selectedContact.postcodeId){
                        this.getPostcodeById();
                    }else {
                        this.postcodes = [];
                        this.postcodeId = '';
                    }
                },
                deep: true
            }
        },
        mounted() {

            if(this.selectedContact && this.selectedContact.postcodeId){
                this.getPostcodeById();
            }
        }
    }
</script>

<style scoped>

</style>