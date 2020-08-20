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
                                    @click="deletePayment(item)">
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
                <v-btn small @click="showCreateDialog = true">Add Payment Schedule</v-btn>
            </div>
            <div>
                <v-dialog v-model="showCreateDialog" persistent max-width="500px">
                    <PaymentScheduleCreateDialog @close="showCreateDialog = false" :finance-id="financeId" />
                </v-dialog>
                <v-dialog v-model="showEditDialog" persistent max-width="500px">
                    <PaymentScheduleEditDialog @close="showEditDialog = false"
                                               :payment="selectedItem" :finance-id="financeId" />
                </v-dialog>
                <v-dialog v-model="showDeleteDialog" persistent max-width="500px">

                </v-dialog>
            </div>
        </v-card>
    </div>
</template>

<script>
    import PaymentScheduleCreateDialog from "./PaymentScheduleCreateDialog";
    import FinanceAPI from "../../../api/FinanceAPI";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import EventBus from "../../../helpers/EventBus";
    import PaymentScheduleEditDialog from "./PaymentScheduleEditDialog";
    export default {
        name: "PaymentsScheduleTable",
        components: {PaymentScheduleEditDialog, PaymentScheduleCreateDialog},
        props: ['financeId'],
        data(){
            return {
                showCreateDialog: false,
                showEditDialog: false,
                showDeleteDialog: false,
                loading: false,
                headers: [
                    { text: 'Due Date',value: 'dueDate'},
                    { text: 'Description', value: 'description' },
                    { text: 'Amount', value: 'amount' },
                    { text: 'Status', value: 'status' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                payments: [],
                selectedItem: null
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            getPayments(financeId){
                this.loading = true;
                FinanceAPI.getPaymentsSchedule(financeId).then(response => {
                    this.payments = response.data
                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.loading = false;
                })
            },
            deletePayment(){

            },
            editPayment(item){
                this.selectedItem = item;
                this.showEditDialog = true;
            }
        },
        mounted() {
            if(this.financeId){
                this.getPayments(this.financeId);
            }

            EventBus.$on('PAYMENT_SCHEDULE_UPDATE', () => this.getPayments(this.financeId))
        }
    }
</script>

<style scoped>

</style>