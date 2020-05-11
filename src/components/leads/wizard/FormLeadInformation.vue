<template>
    <v-form v-model="valid">
        <v-container>
            <v-row class="mx-2">
                <v-col cols="12" sm="6">
                    <v-text-field v-model="form.leadNumber"
                                  prepend-icon="mdi-numeric-0-box-multiple-outline"
                                  label="Lead Number"
                                  :rules="rules.required"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                            v-model="form.franchiseId"
                            :items="franchiseItems"
                            :rules="[v => !!v || 'Field is required']"
                            label="Franchise Number"
                            prepend-icon="mdi-store"
                            required
                    ></v-select>
                </v-col>

                <v-col cols="12" sm="6">
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
                                    label="Lead Date"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="date"
                                @input="menu = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                                  prepend-icon="mdi-briefcase"
                                  label="Lead Type"
                                  :value="contact.customerType | capitalize "
                                  readonly
                    />
                </v-col>

                <v-col cols="12" sm="6">
                    <v-autocomplete
                            v-model="form.leadSourceId"
                            :items="leadSources"
                            :rules="[v => !!v || 'Field is required']"
                            label="Lead Source"
                            prepend-icon="mdi-web"
                            required
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>

            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-account</v-icon>
                    <span class="ml-2"> {{ contact.firstName}} {{ contact.lastName }} </span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-phone</v-icon>
                    <span class="ml-2">{{ contact.contactNumber }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-email</v-icon>
                    <span class="ml-2"> {{ contact.email }}</span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-email</v-icon>
                    <span class="ml-2">{{ contact.email2 }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-home</v-icon>
                    <span class="ml-2">{{ contact.street1 }}</span>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-icon small>mdi-sign-direction</v-icon>
                    <span class="ml-2"> {{ contact.street2 }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-icon small>mdi-map</v-icon>
                    <span class="ml-2">{{contact.suburb}}, {{contact.state}}, {{contact.postcode}}</span>
                </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
                <v-btn color="primary" class="mr-2" @click="$emit('cancel')">Cancel</v-btn>
                <v-btn color="primary" class="mr-2" @click="$emit('moveBack')">Back</v-btn>
                <v-btn color="primary"
                       @click="moveNext"
                       :disabled="!valid">Continue</v-btn>
            </v-row>
        </v-container>
<!--        <pre>{{ parseISO(new Date().toISOString().substring(0,10)) }}</pre>-->
        <pre>{{ franchiseItems }}</pre>
    </v-form>
</template>

<script>

    import {format, parseISO} from 'date-fns';
    import {mapState} from 'vuex';

    import LeadSoruceAPI from "../../../api/LeadSourceAPI";

    export default {
        name: "FormLeadInformation",
        props: {
          contact: {required: true, type: Object}
        },
        data(){
            return {
                menu: false,
                valid: false,
                date: new Date().toISOString().substr(0, 10),
                form: {
                    leadNumber: '',
                    franchiseId: '',
                    leadSourceId: '',
                    leadDate: new Date().toISOString().substr(0, 10)

                },
                rules: {
                    required: [
                        v => !!v || 'This field is required',
                    ]
                },
                leadSources: []
            }
        },
        computed: {
            ...mapState('auth', ['franchises']),
            computedDateFormattedDatefns () {
                return this.date ? format(parseISO(this.date), 'dd/MM/yyyy') : ''
            },
            franchiseItems(){
                const items = this.franchises.map(franchise => {
                    return {
                        value: franchise.id,
                        text: franchise.franchiseNumber
                    }
                })

                return items;
            }
        },
        methods: {
            moveNext(){
                this.$emit('moveNext', this.form)
            }
        },
        created() {
            LeadSoruceAPI.getleadSoruces().then(response => {

                const sources = response.data.map(s => {
                    return {
                        value: s.id,
                        text: s.name
                    }
                })

                this.leadSources = sources;

            }).catch(error => {
                console.log(error);
            })
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>