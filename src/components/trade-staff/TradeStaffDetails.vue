<template>
    <td :colspan="length" class="py-4">
        <v-row>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-account</v-icon>
                <span class="ml-2"> {{ item.firstName}} {{ item.lastName}}</span>
            </v-col>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-card-account-details</v-icon>
                <span class="ml-2"> {{ item.tradeType }}</span>
            </v-col>

        </v-row>
        <v-row>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-phone</v-icon>
                <span class="ml-2"> {{ item.contactNumber }}</span>
            </v-col>

            <v-col cols="12" sm="4">
                <v-icon small>mdi-email</v-icon>
                <span class="ml-2">{{ item.email }}</span>
            </v-col>

        </v-row>
        <v-row>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-store</v-icon>
                <span class="ml-2">Franchise: {{ item.franchise }}</span>
            </v-col>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-office-building</v-icon>
                <span class="ml-2">Company: {{ item.company }}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-newspaper-variant-outline</v-icon>
                <span class="ml-2">ABN: {{ item.abn }}</span>
            </v-col>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-newspaper-variant-outline</v-icon>
                <span class="ml-2">Builders License: {{ item.buildersLicense }}</span>
            </v-col>

        </v-row>
    </td>
</template>

<script>
    export default {
        name: "TradeStaffDetails",
        props: {
            length: {required: true, type: Number},
            item: {required: true, type: Object}
        }
    }
</script>

<style scoped>

</style>