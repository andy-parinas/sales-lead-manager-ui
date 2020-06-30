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
                ref="salesStaffForm"
                :saving="saving"
                @onSave="onContractCreate"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import ContractForm from "./shared/ContractForm";
    export default {
        name: "ContractCreateDialog",
        components: {ContractForm, DialogHeader},
        data(){
            return{
                saving: false,
            }
        },
        methods: {
            closeDialog(){
                this.$emit('close')
            },
            onContractCreate(){

            }
        }
    }
</script>

<style scoped>

</style>