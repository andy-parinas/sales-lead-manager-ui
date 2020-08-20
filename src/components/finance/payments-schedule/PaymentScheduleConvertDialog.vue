<template>
    <v-card>
        <DialogHeader title="Convert Payment Schedule to Payment Made">
            <template v-slot:action>
                <v-btn small icon @click="closeDialog">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text>
            <div class="mt-3 subtitle-1"> Are you sure you want to convert Payment Schedule to Payment Made?</div>
            <div class="mt-3 subtitle-1 font-weight-bold" v-if="payment">{{ payment.description }} </div>
            <div class="mt-3 subtitle-1 font-weight-bold" v-if="payment">Amount:  {{ payment.amount }}</div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue darken-1" class="mr-3 mb-2 white--text"
                   @click="onConvertPayment"
                   :loading="converting">
                Convert
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
        name: "PaymentScheduleConvertDialog",
        props: {
            payment: {required: true},
            financeId: {required: true}
        },
        components: {DialogHeader},
        data(){
            return {
                converting: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions(['setSuccessMessage']),
            onConvertPayment(){
                if(this.payment && this.financeId){
                    this.converting = true
                    FinanceAPI.convertPaymentSchedule(this.financeId, this.payment.id).then(() => {
                        this.setSuccessMessage('Payment Successfully Converted')
                        EventBus.$emit('PAYMENT_MADE_UPDATED')
                        EventBus.$emit('PAYMENT_SCHEDULE_UPDATE')
                        this.closeDialog();

                    }).catch(error => {
                        this.handleError(error)
                    }).finally(() => {
                        this.converting = false
                    })
                }
            },
            closeDialog(){
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>