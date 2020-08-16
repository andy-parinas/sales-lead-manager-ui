<template>
    <div>
        <v-skeleton-loader v-if="loading"
                           :loading="loading"
                           height="94"
                           type="list-item-two-line">
            <v-card>
                <v-card-title>Title</v-card-title>
                <v-card-text>Card Text</v-card-text>
            </v-card>
        </v-skeleton-loader>
        <v-card flat class="mx-10" v-if="finance === null && !loading">
            <v-row >
                <v-col cols="12" sm="6">
                    <span class="ml-2  heading-6 font-weight-medium grey--text"> No Finance Available. </span>
                    <v-btn text color="primary" class="ml-2" @click="getFinance"> Reload </v-btn>
                    <p class="ml-2  heading-6  grey--text text--darken-3 mt-1">
                        Finance needs a Contract. Please proceed to contract tab and create a contact
                    </p>
                </v-col>
            </v-row>
        </v-card>
        <v-card flat class="mx-10" v-if="finance && !loading">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                <tr>
                                    <th> Project Price</th>
                                    <td class="text-right"> {{ finance.projectPrice }} </td>
                                </tr>
                                <tr>
                                    <th> GST</th>
                                    <td class="text-right"> {{ finance.gst }} </td>
                                </tr>
                                <tr>
                                    <th> Contract Price </th>
                                    <td class="text-right"> {{ finance.contractPrice }}  </td>
                                </tr>
                                <tr></tr>

                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                    <v-col cols="12" sm="2"></v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                <tr>
                                    <th> Total Contract inc. Variations </th>
                                    <td class="text-right"> {{ finance.totalContract }} </td>
                                </tr>
                                <tr>
                                    <th> Deposit </th>
                                    <td class="text-right"> {{finance.deposit }} </td>
                                </tr>
                                <tr>
                                    <th> Total Payments Made </th>
                                    <td class="text-right"> {{ finance.totalPaymentMade }} </td>
                                </tr>
                                <tr>
                                    <th> Balance </th>
                                    <td class="text-right"> {{ finance.balance }} </td>
                                </tr>
                                <tr></tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn :loading="refreshing"
                            text small fab @click="getFinance"><v-icon>mdi-refresh</v-icon></v-btn>
                </v-row>
                <v-divider class="mt-10 mb-3"></v-divider>
                <v-btn text small @click="showPaymentMade = !showPaymentMade">
                    {{ showPaymentMade? 'Hide Payments' : 'Show Payments'}}
                    <v-icon> {{ showPaymentMade? 'mdi-chevron-down' : 'mdi-chevron-right'}}</v-icon>
                </v-btn>
                <v-row v-if="showPaymentMade" class="mt-1">
                    <v-col cols="12" sm="12">
                        <PaymentsMadeTable :finance-id="finance.id" />
                    </v-col>
                </v-row>
                <v-divider class="mt-10 mb-3"></v-divider>
                <v-btn text small @click="showPaymentSchedule = !showPaymentSchedule">
                    {{ showPaymentSchedule? 'Hide Payment Schedule' : 'Show Payment Schedule'}}
                    <v-icon> {{ showPaymentSchedule? 'mdi-chevron-down' : 'mdi-chevron-right'}}</v-icon>
                </v-btn>
                <v-row v-if="showPaymentSchedule" class="mt-1">
                    <v-col cols="12" sm="12">
                        <PaymentsScheduleTable :finance-id="finance.id" />
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import FinanceAPI from "../../../api/FinanceAPI";
    import PaymentsMadeTable from "../../../components/finance/payments-made/PaymentsMadeTable";
    import EventBus from "../../../helpers/EventBus";
    import PaymentsScheduleTable from "../../../components/finance/payments-schedule/PaymentsScheduleTable";

    export default {
        name: "FinancePartial",
        components: {PaymentsScheduleTable, PaymentsMadeTable},
        props: {
            leadId: {required: true}
        },
        data(){
            return {
                showPaymentMade: false,
                showPaymentSchedule: false,
                loading: false,
                refreshing: false,
                finance: null
            }
        },
        methods: {
            getFinance(){
                if(!this.finance){
                    this.loading = true;
                }else {
                    this.refreshing = true
                }

                FinanceAPI.getLeadFinance(this.leadId).then(response => {
                    if(response.status === 200){
                        this.finance = Object.assign({}, response.data.data);
                    }
                }).catch(error => {
                    console.log(error.response)
                }).finally(() => {
                    this.loading = false;
                    this.refreshing = false;
                })
            }
        },
        mounted() {
            if(this.leadId){
                this.getFinance();
            }

            EventBus.$on('PAYMENT_MADE_UPDATED', () => this.getFinance())
            EventBus.$on('PAYMENT_MADE_CREATED', () => this.getFinance())
            EventBus.$on('PAYMENT_MADE_DELETED', () => this.getFinance())
        }
    }
</script>

<style scoped>

</style>