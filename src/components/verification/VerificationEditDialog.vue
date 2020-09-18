<template>
    <v-card>
        <DialogHeader title="Update Lead Verification Details">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <VerificationForm
            :saving="saving"
            :initial-data="verification"
            @onSave="updateVerificationHandler" />
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import VerificationForm from "@/components/verification/shared/VerificationForm";
import VerificationAPI from "@/api/VerificationAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import {mapActions} from 'vuex';


export default {
name: "VerificationEditDialog",
    components: {VerificationForm, DialogHeader},
    props: ['leadId', 'verification'],
    data(){
        return {
            saving: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        updateVerificationHandler(formData){
            this.saving = true;
            if(this.leadId && this.verification){

                VerificationAPI.updateVerification(this.leadId, this.verification.id, formData).then(response => {
                    this.setSuccessMessage("Verification Successfully Updated")
                    this.$emit('success', response.data)
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.saving = false
                })

            }
        },

        closeDialog(){
            this.$emit('close')
        }
    },

}
</script>

<style scoped>

</style>