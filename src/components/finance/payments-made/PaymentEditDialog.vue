<template>
    <v-card>
        <DialogHeader title="Edit Payment">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <PaymentMadeForm :initial-data="payment"
                @onSave="updatePaymentHandler"
                :saving="saving" ref="paymentMadeForm" />
    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import PaymentMadeForm from "./shared/PaymentMadeForm";
    import FinanceAPI from "../../../api/FinanceAPI";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import {mapActions} from 'vuex'
    import EventBus from "../../../helpers/EventBus";

    export default {
        name: "PaymentEditDialog",
        props: {
            payment: {required: true},
            financeId: {required: true}
        },
        components: {PaymentMadeForm, DialogHeader},
        data(){
            return {
                saving: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions(['setSuccessMessage']),
            updatePaymentHandler(formData){
                this.saving = true;
                FinanceAPI.updatePayment(this.financeId, this.payment.id, formData).then(() => {
                    this.setSuccessMessage("Payment Successfully Updated")
                    EventBus.$emit("PAYMENT_MADE_UPDATED")
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.saving = false
                })
            },
            closeDialog(){
                this.$refs.paymentMadeForm.reset();
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>