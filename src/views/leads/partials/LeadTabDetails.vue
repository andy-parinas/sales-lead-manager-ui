<template>
    <v-card>
        <v-toolbar flat color="blue-grey" dark>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <slot name="action">

            </slot>
<!--            <v-btn text @click="goBack">-->
<!--                <v-icon>mdi-arrow-left-bold</v-icon>-->
<!--                <span> Go Back </span>-->
<!--            </v-btn>-->
        </v-toolbar>
        <v-tabs vertical>

            <v-tab> Lead Details </v-tab>
            <v-tab>  Job Type </v-tab>
            <v-tab>  Appointment </v-tab>
            <v-tab> Documents </v-tab>

            <v-tab-item>
                <LeadContactPartial :data="lead.details" />
            </v-tab-item>
            <v-tab-item>
                <JobTypePartial :data="lead.jobType" />
            </v-tab-item>
            <v-tab-item>
                <AppointmentPartial :data="lead.appointment" />
            </v-tab-item>
            <v-tab-item>

            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
    import LeadContactPartial from "./LeadContactPartial";
    import JobTypePartial from "./JobTypePartial";
    import AppointmentPartial from "./AppointmentPartial";


    export default {
        name: "LeadTabDetails",
        props: {
            lead: {required: true, type: Object},
            title: {required: true, type: String}
        },
        components: {LeadContactPartial, JobTypePartial, AppointmentPartial}
    }
</script>

<style scoped>

</style>