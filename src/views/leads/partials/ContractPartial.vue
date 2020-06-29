<template>
    <div>
        <v-card flat class="mx-10">
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
                    <v-col cols="12" sm="12">
                        <v-icon small>mdi-pen</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Design Advisor: </span> <span> TEST </span>
                    </v-col>
                </v-row>

            </v-card-text>
        </v-card>
        <v-container>
            <v-row justify="center">
<!--                    TODO Dialog-->
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "ContractPartial"
    }
</script>

<style scoped>

</style>