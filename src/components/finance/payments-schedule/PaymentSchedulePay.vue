<template>
    <v-card>
        <DialogHeader title="Payment For Schedule">
            <template v-slot:action>
                <v-btn small icon @click="closeDialog">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-card-text>
            <v-form v-model="isFormValid" ref="form">
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-text-field v-model="form.payment"
                                      prepend-icon="mdi-cash"
                                      label="Payment Amount"
                                      :rules="[rules.requiredField, rules.numberField]"
                        />
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue darken-1" class="mr-3 mb-2 white--text"
                   @click="onConvertPayment"
                   :disabled="!isFormValid"
                   :loading="converting">
                Pay
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import ErrorHandlerMixins from "@/mixins/ErrorHandler";
import {mapActions} from "vuex";
import FinanceAPI from "@/api/FinanceAPI";
import EventBus from "@/helpers/EventBus";
import DialogHeader from "@/components/core/DialogHeader";

export default {
    name: "PaymentSchedulePay",
    components: {DialogHeader},
    props: {
        payment: {required: true},
        financeId: {required: true}
    },
    data(){
        return {
            converting: false,
            isFormValid: false,
            form: {
                payment: ''
            },
            rules: {
                requiredField: v => !!v || 'This field is required',
                numberField: v => /^-?(\d*\.)?\d+$/.test(v) || 'Field should only be numbers',
            },
        }
    },
    mixins: [ErrorHandlerMixins],
    methods: {
        ...mapActions(['setSuccessMessage']),
        onConvertPayment(){
            if(this.payment && this.financeId){
                this.converting = true
                FinanceAPI.addPaymentFromSchedule(this.financeId, this.payment.id, this.form).then(() => {
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