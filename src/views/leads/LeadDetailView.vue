<template>
    <div>
        <v-row justify="center" v-if="isLeadLoaded">
            <v-col cols="12" sm="10">
                <v-card>
                    <v-toolbar flat color="blue-grey" dark>
                        <v-toolbar-title>Details</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn text @click="goBack">
                            <v-icon>mdi-arrow-left-bold</v-icon>
                            <span> Go Back </span>
                        </v-btn>
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
            </v-col>
        </v-row>
        <v-row justify="center" v-else>
            <v-col cols="12" sm="10">
                <v-skeleton-loader
                        :boilerplate="true"
                        class="mx-auto"
                        type="card"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import LeadContactPartial from "./partials/LeadContactPartial";
    import JobTypePartial from "./partials/JobTypePartial";
    import AppointmentPartial from "./partials/AppointmentPartial";
    import {mapState} from 'vuex';

    export default {
        name: "LeadDetailTabView",
        props: ['id'],
        components: {LeadContactPartial, JobTypePartial, AppointmentPartial},
        computed: {
            ...mapState('leads', ['lead']),
            isLeadLoaded(){
                return Object.keys(this.lead).length > 0
            }
        },
        methods: {
            goBack(){
                this.$emit('goBack')
            }
        },
    }
</script>

<style scoped>

</style>