<template>
    <v-card>
        <DialogHeader title="Create Contract Variation">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <VariationForm
                ref="variationForm"
                :saving="saving"
                @onSave="onVariationCreate"/>
    </v-card>
</template>

<script>
    import VariationForm from "./shared/VariationForm";
    import DialogHeader from "../../core/DialogHeader";
    import ContractAPI from "../../../api/ContractAPI";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";

    export default {
        name: "VariationCreateDialog",
        props: {
            contractId: {required: true}
        },
        components: {DialogHeader, VariationForm},
        data(){
            return {
                saving: false,
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions(['setSuccessMessage']),
            onVariationCreate(form){
                this.saving = true;
                ContractAPI.createContractVariations(this.contractId, form).then(response => {
                    this.$emit('success', response.data)
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.saving = false;
                })
            },
            closeDialog()
            {
                this.$emit('close');
                this.$refs.variationForm.reset();
            }
        }
    }
</script>

<style scoped>

</style>