<template>
    <v-card flat class="mx-10">
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-icon small>mdi-calendar-clock</v-icon>
                    <span class="ml-2 caption font-weight-bold"> Appointment Date: </span>
                    <v-chip class="ma-2" color="yellow darken-4" text-color="white">
                        12-24-2020
                    </v-chip>
                    <v-chip class="ma-2" color="orange" text-color="white">
                        12:50 PM
                    </v-chip>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-icon small>mdi-clipboard-text</v-icon>
                    <span class="ml-2 caption font-weight-bold"> Notes: </span>
                    <span> {{data.notes }} </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-tag</v-icon>
                    <span class="ml-2 caption font-weight-bold"> Quoted Price: </span> <span> {{ data.quotedPrice }}</span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-clipboard-check</v-icon>
                    <span class="ml-2 mr-2 caption font-weight-bold"> Outcome: </span> <ChipOutcome :outcome="data.outcome" :small="true" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-icon small>mdi-comment-text</v-icon>
                    <span class="ml-2 caption font-weight-bold"> Comments: </span>
                    <span>{{ data.comments }}</span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    import ChipOutcome from "../../../components/leads/ChipOutcome";
    export default {
        name: "AppointmentPartial",
        components: {ChipOutcome},
        props: {
            data: { required: true, type: Object}
        }
    }
</script>

<style scoped>

</style>