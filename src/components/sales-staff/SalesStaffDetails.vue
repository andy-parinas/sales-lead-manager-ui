<template>
    <td :colspan="length" class="py-4">
        <v-row>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-account</v-icon>
                <span class="ml-2"> {{ item.firstName}} {{ item.lastName}}</span>
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
                <v-icon small>mdi-speedometer</v-icon>
                <span class="ml-2">Status: {{ item.status | capitalize }}</span>
            </v-col>
        </v-row>
    </td>
</template>

<script>
    export default {
        name: "SalesStaffDetails",
        props: {
            length: {required: true, type: Number},
            item: {required: true, type: Object}
        }
    }
</script>

<style scoped>

</style>