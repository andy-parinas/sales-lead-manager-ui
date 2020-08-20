<template>
    <v-card>
        <DialogHeader title="Edit Payment Schedule">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <PaymentScheduleForm @onSave="updatePaymentHandler"
                             :saving="saving" ref="paymentScheduleForm" :initial-data="payment" />
    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import PaymentScheduleForm from "./Shared/PaymentScheduleForm";
    import FinanceAPI from "../../../api/FinanceAPI";
    import EventBus from "../../../helpers/EventBus";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import {mapActions} from 'vuex';
    export default {
        name: "PaymentScheduleEditDialog",
        props: {
            payment: {required: true},
            financeId: {required: true}
        },
        components: {PaymentScheduleForm, DialogHeader},
        data(){
            return {
                saving: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions(['setSuccessMessage']),
            updatePaymentHandler(formData){
                if(this.payment && this.financeId){
                    this.saving = true
                    FinanceAPI.updatePaymentSchedule(this.financeId, this.payment.id, formData).then(() => {
                        EventBus.$emit('PAYMENT_SCHEDULE_UPDATE');
                        this.setSuccessMessage('Payment Schedule Successfully Updated');
                        this.closeDialog();
                    }).catch(error =>{
                        this.handleError(error);
                    }).finally(() => {
                        this.saving = false;
                    })


                }
            },
            closeDialog(){
                this.$refs.paymentScheduleForm.reset();
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>