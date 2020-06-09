<template>
    <div>
        <v-card>
            <v-card-title id="table-header" >
                <SearchForm :search-items="searchItems" />
            </v-card-title>
            <v-data-table
                :headers="headers"></v-data-table>
        </v-card>
    </div>
</template>

<script>
    import SearchForm from "../shared/SearchForm";
    export default {
        name: "SalesStaffTable",
        components: {SearchForm},
        data(){
            return {
                searchItems: [
                    {text: 'First Name', value: 'first_name'},
                    {text: 'Last Name', value: 'last_name'},
                    {text: 'Suburb', value: 'email'},
                ],
                headers: [
                    { text: 'First Name',value: 'firstName'},
                    { text: 'Last Name', value: 'lastName' },
                    { text: 'E-Mail', value: 'email' },
                    { text: 'Franchise', value: 'franchise' },
                    { text: 'Status', value: 'status' },
                    { text: 'Actions', value: 'actions', sortable: false },
                    { text: '', value: 'data-table-expand' },
                ],
            }
        }
    }
</script>

<style scoped>

</style>