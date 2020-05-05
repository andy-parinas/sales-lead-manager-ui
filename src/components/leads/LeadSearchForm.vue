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
                   @click="search">
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
                    {text: 'Lead Number', value: 'number'},
                    {text: 'First Name', value: 'firstName'},
                    {text: 'Last Name', value: 'lastName'},
                    {text: 'Suburb', value: 'suburb'},
                    {text: 'State', value: 'state'},
                    {text: 'Postcode', value: 'postcode'},
                    {text: 'Outcome', value: 'outcome'},
                    {text: 'Franchise', value: 'franchise'}
                ]
            }
        },
        computed:{
            canSearch(){
                return this.searchIn.trim() === '' || this.searchFor.trim() === '';
            }
        },
        methods: {
            search(){

            },
            resetSearch(){

            }
        }
    }
</script>

<style scoped>

</style>