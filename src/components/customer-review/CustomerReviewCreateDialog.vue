<template>
    <v-card>
        <DialogHeader title="Add Customer Review">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <CustomerReviewForm />
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import CustomerReviewForm from "@/components/customer-review/shared/CustomerReviewForm";
export default {
    name: "CustomerReviewCreateDialog",
    components: {CustomerReviewForm, DialogHeader},
    methods: {
        closeDialog(){
            this.$emit('close');
        }
    }
}
</script>

<style scoped>

</style>