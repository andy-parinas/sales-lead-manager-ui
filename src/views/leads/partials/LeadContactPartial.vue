<template>
    <v-card flat class="mx-10">
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-numeric-0-box-multiple-outline</v-icon>
                    <span class="ml-2 caption font-weight-bold">Lead Number:</span> <span class="ml-1"> {{data.leadNumber}} </span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-store</v-icon>
                    <span class="ml-2 caption font-weight-bold">Franchise Number: </span> <span class="ml-1"> {{data.franchiseNumber }} </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-calendar</v-icon>
                    <span class="ml-2 caption font-weight-bold">Lead Date: </span> <span class="ml-1"> {{ data.leadDate | formatDate }} </span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-briefcase</v-icon>
                    <span class="ml-2 caption font-weight-bold">Lead Type: </span> <span class="ml-1"> {{ data.customerType | capitalize }} </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-web</v-icon>
                    <span class="ml-2 caption font-weight-bold">Lead Source: </span> <span class="ml-1"> {{ data.leadSource | capitalize }} </span>
                </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-account</v-icon>
                    <span class="ml-2"> {{ data.firstName}} {{ data.lastName }} </span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-phone</v-icon>
                    <span class="ml-2">{{ data.contactNumber }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-email</v-icon>
                    <span class="ml-2"> {{ data.email }}</span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-email</v-icon>
                    <span class="ml-2">{{ data.email2 }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-home</v-icon>
                    <span class="ml-2">{{ data.street1 }}</span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-sign-direction</v-icon>
                    <span class="ml-2"> {{ data.street2 }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-icon small>mdi-map</v-icon>
                    <span class="ml-2">{{data.suburb}}, {{data.state}}, {{data.postcode}}</span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "LeadContactPartial",
        props: {
            data: {required: true, type: Object}
        }
    }
</script>

<style scoped>

</style>