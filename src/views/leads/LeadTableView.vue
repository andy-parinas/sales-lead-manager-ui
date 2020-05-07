<template>
    <v-row class="mt-6" justify="center">
        <v-col cols="12" sm="12" md="12">
            <LeadsTable @throwError="setErrorState" />
        </v-col>
    </v-row>
</template>

<script>
    import LeadsTable from "../../components/leads/LeadsTable";

    export default {
        name: "LeadTableView",
        components: {LeadsTable},
        data(){
            return {
                error: false,
                message: ''
            }
        },
        methods: {
            setErrorState(status, message){
                this.error = status;
                this.message = message;
            }
        },
    }
</script>

<style scoped>

</style>