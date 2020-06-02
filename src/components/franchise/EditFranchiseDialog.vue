<template>
    <v-card>
        <DialogHeader title="Edit Franchise">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <FranchiseForm
                ref="franchiseForm"
                :edited-item="editedItem"
                :saving="saving"
                @onSave="onFranchiseUpdate"/>
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex';
    import DialogHeader from "../core/DialogHeader";
    import FranchiseForm from "./shared/FranchiseForm";
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";
    export default {
        name: "EditFranchiseDialog",
        components: {FranchiseForm, DialogHeader},
        props: ['editedItem'],
        data(){
            return {
                saving: false,
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('franchises', ['updateFranchise']),
            ...mapActions(['setSuccessMessage']),
            onFranchiseUpdate(updates){


                this.saving = true;
                this.updateFranchise(updates).then(() => {
                    this.setSuccessMessage("Franchise Updated");
                    this.$refs.franchiseForm.clearData();
                    this.$emit('close');
                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.saving = false;
                })

            },
            closeDialog(){
                setTimeout(() => {
                    this.$refs.franchiseForm.clearData();
                }, 100)
                this.$emit('close')
            }

        }
    }
</script>

<style scoped>

</style>