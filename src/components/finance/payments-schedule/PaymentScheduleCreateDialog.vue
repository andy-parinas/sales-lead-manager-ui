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
    export default {
        name: "PaymentScheduleCreateDialog",
        components: {PaymentScheduleForm, DialogHeader},
        methods: {
            closeDialog(){
                this.$refs.paymentScheduleForm.reset();
                this.$emit('close');
            },
            addPaymentHandler(){

            }
        }
    }
</script>

<style scoped>

</style>