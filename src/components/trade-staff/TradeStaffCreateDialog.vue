<template>
    <v-card>
        <DialogHeader title="Create Trade Staff">
            <template v-slot:action>
                <v-btn small icon @click="closeDialog">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <TradeStaffForm
                ref="salesStaffForm"
                :saving="saving"
                @onSave="onTradeStaffCreate"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import TradeStaffForm from "./shared/TradeStaffForm";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";

    export default {
        name: "TradeStaffCreateDialog",
        components: {TradeStaffForm, DialogHeader},
        data(){
            return {
                saving: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('tradeStaffs', ['createTradeStaff']),
            ...mapActions(['setSuccessMessage']),
            onTradeStaffCreate(form){
                this.saving = true;
                this.createTradeStaff(form).then(() => {
                    this.closeDialog()
                    this.setSuccessMessage("Trade Staff Successfully Created");
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.saving = false;
                })
            },
            closeDialog(){
                this.$refs.salesStaffForm.reset();
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>