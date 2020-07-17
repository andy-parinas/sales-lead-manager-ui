<template>
    <div>
        <v-card flat class="mx-10">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-icon small>mdi-calendar-clock</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Appointment Date: </span>
                        <v-chip class="ma-2" color="yellow darken-4" text-color="white">
                            {{ data.date | formatDate }}
                        </v-chip>
                        <v-chip class="ma-2" color="orange" text-color="white">
                            {{ data.date | formatTime }}
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
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn text small fab @click="editDialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
                </v-row>
            </v-card-text>
        </v-card>
        <v-container>
            <v-row justify="center">
                <v-dialog v-model="editDialog" persistent max-width="800px">
                    <AppointmentEditDialog
                            @close="editDialog = false"
                            @success="$emit('success')" />
                </v-dialog>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import ChipOutcome from "../../../components/leads/ChipOutcome";
    import AppointmentEditDialog from "../../../components/leads/edit-dialog/AppointmentEditDialog";
    export default {
        name: "AppointmentPartial",
        components: {AppointmentEditDialog, ChipOutcome},
        props: {
            data: { required: true, type: Object}
        },
        data(){
            return {
                editDialog: false
            }
        }
    }
</script>

<style scoped>

</style>