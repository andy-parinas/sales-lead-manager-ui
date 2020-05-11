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
                        <v-stepper-step step="5">Finished</v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <FormSalesContactSelect
                                    @setSalesContactId="setSalesContact"
                                    @moveNext="moveNext"
                                    @cancel="cancel"/>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <FormLeadInformation
                                    :contact="salesContact"
                                    @moveNext="moveNext"
                                    @moveBack="moveBack"
                                    @cancel="cancel"/>
                        </v-stepper-content>
                        <v-stepper-content step="3">
                            <FormJobType
                                    @moveNext="moveNext"
                                    @moveBack="moveBack"
                                    @cancel="cancel"/>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-col>
        </v-row>
        <pre>{{ form }}</pre>
    </div>
</template>

<script>
    import FormSalesContactSelect from "./FormSalesContactSelect";
    import FormLeadInformation from "./FormLeadInformation";
    import FormJobType from "./FormJobType";

    export default {
        name: "FormWizard",
        components: { FormSalesContactSelect, FormLeadInformation, FormJobType },
        data(){
            return {
                stage: 1,
                salesContact: {},
                form: {
                    sales_contact_id: -1
                }
            }
        },
        methods: {
            setSalesContact(contact){
                this.salesContact= Object.assign({}, contact)
                this.form.sales_contact_id = this.salesContact.id
                console.log('setSalesContact', this.salesContact)
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
            },

        }
    }
</script>

<style scoped>

</style>