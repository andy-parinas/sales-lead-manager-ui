<template>
    <v-card>
        <DialogHeader title="Delete Payments Schedule">
            <template v-slot:action>
                <v-btn small icon @click="closeDialog">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text>
            <div class="mt-3 subtitle-1"> The Delete process is unrecoverable. Are you sure you want to delete?</div>
            <div class="mt-3 subtitle-1 font-weight-bold" v-if="payment">{{ payment.description }} </div>
            <div class="mt-3 subtitle-1 font-weight-bold" v-if="payment">Amount:  {{ payment.amount }}</div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red darken-1" class="mr-3 mb-2 white--text"
                   @click="onDeletePayment"
                   :loading="deleting">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import DialogHeader from "../../core/DialogHeader";
    import FinanceAPI from "../../../api/FinanceAPI";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import {mapActions} from 'vuex';
    import EventBus from "../../../helpers/EventBus";

    export default {
        name: "PaymentScheduleDeleteDialog",
        props: {
            payment: {required: true},
            financeId: {required: true}
        },
        components: {DialogHeader},
        data(){
            return {
                deleting: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions(['setSuccessMessage']),
            onDeletePayment(){
                if(this.financeId && this.payment){
                    this.deleting = true;
                    FinanceAPI.deletePaymentSchedule(this.financeId, this.payment.id).then(() => {
                        this.setSuccessMessage('Payment Successfully Delete');
                        EventBus.$emit('PAYMENT_SCHEDULE_UPDATE');
                        this.closeDialog()
                    }).catch(error => {
                        this.handleError(error);
                    }).finally(() => {
                        this.deleting = false;
                    })
                }

            },
            closeDialog(){
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>