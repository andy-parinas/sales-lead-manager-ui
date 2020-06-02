<template>
    <v-card>
        <DialogHeader title="New Franchise">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <FranchiseForm
                ref="franchiseForm"
                :saving="saving"
                @onSave="onFranchiseCreate"/>
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex';
    import DialogHeader from "../core/DialogHeader";
    import FranchiseForm from "./shared/FranchiseForm";
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";


    export default {
        name: "CreateFranchiseDialog",
        components: {FranchiseForm, DialogHeader},
        data(){
            return {
                saving: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('franchises', ['createFranchise']),
            ...mapActions(['setSuccessMessage']),
            closeDialog(){
                setTimeout(() => {
                    this.$refs.franchiseForm.clearData();
                }, 100)
                this.$emit('close')
            },
            onFranchiseCreate(form){
                this.saving = true;
                this.createFranchise(form).then(() => {
                    this.setSuccessMessage("Franchise Created");
                    this.closeDialog();
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