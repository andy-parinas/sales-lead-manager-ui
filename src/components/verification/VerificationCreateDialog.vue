<template>
    <v-card>
        <DialogHeader title="Add Lead Verification Details">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <VerificationForm />
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import VerificationForm from "@/components/verification/shared/VerificationForm";
export default {
    name: "VerificationCreateDialog",
    components: {VerificationForm, DialogHeader},
    data(){
      return {

      }
    },
    methods: {
        closeDialog(){
            this.$emit('close')
        }
    }
}
</script>

<style scoped>

</style>