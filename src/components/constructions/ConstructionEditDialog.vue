<template>
    <v-card>
        <DialogHeader title="Update Construction Details">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <ConstructionForm @onSave="updateConstructionHandler"
                          :saving="saving"
                          ref="constructionForm"
                          :initial-data="construction" />
    </v-card>
</template>

<script>
import DialogHeader from "@/components/core/DialogHeader";
import ConstructionForm from "@/components/constructions/shared/ConstructionForm";
import ConstructionAPI from "@/api/ConstructionAPI";
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import {mapActions} from 'vuex';

export default {
name: "ConstructionEditDialog",
    components: {ConstructionForm, DialogHeader},
    props: ['leadId', 'construction'],
    data(){
        return {
            saving: false
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
    ...mapActions(['setSuccessMessage']),
        updateConstructionHandler(formData){
            if(this.leadId && this.construction){
                this.saving = true
                ConstructionAPI.updateConstruction(this.leadId, this.construction.id, formData).then(response => {
                    this.setSuccessMessage("Construction Successfully Updated")
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
            this.$emit('close');
        }
    }
}
</script>

<style scoped>

</style>