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
                        <v-stepper-step step="3">Add Appointment</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="3">Finished</v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <FormSalesContactSelect
                                    @setSalesContactId="setSalesContact"
                                    @moveNext="moveNext"/>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <FormLeadInformation
                                    :contact="salesContact"
                                    @moveNext="moveNext"
                                    @moveBack="moveBack"/>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-col>
        </v-row>
        <pre>{{ salesContact }}</pre>
        <pre>{{ leadForm }}</pre>
    </div>
</template>

<script>
    import FormSalesContactSelect from "./FormSalesContactSelect";
    import FormLeadInformation from "./FormLeadInformation";

    export default {
        name: "FormWizard",
        components: { FormSalesContactSelect, FormLeadInformation },
        data(){
            return {
                stage: 1,
                salesContact: {},
                leadForm: {
                    sales_contact_id: -1
                }
            }
        },
        methods: {
            setSalesContact(contact){
                this.salesContact= Object.assign({}, contact)
                this.leadForm.sales_contact_id = this.salesContact.id
                console.log('setSalesContact', this.salesContact)
            },
            moveNext(){
                this.stage = this.stage + 1;
            },
            moveBack(){
                if(this.stage > 0){
                    this.stage = this.stage - 1;
                }
            }
        }
    }
</script>

<style scoped>

</style>