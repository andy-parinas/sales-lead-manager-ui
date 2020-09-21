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
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import CustomerReviewAPI from "@/api/CustomerReviewAPI";
import {mapActions} from 'vuex';

export default {
name: "CustomerReviewEditDialog",
    components: {CustomerReviewForm, DialogHeader},
    props: ['leadId', 'customerReview'],
    data(){
        return {
            saving: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        updateCustomerReviewHandler(formData){
            if(this.leadId && this.customerReview){
                this.saving = true;
                CustomerReviewAPI.updateCustomerReview(this.leadId, this.customerReview.id, formData).then(response => {
                    this.setSuccessMessage("Customer Review Successfully Updated")
                    this.$emit('success', response.data);
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error)

                }).finally(() => {
                    this.saving = false;
                })
            }
        },
        closeDialog(){
            this.$emit('close')
        }
    }
}
</script>

<style scoped>

</style>