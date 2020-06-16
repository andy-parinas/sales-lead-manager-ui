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
        methods: {
            closeDialog(){
                this.$emit('close');
            },
            onTradeStaffUpdate(){

            }
        }
    }
</script>

<style scoped>

</style>