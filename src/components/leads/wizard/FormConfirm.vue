<template>
    <v-container>
        <LeadTabDetails
                title="Lead Create Summary"
                :lead="summary"></LeadTabDetails>

        <v-row class="mt-10">
            <v-btn color="primary" class="mr-2" @click="$emit('moveBack')">Back</v-btn>
            <v-btn color="success" @click="$emit('confirm')" >Create Lead</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mr-2" @click="$emit('moveBack')">Cancel</v-btn>
        </v-row>
    </v-container>
</template>

<script>

    import LeadTabDetails from "../../../views/leads/partials/LeadTabDetails";

    export default {
        name: "FormConfirm",
        props: {
            summary: {required: true, type: Object}
        },
        components: {LeadTabDetails},
        methods: {
        }
    }
</script>

<style scoped>

</style>