<template>
    <v-card flat class="mx-10">
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-numeric-0-box-multiple-outline</v-icon>
                    <span class="ml-2 caption font-weight-bold">Lead Number:</span> <span class="ml-1"> 123456 </span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-store</v-icon>
                    <span class="ml-2 caption font-weight-bold">Franchise Number: </span> <span class="ml-1"> 98756 </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-calendar</v-icon>
                    <span class="ml-2 caption font-weight-bold">Lead Date: </span> <span class="ml-1"> 25-04-2020 </span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-briefcase</v-icon>
                    <span class="ml-2 caption font-weight-bold">Lead Type: </span> <span class="ml-1"> Residential </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-calendar</v-icon>
                    <span class="ml-2 caption font-weight-bold">Lead Source: </span> <span class="ml-1"> Hi Pages </span>
                </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-account</v-icon>
                    <span class="ml-2"> Andy Parinas </span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-phone</v-icon>
                    <span class="ml-2">0481 791 820</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-email</v-icon>
                    <span class="ml-2"> atparinas@gmail.com </span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-email</v-icon>
                    <span class="ml-2"></span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-home</v-icon>
                    <span class="ml-2">26/51 Cottesloe Drive</span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-sign-direction</v-icon>
                    <span class="ml-2"> </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-icon small>mdi-map</v-icon>
                    <span class="ml-2">Robina, QLD, 4226</span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "LeadContactPartial"
    }
</script>

<style scoped>

</style>