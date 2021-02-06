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
            <v-tab v-if="!summary"> Documents </v-tab>
            <v-tab v-if="!summary" > Contract </v-tab>
            <v-tab v-if="!summary"> Finance </v-tab>
            <v-tab v-if="!summary"> Building Authority </v-tab>
            <v-tab v-if="!summary"> Constructions </v-tab>
            <v-tab v-if="!summary"> Verifications </v-tab>
            <v-tab v-if="!summary"> Customer Review </v-tab>


            <v-tab-item>
                <LeadContactPartial :data="lead.details" :summary="summary"  />
            </v-tab-item>
            <v-tab-item>
                <JobTypePartial :data="lead.jobType" :summary="summary"  />
            </v-tab-item>
            <v-tab-item>
                <AppointmentPartial :data="lead.appointment" :summary="summary"  />
            </v-tab-item>
            <v-tab-item v-if="!summary">
                <DocumentPartial :lead-id="lead.details.id" />
            </v-tab-item>
            <v-tab-item v-if="!summary">
                <ContractPartial :lead-id="lead.details.id" :lead-number="lead.details.leadNumber" />
            </v-tab-item>
            <v-tab-item v-if="!summary">
                <FinancePartial :lead-id="lead.details.id" />
            </v-tab-item>
            <v-tab-item v-if="!summary">
                <BuildingAuthorityPartial :lead-id="lead.details.id" />
            </v-tab-item>
            <v-tab-item v-if="!summary">
                <ConstructionPartial :lead-id="lead.details.id" />
            </v-tab-item>
            <v-tab-item v-if="!summary">
                <VerificationPartial :lead-id="lead.details.id" />
            </v-tab-item>
            <v-tab-item v-if="!summary">
                <CustomerReviewPartial :lead-id="lead.details.id" />
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
    import LeadContactPartial from "./LeadContactPartial";
    import JobTypePartial from "./JobTypePartial";
    import AppointmentPartial from "./AppointmentPartial";
    import DocumentPartial from "./DocumentPartial";
    import ContractPartial from "./ContractPartial";
    import FinancePartial from "./FinancePartial";
    import ConstructionPartial from "./ConstructionPartial";
    import BuildingAuthorityPartial from "@/views/leads/partials/BuildingAuthorityPartial";
    import VerificationPartial from "@/views/leads/partials/VerificationPartial";
    import CustomerReviewPartial from "@/views/leads/partials/CustomerReviewPartial";


    export default {
        name: "LeadTabDetails",
        props: {
            lead: {required: true, type: Object},
            title: {required: true, type: String},
            summary: {type:Boolean}
        },
        components: {
            CustomerReviewPartial,
            VerificationPartial,
            BuildingAuthorityPartial,
            ConstructionPartial,
            FinancePartial,
            ContractPartial, DocumentPartial, LeadContactPartial, JobTypePartial, AppointmentPartial},
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