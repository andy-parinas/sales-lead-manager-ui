<template>
    <v-card>
        <DialogHeader title="Add Payment Schedule">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <PaymentScheduleForm @onSave="addPaymentHandler" :saving="saving" ref="paymentScheduleForm" />
    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import PaymentScheduleForm from "./Shared/PaymentScheduleForm";
    import FinanceAPI from "../../../api/FinanceAPI";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import EventBus from "../../../helpers/EventBus";

    export default {
        name: "PaymentScheduleCreateDialog",
        components: {PaymentScheduleForm, DialogHeader},
        props: ['financeId'],
        data(){
            return {
                saving: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions(['setSuccessMessage']),
            closeDialog(){
                this.$refs.paymentScheduleForm.reset();
                this.$emit('close');
            },
            addPaymentHandler(formData){
               if(this.financeId && formData){
                   this.saving = true;
                   FinanceAPI.addPaymentSchedule(this.financeId, formData).then(() => {
                       console.log('Added')
                       this.setSuccessMessage("Payment Schedule Successfully Added");
                       this.closeDialog();
                       EventBus.$emit('PAYMENT_SCHEDULE_UPDATE')
                   }).catch(error => {
                       this.handleError(error)
                   }).finally(() => {
                        this.saving = false
                   })
               }
            }
        }
    }
</script>

<style scoped>

</style>