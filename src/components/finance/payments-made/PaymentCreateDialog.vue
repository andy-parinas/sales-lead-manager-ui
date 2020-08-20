<template>
    <v-card>
        <DialogHeader title="Add Payment">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <PaymentMadeForm @onSave="addPaymentHandler" :saving="saving" ref="paymentMadeForm" />
    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import PaymentMadeForm from "./shared/PaymentMadeForm";
    import FinanceAPI from "../../../api/FinanceAPI";
    import {mapActions} from 'vuex';
    import EventBus from "../../../helpers/EventBus";

    export default {
        name: "PaymentCreateDialog",
        props: ['financeId'],
        components: {PaymentMadeForm, DialogHeader},
        data(){
            return {
                saving: false
            }
        },
        methods: {
            ...mapActions(['setSuccessMessage']),
            closeDialog(){
                this.$refs.paymentMadeForm.reset();
                this.$emit('close')
            },
            addPayment(formData){
                console.log(this.financeId)
                if(this.financeId){
                    this.saving = true;
                    FinanceAPI.addPayment(this.financeId,formData).then(() => {
                        this.setSuccessMessage("Payment Successfully added");
                        EventBus.$emit("PAYMENT_MADE_UPDATED")
                        this.closeDialog();
                    }).catch(error => {
                        console.log(error.response)
                    }).finally(() => {
                        this.saving = false;
                    })
                }
            },
            addPaymentHandler(form){

                this.addPayment(form);
            }
        }
    }
</script>

<style scoped>

</style>