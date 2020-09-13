<template>
    <div>
        <v-card flat class="mx-10 mt-5">
            <span class="font-weight-medium caption my-2" >Design Details</span>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-thumb-up</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Design Correct:</span>
                    <span> Yes </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Design Check Date:</span>
                    <span> Yes </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-thumb-up</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Costing Correct:</span>
                    <span> Yes </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Costing Check Date:</span>
                    <span> Yes </span>
                </v-col>
            </v-row>
            <span class="font-weight-medium caption my-2" >Build Details</span>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-blank-multiple</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Estimated Build Days:</span>
                    <span> Yes </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-tools</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Trades Required:</span>
                    <span> Yes </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-account-hard-hat</v-icon>
                    <span class="ml-2 font-weight-medium caption">Building Supervisor:</span>
                    <span> Yes </span>
                </v-col>
                <v-col cols="12" sm="6" md="6"></v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-home-outline</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Current Roof Sheet Product:</span>
                    <span> Yes </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-home-outline</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Current Roof Sheet Colour:</span>
                    <span> Yes </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-tape-measure</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Lineal Metres:</span>
                    <span> Yes </span>
                </v-col>
                <v-col cols="12" sm="6" md="6"></v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-store</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Franchise Authority:</span>
                    <span> Yes </span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-icon small>mdi-calendar-month</v-icon>
                    <span class="ml-2 font-weight-medium caption"> Authority Date:</span>
                    <span> Yes </span>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {
name: "VerificationPartial"
}
</script>

<style scoped>

</style>