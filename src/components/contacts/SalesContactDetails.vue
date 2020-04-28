<template>
    <td :colspan="length" class="py-4">
        <v-row>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-account</v-icon>
                <span class="ml-2">{{item.title}} {{ item.firstName}} {{ item.lastName}}</span>
            </v-col>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-briefcase</v-icon>
                <span class="ml-2">{{ item.customerType | capitalize }}</span>
            </v-col>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-clipboard-text</v-icon>
                <span class="ml-2">{{ item.status | capitalize }}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-email</v-icon>
                <span class="ml-2">{{ item.email }}</span>
            </v-col>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-email</v-icon>
                <span class="ml-2">{{ item.email2 }}</span>
            </v-col>
            <v-col cols="12" sm="4">
                <v-icon small>mdi-phone</v-icon>
                <span class="ml-2">{{ item.contactNumber }}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6">
                <v-icon small>mdi-home</v-icon>
                <span class="ml-2">{{ item.street1 }}</span>
            </v-col>
            <v-col cols="12" sm="6">
                <span class="ml-2">{{ item.street2 }}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="12">
                <v-icon small>mdi-map</v-icon>
                <span class="ml-2">{{ item.suburb}}, {{ item.state}} {{item.postcode}}</span>
            </v-col>
        </v-row>
    </td>
</template>

<script>
    export default {
        name: "SalesContactDetails",
        props: {
            length: {required: true, type: Number},
            item: {required: true, type: Object}
        }
    }
</script>

<style scoped>

</style>