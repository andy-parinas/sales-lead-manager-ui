<template>
    <v-card>
        <DialogHeader title="Edit Sales Contact">
            <template v-slot:action>
                <v-btn small icon @click="closeDialog">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <SalesContactForm
                ref="salesStaffForm"
                :initial-data="salesContact"
                :saving="saving"
                :edit="true"
                @onSave="onSalesStaffUpdate"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import SalesContactForm from "./shared/SalesContactForm";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";

    export default {
        name: "SalesContactEditDialog",
        props: {
            salesContact: {type: [Object, null]}
        },
        components: {SalesContactForm, DialogHeader},
        data(){
            return {
                saving: false,
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('salesContacts', ['updateSalesContact']),
            ...mapActions(['setSuccessMessage']),
            onSalesStaffUpdate(form){
                this.saving = true
                this.updateSalesContact(form).then(() => {
                    this.setSuccessMessage("Contact Successfully Saved")
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.saving = false;
                })
            },
            closeDialog(){
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>