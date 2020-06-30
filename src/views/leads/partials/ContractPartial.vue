<template>
    <div>
        <v-card flat class="mx-10" v-if="contract === null">
            <v-row >
                <v-col cols="12" sm="6">
                    <span class="ml-2  heading-6 font-weight-medium grey--text"> No Contract Available </span>
                    <v-btn text color="primary" class="mr-2" @click="showCreateDialog =true">Click Here to Create</v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card flat class="mx-10" v-else>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-calendar</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Contract Date: </span> <span> 26/06/2020 </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-file-document-edit</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Contract Number: </span> <span> AAAA 11111 </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                <tr>
                                    <th> Contract Price</th>
                                    <td>20,000.00</td>
                                </tr>
                                <tr>
                                    <th> Deposit Amount</th>
                                    <td>20,000.00</td>
                                </tr>
                                <tr>
                                    <th> Total Variation</th>
                                    <td>20,000.00</td>
                                </tr>
                                <tr>
                                    <th> Total Contract</th>
                                    <td>20,000.00</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-calendar</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Date Deposit Received: </span> <span> 26/06/2020</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-tools</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Warranty Required: </span> <span> Yes </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-calendar</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Date Warranty Sent: </span> <span> 26/06/2020 </span>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </v-card-text>
        </v-card>
        <v-container>
            <v-row justify="center">
                <v-dialog v-model="showCreateDialog" persistent max-width="800px">
                    <ContractCreateDialog
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
                showCreateDialog: false,
                contract: null,
            }
        },
        methods: {
            getContract(){
                ContractAPI.getLeadContract(this.leadId).then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error.response)
                })
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