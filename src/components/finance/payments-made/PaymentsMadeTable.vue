<template>
    <div>
        <v-card flat>
            <v-data-table
                    :headers="headers"
                    :items="payments"
                    :loading="loading"
                    hide-default-footer
            >
                <template v-slot:item.actions="{ item }">
                    <v-container>
                        <v-row class="justify-sm-start">
                            <v-btn x-small fab text dark color="error" class="mr-3"
                                   v-if="isHeadOffice"  @click="deletePayment(item)">
                                <v-icon small >mdi-trash-can-outline </v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="accent" @click="editPayment(item)" >
                                <v-icon small> mdi-pencil</v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>
                </template>

            </v-data-table>
            <div class="mt-5">
                <v-btn small @click="showCreateDialog = true">Add Payment</v-btn>
            </div>
            <div>
                <v-dialog v-model="showCreateDialog" persistent max-width="500px">
                    <PaymentCreateDialog
                            :finance-id="financeId"
                            @close="showCreateDialog = false"
                            @success="onPaymentAdded"/>
                </v-dialog>
                <v-dialog v-model="showEditDialog" persistent max-width="500px">
                    <PaymentEditDialog
                            :payment="selectedItem"
                            :finance-id="financeId"
                            @close="closeEditDialog"
                            @success="onPaymentUpdated"/>
                </v-dialog>
                <v-dialog v-model="showDeleteDialog" persistent max-width="500px">
                    <PaymentDeleteDialog
                            :payment="selectedItem"
                            :finance-id="financeId"
                            @close="closeDeleteDialog"/>
                </v-dialog>
            </div>
        </v-card>
    </div>
</template>

<script>
    import PaymentCreateDialog from "./PaymentCreateDialog";
    import FinanceAPI from "../../../api/FinanceAPI";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import PaymentEditDialog from "./PaymentEditDialog";
    import EventBus from "../../../helpers/EventBus";
    import PaymentDeleteDialog from "./PaymentDeleteDialog";
    export default {
        name: "PaymentsMadeTable",
        components: {PaymentDeleteDialog, PaymentEditDialog, PaymentCreateDialog},
        props: ['financeId'],
        data(){
            return {
                loading: false,
                showCreateDialog: false,
                showEditDialog: false,
                showDeleteDialog: false,
                payments: [],
                isHeadOffice: true,
                headers: [
                    { text: 'Payment Date',value: 'paymentDate'},
                    { text: 'Description', value: 'description' },
                    { text: 'Amount', value: 'amount' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                selectedItem: null
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            onPaymentAdded(){
                this.getPaymentsMade(this.financeId)
            },
            onPaymentUpdated(){
                this.getPaymentsMade(this.financeId)
            },
            getPaymentsMade(financeId){
                this.loading = true;
                FinanceAPI.getPaymentsMade(financeId).then(response => {
                    this.payments = response
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.loading = false;
                })
            },
            deletePayment(item){
                this.showDeleteDialog = true
                this.selectedItem = item
            },
            editPayment(payment){
                this.selectedItem = payment
                this.showEditDialog = true
            },
            closeEditDialog(){
                this.showEditDialog = false
                this.selectedItem = null
            },
            closeDeleteDialog(){
                this.showDeleteDialog = false
                this.selectedItem = null
            }
        },
        mounted() {
            if(this.financeId){
                this.getPaymentsMade(this.financeId)
            }

            EventBus.$on('PAYMENT_MADE_UPDATED', () => this.getPaymentsMade(this.financeId))
        }
    }
</script>

<style scoped>

</style>