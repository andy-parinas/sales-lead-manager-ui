<template>
    <v-card>
        <DialogHeader title="Delete Trade Staff">
            <template v-slot:action>
                <v-btn small icon @click="closeDialog">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text>
            <div class="mt-3 subtitle-1"> The Delete process is unrecoverable. Are you sure you want to delete?</div>
            <div class="mt-3 subtitle-1 font-weight-bold" v-if="tradeStaff">{{ tradeStaff.firstName }} {{ tradeStaff.lastName }}</div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red darken-1" class="mr-3 mb-2 white--text"
                   @click="onDeleteSalesStaff"
                   :loading="deleting">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import DialogHeader from "../core/DialogHeader";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";
    export default {
        name: "TradeStaffDeleteDialog",
        components: {DialogHeader},
        props: {
            tradeStaff: {required: true}
        },
        data(){
            return {
                deleting: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('tradeStaffs', ['deleteTradeStaff']),
            ...mapActions(['setSuccessMessage']),
            closeDialog(){
                this.$emit('close')
            },
            onDeleteSalesStaff(){
                this.deleting = true;
                this.deleteTradeStaff(this.tradeStaff.id).then(() => {
                    this.setSuccessMessage("Trade Staff Successfully Deleted")
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.deleting = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>