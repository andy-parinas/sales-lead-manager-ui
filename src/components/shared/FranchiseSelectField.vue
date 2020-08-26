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
    export default {
        name: "FranchiseSelectField",
        props: ['isRequired'],
        data(){
            return {
                tradeStaff: '',
                tradeStaffs: [],
                loading: false,
                search: '',
            }
        },
    }
</script>

<style scoped>

</style>