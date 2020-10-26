<template>
    <v-card class="pb-3">
        <DialogHeader title="Edit Sales Contact">
            <template v-slot:action>
                <v-btn small icon @click="closeDialog">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <SalesContactForm
                ref="salesContactForm"
                :saving="saving"
                :creating="creating"
                @onSave="onSalesStaffCreate"
                @onSaveAndCreateLead="saveAndCreateLeadHandler"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import SalesContactForm from "./shared/SalesContactForm";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";
    export default {
        name: "SalesContactCreateDialog",
        components: {SalesContactForm, DialogHeader},
        data(){
            return {
                saving: false,
                creating: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('salesContacts', ['createSalesContact', 'selectContact', 'createSalesContactAndLead']),
            ...mapActions(['setSuccessMessage']),
            onSalesStaffCreate(form){
                this.saving = true;
                this.createSalesContact(form).then(() => {
                    this.setSuccessMessage("Contact Successfully Created")
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.saving = false;
                })
            },
            saveAndCreateLeadHandler(form){
              this.creating = true;
              this.createSalesContactAndLead(form).then(() => {
                this.setSuccessMessage("Contact Successfully Created")
                this.$router.push({name: 'LeadCreate'})
                this.closeDialog();
              }).catch(error => {
                this.handleError(error)
              }).finally(() => {
                this.creating = false;
              })
            },
            closeDialog(){
                this.$refs.salesContactForm.reset();
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>