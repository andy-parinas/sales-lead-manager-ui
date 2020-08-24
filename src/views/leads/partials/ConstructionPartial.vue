<template>
    <div>
        <v-card flat class="mx-10">
            <v-card-text>
                <span class="font-weight-medium caption" >Site Address</span>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-icon small>mdi-home</v-icon>
                        <span class="ml-2"> Street Address </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-map</v-icon>
                        <span class="ml-2"> Suburb, State, Postcode</span>
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <span class="font-weight-medium caption">Manufacturing/Assembly Details</span>
                <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-icon small>mdi-clipboard-list</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Material List:  </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Date Materials Received:</span>
                        <span> 24/08/2020 </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Date Assemby Completed:</span>
                        <span> 24/08/2020 </span>
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <span class="font-weight-medium caption">Manufacturing/Delivery Details</span>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Anticipated Delivery Date:</span>
                        <span> 24/08/2020 </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Finished Product Delivery Date:</span>
                        <span> 24/08/2020 </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-clipboard-list</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Coil Number:</span>
                        <span>  </span>
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <span class="font-weight-medium caption">Building Details</span>
                <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-icon small>mdi-tools</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Builders Name:</span>
                        <span> John Doe </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Anticipated Construction Start:</span>
                        <span> 24/08/2020 </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Actual Construction Start:</span>
                        <span> 24/08/2020 </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Anticipated Completion Date:</span>
                        <span> 24/08/2020 </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Actual Completion Date:</span>
                        <span> 24/08/2020 </span>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                        <v-icon small>mdi-comment</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Comments:</span>
                        <span> Lorem Ipsum </span>
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <span class="font-weight-medium caption">Inspection Details</span>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-icon small>mdi-calendar-month</v-icon>
                        <span class="ml-2 font-weight-medium caption"> Final Inspection Date:</span>
                        <span> 24/08/2020 </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn text small fab><v-icon>mdi-pencil</v-icon></v-btn>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "ConstructionPartial"
    }
</script>

<style scoped>

</style>