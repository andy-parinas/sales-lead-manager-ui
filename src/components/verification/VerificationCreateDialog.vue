<template>
    <v-card>
        <DialogHeader title="Add Lead Verification Details">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <VerificationForm
            :saving="saving"
            @onSave="verificationCreateHandler" />
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import VerificationForm from "@/components/verification/shared/VerificationForm";
import VerificationAPI from "@/api/VerificationAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import {mapActions} from 'vuex';



export default {
    name: "VerificationCreateDialog",
    props: ['leadId'],
    components: {VerificationForm, DialogHeader},
    data(){
      return {
            saving: false,
      }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        closeDialog(){
            this.$emit('close')
        },
        verificationCreateHandler(formData){
           if (this.leadId){
               this.saving = true;
               VerificationAPI.createVerification(this.leadId, formData).then(() => {
                   this.setSuccessMessage("Verification Successfully Created");
                   this.$emit('success')
                   this.closeDialog();
               }).catch(error => {
                   this.handleError(error)
               }).finally(() => {
                   this.saving = false;
               })
           }
        }
    }
}
</script>

<style scoped>

</style>