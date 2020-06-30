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
        <v-card flat class="mx-10" v-if="contract === null && !loading">
            <v-row >
                <v-col cols="12" sm="6">
                    <span class="ml-2  heading-6 font-weight-medium grey--text"> No Contract Available </span>
                    <v-btn text color="primary" class="mr-2" @click="showCreateDialog =true">Click Here to Create</v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card flat class="mx-10" v-if="contract && !loading">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-calendar</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Contract Date: </span> <span> {{ contract.contractDate}} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-file-document-edit</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Contract Number: </span> <span> {{ contract.contractNumber}} </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                <tr>
                                    <th> Contract Price</th>
                                    <td class="text-right">{{ contract.contractPrice }}</td>
                                </tr>
                                <tr>
                                    <th> Deposit Amount</th>
                                    <td class="text-right">{{ contract.depositAmount }}</td>
                                </tr>
                                <tr>
                                    <th> Total Variation</th>
                                    <td class="text-right"> 0 </td>
                                </tr>
                                <tr>
                                    <th> Total Contract</th>
                                    <td class="text-right">{{ contract.totalContract }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-calendar</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Date Deposit Received: </span> <span> {{ contract.dateDepositReceived }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-tools</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Warranty Required: </span> <span> {{contract.warrantyRequired }} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-calendar</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Date Warranty Sent: </span> <span> {{ contract.dateWarrantySent }} </span>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </v-card-text>
        </v-card>
        <v-container>
            <v-row justify="center">
                <v-dialog v-model="showCreateDialog" persistent max-width="800px">
                    <ContractCreateDialog
                            :lead-id="leadId"
                            @onContractCreated="updateContractObject"
                            @close="showCreateDialog = false"
                            @success="$emit('success')"/>
                </v-dialog>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import ContractAPI from "../../../api/ContractAPI";
    import ContractCreateDialog from "../../../components/contract/ContractCreateDialog";

    export default {
        name: "ContractPartial",
        components: {ContractCreateDialog},
        props: {
            leadId: {required: true}
        },
        data(){
            return {
                loading: false,
                showCreateDialog: false,
                contract: null,
            }
        },
        methods: {
            getContract(){
                this.loading = true;
                ContractAPI.getLeadContract(this.leadId).then(response => {
                    if(response.status === 200){
                        this.contract = Object.assign({}, response.data.data);
                    }
                }).catch(error => {
                    console.log(error.response)
                }).finally(() => {
                    this.loading = false
                })
            },
            updateContractObject(contract){
                console.log('Contract', contract)
                if(contract !== null){
                    this.contract = Object.assign({}, contract)
                }
            }
        },
        mounted() {
            console.log('LeadId', this.leadId)
            this.getContract();
        }
    }
</script>

<style scoped>

</style>