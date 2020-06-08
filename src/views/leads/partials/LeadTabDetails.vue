<template>
    <v-card>
        <v-toolbar flat color="blue-grey" dark>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <slot name="action"></slot>
        </v-toolbar>
        <v-tabs show-arrows class="my-5">

            <v-tab> Lead Details </v-tab>
            <v-tab>  Job Type </v-tab>
            <v-tab>  Appointment </v-tab>
            <v-tab> Documents </v-tab>

            <v-tab-item>
                <LeadContactPartial :data="lead.details"  />
            </v-tab-item>
            <v-tab-item>
                <JobTypePartial :data="lead.jobType"  />
            </v-tab-item>
            <v-tab-item>
                <AppointmentPartial :data="lead.appointment"  />
            </v-tab-item>
            <v-tab-item>
                <DocumentPartial :lead-id="lead.details.id" />
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
    import LeadContactPartial from "./LeadContactPartial";
    import JobTypePartial from "./JobTypePartial";
    import AppointmentPartial from "./AppointmentPartial";
    import DocumentPartial from "./DocumentPartial";


    export default {
        name: "LeadTabDetails",
        props: {
            lead: {required: true, type: Object},
            title: {required: true, type: String}
        },
        components: {DocumentPartial, LeadContactPartial, JobTypePartial, AppointmentPartial},
        data(){
            return {
                showSnackbar: false
            }
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>