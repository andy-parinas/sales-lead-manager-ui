<template>
    <div>
        <v-card flat>
            <v-data-table
                    :headers="headers"
                    :items="payments"
                    :loading="loading"
                    hide-default-footer
            >
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
            </div>
        </v-card>
    </div>
</template>

<script>
    import PaymentCreateDialog from "./PaymentCreateDialog";
    export default {
        name: "PaymentsMadeTable",
        components: {PaymentCreateDialog},
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
        methods: {
            onPaymentAdded(){

            }
        }
    }
</script>

<style scoped>

</style>