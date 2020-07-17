<template>
    <div>
        <v-row justify="center">
            <v-col cols="12" sm="11">
                <div>Create New Lead</div>
                <v-stepper v-model="stage">
                    <v-stepper-header>
                        <v-stepper-step :complete="stage > 1" step="1">Select Sales Contact</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="stage > 2" step="2">Add Lead Infromation</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="stage > 3" step="3">Add Job Type</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="stage > 4" step="4">Add Appointment</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="5">Confirm</v-stepper-step>
                    </v-stepper-header>
                    <div style="height: 10px">
                        <v-progress-linear indeterminate color="green" v-if="loading"></v-progress-linear>
                    </div>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <SalesContactWizardItem
                                    @setSalesContactId="setSalesContact"
                                    @moveNext="moveNext"
                                    @cancel="cancel"/>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <LeadInfoWizardItem
                                    @moveNext="moveNext"
                                    @moveBack="moveBack"
                                    @cancel="cancel"/>
                        </v-stepper-content>
                        <v-stepper-content step="3">
                            <JobTypeWizardItem
                                    @moveNext="moveNext"
                                    @moveBack="moveBack"
                                    @cancel="cancel"/>
                        </v-stepper-content>
                        <v-stepper-content step="4">
                            <AppointmentWizardItem
                                    @moveNext="moveNext"
                                    @moveBack="moveBack"
                                    @cancel="cancel"/>
                        </v-stepper-content>
                        <v-stepper-content step="5">
                            <ConfirmWizardItem
                                    :summary="form"
                                    @confirm="create"
                                    @moveBack="moveBack"
                                    @cancel="cancel"/>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-col>
        </v-row>

        <v-dialog v-model="showDialogResult" persistent max-width="290">
            <v-card>
                <v-card-title class="subtitle-2">{{ dialogResult.title }}</v-card-title>
                <v-card-text>{{ dialogResult.content }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" text @click="showDetails">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
<!--        <pre>{{form}}</pre>-->
    </div>
</template>

<script>
    import SalesContactWizardItem from "./SalesContactWizardItem";
    import LeadInfoWizardItem from "./LeadInfoWizardItem";
    import JobTypeWizardItem from "./JobTypeWizardItem";
    import AppointmentWizardItem from "./AppointmentWizardItem";

    import {mapState, mapActions} from 'vuex';
    import ConfirmWizardItem from "./ConfirmWizardItem";

    export default {
        name: "FormWizard",
        components: {ConfirmWizardItem, SalesContactWizardItem, LeadInfoWizardItem, JobTypeWizardItem, AppointmentWizardItem },
        data(){
            return {
                stage: 1,
                loading: false,
                showDialogResult: false,
                dialogResult: {
                    title: '',
                    content: ''
                },
                form: {
                    sales_contact_id: -1,
                    details: {
                        leadNumber: '',
                        franchiseNumber: '',
                        leadDate: '',
                        customerType: '',
                        leadSource: '',
                        postcodeStatus: '',
                        firstName: '',
                        lastName: '',
                        contactNumber: '',
                        email: '',
                        email2: '',
                        street1: '',
                        street2: '',
                        suburb: '',
                        state: '',
                        postcode: ''
                    },
                    jobType: {
                        takenBy: '',
                        dateAllocated: '',
                        productId: '',
                        product: '',
                        description: '',
                        designAdvisor: '',

                    },
                    appointment: {
                        appointmentDate: '',
                        appointmentTime: '',
                        quotedPrice: '',
                        notes: '',
                        outcome: '',
                        comments: ''
                    }
                }
            }
        },
        computed: {
          ...mapState('salesContacts', ['selectedContact'])
        },
        methods: {
            ...mapActions('salesContacts', ['selectContact']),
            ...mapActions('leads', ['createLead']),
            setSalesContact(contactId){
                this.form.sales_contact_id = contactId
            },
            moveNext(formData){
                Object.assign(this.form, formData)
                this.stage = this.stage + 1;
            },
            moveBack(){
                if(this.stage > 0){
                    this.stage = this.stage - 1;
                }
            },
            cancel(){
                this.$router.back();
                this.selectContact(null)
            },
            create(){
                this.loading = true;
                this.createLead(this.form).then(() => {
                    this.dialogResult.title = 'Lead Successfully Created'
                    this.dialogResult.content = 'The lead is successfully created'
                    this.showDialogResult = true;
                }).catch(error => {
                    console.log(error.response);
                }).finally(() => {
                    this.loading = false;
                })
            },
            showDetails(){
                this.showDialogResult = false;
                this.$router.push({name: 'LeadTable'})
            }

        },
        mounted() {
            if(this.selectedContact){
                this.form.sales_contact_id = this.selectedContact.id
                this.stage = 2;
            }
        }
    }
</script>

<style scoped>

</style>