<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="6">
                <v-dialog persistent  max-width="600px" v-model="show">
                    <v-card>
                        <v-card-title>
                            <span class="subtitle-1">The <strong>Sales Contact postcode </strong> is  <u>OUTSIDE</u> the selected
                                <strong>Franchise assigned postcodes.</strong></span>
                        </v-card-title>
                        <v-card-text>
                            <p>
                                Please ensure that you have selected the correct Franchise or correct Sales Contact

                                If your Franchise and Sales Contact postcode is correct you must inform Spanline Australia
                                in writing and the Franchise Owner of the relevant territory for this postcode or part thereof
                                of the details of this customer and project.

                                If you do not have permission from the Franchise Owner of the relevant territory for this postcode
                                to undertake this Spanline Product project then you cannot proceed with this job.

                                If you proceed with this project without having agreement in writing from the Franchise Owner of the
                                relevant Territory for this postcode, you may be in breach of your Franhise Agreement.
                            </p>
                            <p>
                                Disclaimer: Spanline Australia is not responsible for the accuracy of any information entered in this
                                system by any Franchise
                            </p>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="deep-orange" text @click="$emit('close')">I Understand</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "FormPostcodeAlert",
        props: ['show']
    }
</script>

<style scoped>

</style>