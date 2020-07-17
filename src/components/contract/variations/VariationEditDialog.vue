<template>
    <v-card>
        <DialogHeader title="Edit Contract Variation">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <VariationForm
                :initial-data="editedItem"
                ref="variationForm"
                :saving="saving"
                @onSave="onVariationUpdate"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import VariationForm from "./shared/VariationForm";
    import ContractAPI from "../../../api/ContractAPI";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";

    export default {
        name: "VariationEditDialog",
        components: {VariationForm, DialogHeader},
        props: {
            editedItem: {type: [Object, null]},
            contractId: {required: true}
        },
        data(){
            return {
                saving: false,
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions(['setSuccessMessage']),
            onVariationUpdate(form){
                this.saving = true;
                ContractAPI.updateContractVariation(this.contractId, form).then(response => {
                    this.$emit('success', response.data);
                    this.setSuccessMessage("Variation Successfully Updated");
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.saving = false;
                })
            },
            closeDialog(){
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>