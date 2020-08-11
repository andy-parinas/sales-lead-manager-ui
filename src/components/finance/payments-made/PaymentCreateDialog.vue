<template>
    <v-card>
        <DialogHeader title="Add Payment">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <PaymentMadeForm @onSave="addPaymentHandler" />
    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import PaymentMadeForm from "./shared/PaymentMadeForm";
    export default {
        name: "PaymentCreateDialog",
        components: {PaymentMadeForm, DialogHeader},
        methods: {
            closeDialog(){
                this.$emit('close')
            },
            addPayment(formData){


            },
            addPaymentHandler(form){
                console.log(form)
            }
        }
    }
</script>

<style scoped>

</style>