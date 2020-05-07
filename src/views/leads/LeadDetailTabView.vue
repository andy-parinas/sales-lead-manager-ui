<template>
    <v-row justify="center">
        <v-col cols="12" sm="10">
            <v-card>
        <v-toolbar flat color="blue-grey" dark>
            <v-toolbar-title>Details</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>

            <v-tab> Lead Details </v-tab>
            <v-tab>  Job Type </v-tab>
            <v-tab>  Appointment </v-tab>
            <v-tab> Documents </v-tab>

            <v-tab-item>
                <LeadContactPartial />
            </v-tab-item>
            <v-tab-item>
                <JobTypePartial />
            </v-tab-item>
            <v-tab-item>
                <AppointmentPartial />
            </v-tab-item>
            <v-tab-item>

            </v-tab-item>
        </v-tabs>
    </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import LeadContactPartial from "./partials/LeadContactPartial";
    import JobTypePartial from "./partials/JobTypePartial";
    import AppointmentPartial from "./partials/AppointmentPartial";

    export default {
        name: "LeadDetailTabView",
        components: {LeadContactPartial, JobTypePartial, AppointmentPartial}
    }
</script>

<style scoped>

</style>