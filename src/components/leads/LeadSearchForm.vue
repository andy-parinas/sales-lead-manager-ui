<template>
    <v-row align-content="end" justify="start">
        <v-col cols="12" md="7"  sm="12">
            <v-text-field
                    v-model="searchFor"
                    label="Search" single-line hide-details>
            </v-text-field>
        </v-col>
        <v-col cols="12" md="3"  sm="12">
            <v-select v-model="searchIn" :items="searchItems" label="Search In" single-line ></v-select>
        </v-col>
        <v-col cols="12" md="2" sm="12">
            <v-btn color="secondary" fab small elevation="3" class="mr-2 white--text"
                   :disabled="canSearch"
                   @click="searchLeads">
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn color="success" fab small elevation="3" class="mr-2 white--text"
                   @click="resetSearch">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "LeadSearchForm",
        data(){
            return {
                searchFor: '',
                searchIn: '',
                searchItems: [
                    {text: 'Lead Number', value: 'lead_number'},
                    {text: 'First Name', value: 'first_name'},
                    {text: 'Last Name', value: 'last_name'},
                    {text: 'Suburb', value: 'suburb'},
                    {text: 'State', value: 'state'},
                    {text: 'Postcode', value: 'postcode'},
                    {text: 'Outcome', value: 'outcome'},
                    {text: 'Franchise', value: 'franchise_number'}
                ]
            }
        },
        computed:{
            canSearch(){
                return this.searchIn.trim() === '' || this.searchFor.trim() === '';
            }
        },
        methods: {
            searchLeads(){
                this.$emit('search', {searchFor: this.searchFor, searchIn: this.searchIn})
            },
            resetSearch(){
                this.searchFor = '';
                this.searchIn = '';
                this.$emit('reset');
            }
        }
    }
</script>

<style scoped>

</style>