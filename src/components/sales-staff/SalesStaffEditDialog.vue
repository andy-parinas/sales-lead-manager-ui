<template>
    <v-card>
        <DialogHeader title="Edit Sales Staff">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <SalesStaffForm
                ref="salesStaffForm"
                :initial-data="initialData"
                :saving="saving"
                @onSave="onSalesStaffUpdate"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import SalesStaffForm from "./shared/SalesStaffForm";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";

    export default {
        name: "SalesStaffEditDialog",
        components: {SalesStaffForm, DialogHeader},
        props: {
            initialData: {type: [Object, null]}
        },
        data(){
            return {
                saving: false,
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('salesStaffs', ['updateSalesStaff']),
            ...mapActions(['setSuccessMessage']),
            closeDialog(){
                setTimeout(() => {
                    this.$refs.salesStaffForm.reset();
                }, 100);
                this.$emit('close');
            },
            onSalesStaffUpdate(form){
                this.saving = true;
                this.updateSalesStaff(form).then(() => {
                    this.setSuccessMessage("Sales Staff Successfully Updated");
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.saving = false;
                })
            },
        },
    }
</script>

<style scoped>

</style>