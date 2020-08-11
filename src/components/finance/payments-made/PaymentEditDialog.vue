<template>
    <v-card>
        <DialogHeader title="Edit Payment">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <PaymentMadeForm @onSave="updatePaymentHandler" :saving="saving" ref="paymentMadeForm" />
    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import PaymentMadeForm from "./shared/PaymentMadeForm";
    export default {
        name: "PaymentEditDialog",
        components: {PaymentMadeForm, DialogHeader},
        methods: {
            updatePaymentHandler(){
                
            }
        }
    }
</script>

<style scoped>

</style>