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
                :saving="saving"
                @onSave="onSalesStaffCreate"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import SalesContactForm from "./shared/SalesContactForm";
    import {mapActions} from 'vuex';
    export default {
        name: "SalesContactCreateDialog",
        components: {SalesContactForm, DialogHeader},
        data(){
            return {
                saving: false,
            }
        },
        methods: {
            ...mapActions('salesContacts', ['createSalesContact']),
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
            closeDialog(){
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>