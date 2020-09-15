<template>
    <v-card>
        <DialogHeader title="Add Customer Review">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <CustomerReviewForm :saving="saving" @onSave="createCustomerReviewHandler" />
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import CustomerReviewForm from "@/components/customer-review/shared/CustomerReviewForm";
import CustomerReviewAPI from "@/api/CustomerReviewAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import {mapActions} from 'vuex';

export default {
    name: "CustomerReviewCreateDialog",
    props: ['leadId'],
    components: {CustomerReviewForm, DialogHeader},
    data(){
        return {
            saving: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        createCustomerReviewHandler(formData){
            if(this.leadId && formData){
                this.saving = true;
                CustomerReviewAPI.createCustomerReview(this.leadId, formData).then(() => {
                    this.setSuccessMessage("Customer Review Successfully Created");
                    this.$emit('success');
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.saving = false;
                })
            }

        },

        closeDialog(){
            this.$emit('close');
        }
    }
}
</script>

<style scoped>

</style>