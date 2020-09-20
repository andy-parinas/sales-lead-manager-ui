<template>
    <v-card>
        <DialogHeader title="Edit Customer Review">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <CustomerReviewForm
            :saving="saving"
            :initial-data="customerReview"
            @onSave="updateCustomerReviewHandler" />
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import CustomerReviewForm from "@/components/customer-review/shared/CustomerReviewForm";
export default {
name: "CustomerReviewEditDialog",
    components: {CustomerReviewForm, DialogHeader},
    props: ['leadId', 'customerReview'],
    methods: {
        updateCustomerReviewHandler(){

        },
        closeDialog(){
            this.$emit('close')
        }
    }
}
</script>

<style scoped>

</style>