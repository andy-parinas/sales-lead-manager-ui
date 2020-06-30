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
                @onSave="onContractCreate"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import ContractForm from "./shared/ContractForm";
    import ContractAPI from "../../api/ContractAPI";
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";
    import {mapActions} from 'vuex';

    export default {
        name: "ContractCreateDialog",
        components: {ContractForm, DialogHeader},
        props: {
            leadId: {required: true}
        },
        mixins: [ErrorHandlerMixins],
        data(){
            return{
                saving: false,
            }
        },
        methods: {
            ...mapActions(['setSuccessMessage']),
            closeDialog(){
                setTimeout(() => {
                    this.$refs.contractForm.reset();
                }, 100)
                this.$emit('close')
            },
            onContractCreate(form){
                this.saving = true;
                ContractAPI.createLeadContract(this.leadId, form).then(response => {
                    this.closeDialog()
                    this.setSuccessMessage("Lead Contract Successfully Created")
                    this.$emit('onContractCreated', response.data)
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.saving = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>