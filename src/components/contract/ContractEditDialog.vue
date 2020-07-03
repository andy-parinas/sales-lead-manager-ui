<template>
    <v-card>
        <DialogHeader title="Create Lead Contract">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <ContractForm
                ref="contractForm"
                :saving="saving"
                :initial-data="editedItem"
                @onSave="onContractUpdate"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import ContractForm from "./shared/ContractForm";
    import ContractAPI from "../../api/ContractAPI";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";

    export default {
        name: "ContractEditDialog",
        components: {ContractForm, DialogHeader},
        props: {
            editedItem: {required: true},
            leadId: {required: true}
        },
        data(){
            return{
                saving: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions(['setSuccessMessage']),
            onContractUpdate(form){
                this.saving = true;
                ContractAPI.updateLeadContract(this.leadId, form).then(response => {
                    this.$emit('onContractUpdated', response.data)
                    this.setSuccessMessage("Contract successfully updated")
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.saving = false;
                })
            },
            closeDialog(){
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>