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
                :saving="saving"
                @onSave="onSalesStaffCreate"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import SalesStaffForm from "./shared/SalesStaffForm";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";
    export default {
        name: "SalesStaffCreateDialog",
        components: {SalesStaffForm, DialogHeader},
        data(){
            return {
                saving: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('salesStaffs', ['createSalesStaff']),
            ...mapActions(['setSuccessMessage']),
            closeDialog(){
                this.$emit('close')
            },
            onSalesStaffCreate(form){
                this.saving = true;
                this.createSalesStaff(form).then(() => {
                    this.setSuccessMessage("Sales Staff Successfully Created")
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.saving = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>