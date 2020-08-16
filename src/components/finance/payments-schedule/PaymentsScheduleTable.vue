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
                <v-btn small @click="showCreateDialog = true">Add Payment</v-btn>
            </div>
            <div>
                <v-dialog v-model="showCreateDialog" persistent max-width="500px">
                    <PaymentScheduleCreateDialog @close="showCreateDialog = false" />
                </v-dialog>
                <v-dialog v-model="showEditDialog" persistent max-width="500px">

                </v-dialog>
                <v-dialog v-model="showDeleteDialog" persistent max-width="500px">

                </v-dialog>
            </div>
        </v-card>
    </div>
</template>

<script>
    import PaymentScheduleCreateDialog from "./PaymentScheduleCreateDialog";
    export default {
        name: "PaymentsScheduleTable",
        components: {PaymentScheduleCreateDialog},
        props: [],
        data(){
            return {
                showCreateDialog: false,
                showEditDialog: false,
                showDeleteDialog: false,
                headers: [
                    { text: 'Payment Date',value: 'paymentDate'},
                    { text: 'Description', value: 'description' },
                    { text: 'Amount', value: 'amount' },
                    { text: 'Status', value: 'status' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                payments: []
            }
        },
        methods: {
            deletePayment(){

            },
            editPayment(){

            }
        }
    }
</script>

<style scoped>

</style>