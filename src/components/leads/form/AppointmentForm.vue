<template>
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
                                v-model="form.appointmentDate"
                                @input="menu = false"
                                @change="onDateTimeChange"
                        ></v-date-picker>
                    </v-menu>
                </v-col>


                <v-col cols="6" sm="3">
                    <v-menu
                            ref="menu"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="form.appointmentTime"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    :value="computedTime"
                                    label="Appointment Time"
                                    prepend-icon="access_time"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-time-picker
                                v-if="menu2"
                                v-model="form.appointmentTime"
                                @change="onDateTimeChange"
                                ampm-in-title
                                full-width
                                @click:minute="$refs.menu.save(form.appointmentTime)">
                        </v-time-picker>
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
                            v-model="form.comments"
                            rows="1"
                            outlined
                            label="Comments"
                    ></v-textarea>
                </v-col>

            </v-row>

        </v-container>
    </v-form>
</template>

<script>
    import {format, parseISO} from "date-fns";
    import Utils from "../../../helpers/Utils";

    export default {
        name: "AppointmentForm",
        props: {
          initialData: {required: true, type:Object}
        },
        data(){
            return {
                valid: false,
                menu: false,
                menu2: false,
                appointmentDate: new Date().toISOString().substr(0, 10),
                appointmentTime: '',
                form: {
                    appointmentDate: '',
                    appointmentTime: '',
                    outcome: '',
                    quotedPrice: '',
                    notes: '',
                    comments: '',
                    date: ''

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
                return this.form.appointmentDate ? format(parseISO(this.form.appointmentDate), 'dd/MM/yyyy') : ''
            },
            computedTime(){
                if(this.form.appointmentTime){
                    return Utils.convertToAMPM(this.form.appointmentTime)
                }else {
                    return ''
                }

            }
        },
        methods: {
            onDateTimeChange(){
                this.form.date = `${this.form.appointmentDate} ${this.form.appointmentTime}`;
            },
        },
        watch: {
          form: {
              handler(){
                  console.log('Watching Form')
                  this.$emit('updateData', this.form)
              },
              deep: true
          }
        },
        mounted() {
            if(this.initialData){
                this.form = Object.assign({}, this.initialData)
                this.form.date = `${this.form.appointmentDate} ${this.form.appointmentTime}`;
            }
        }

    }
</script>

<style scoped>

</style>