<template>
    <v-card>
        <DialogHeader title="Edit Trade Staff">
            <template v-slot:action>
                <v-btn small icon @click="closeDialog">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <TradeStaffForm
                ref="salesStaffForm"
                :initial-data="initialData"
                :saving="saving"
                @onSave="onTradeStaffUpdate"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import TradeStaffForm from "./shared/TradeStaffForm";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";

    export default {
        name: "TradeStaffEditDialog",
        components: {TradeStaffForm, DialogHeader},
        props: {
            initialData: {type: [Object, null]}
        },
        data(){
            return {
                saving: false,
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('tradeStaffs', ['updateTradeStaff']),
            ...mapActions(['setSuccessMessage']),
            closeDialog(){
                this.$emit('close');
            },
            onTradeStaffUpdate(form){
                console.log('Dialog', form)
                this.saving = true;
                this.updateTradeStaff(form).then(() => {
                    this.setSuccessMessage('Trade Staff Successfully Updated');
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.saving = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>