<template>
    <div>
        <v-form v-model="valid">
            <v-container>
                <v-row class="mx-2">
                    <v-col cols="6" sm="3">
                        <v-menu
                                v-model="menu"
                                ref="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        prepend-icon="event"
                                        :value="computedDateFormattedDatefns"
                                        :rules="rules.required"
                                        label="Appointment Date"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="appointmentDate"
                                    @input="menu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>


                    <v-col cols="6" sm="3">
                        <v-menu
                                v-model="menu"
                                ref="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        prepend-icon="event"
                                        :value="computedDateFormattedDatefns"
                                        :rules="rules.required"
                                        label="Appointment Time"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="appointmentDate"
                                    @input="menu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>


                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.quotedPrice"
                                      prepend-icon="mdi-tag"
                                      label="Quoted Price"
                                      :rules="rules.required" />
                    </v-col>

                    <v-col cols="12">
                        <v-textarea
                                v-model="form.notes"
                                rows="2"
                                outlined
                                label="Notes"
                        ></v-textarea>
                    </v-col>


                    <v-col cols="12" sm="6">
                        <v-autocomplete
                                v-model="form.outcome"
                                :items="outcomes"
                                :rules="rules.required"
                                label="Outcome"
                                prepend-icon="mdi-clipboard-check"
                                required
                        ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-textarea
                                v-model="form.notes"
                                rows="1"
                                outlined
                                label="Comments"
                        ></v-textarea>
                    </v-col>

                </v-row>
                <v-row>
                    <v-btn color="primary" class="mr-2" @click="$emit('moveBack')">Back</v-btn>
                    <v-btn color="primary"
                           :disabled="!valid">Continue</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="mr-2" @click="$emit('moveBack')">Cancel</v-btn>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script>
    import {format, parseISO} from "date-fns";

    export default {
        name: "FormAppointment",
        data(){
            return {
                valid: false,
                menu: false,
                appointmentDate: new Date().toISOString().substr(0, 10),
                appointmentTime: '',
                form: {
                    appointmentDate: '',
                    outcome: '',
                    quotedPrice: '',
                    notes: ''

                },
                rules: {
                    required: [
                        v => !!v || 'This field is required',
                    ]
                },
                outcomes: [
                    {value: 'pending', text: 'Pending'},
                    {value: 'follow-up', text: 'Follow-Up'},
                    {value: 'lost', text: 'Lost'},
                    {value: 'success', text: 'Success'},
                    {value: 'deferred', text: 'Deffered'},
                    {value: 'cancelled', text: 'Cancelled'},
                    {value: 'did not proceed', text: 'Did Not Proceed'}]
            }
        },
        computed: {
            computedDateFormattedDatefns () {
                return this.appointmentDate ? format(parseISO(this.appointmentDate), 'dd/MM/yyyy') : ''
            },
        }
    }
</script>

<style scoped>

</style>