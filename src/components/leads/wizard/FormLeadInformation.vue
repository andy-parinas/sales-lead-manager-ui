<template>
    <div>
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
                                v-model="franchiseId"
                                :items="franchiseItems"
                                :rules="[v => !!v || 'Field is required']"
                                :loading="franchiseChecking"
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
                    <v-col cols="12" sm="6" v-if="selectedContact">
                        <v-text-field
                                      prepend-icon="mdi-briefcase"
                                      label="Lead Type"
                                      :value="selectedContact.customerType | capitalize "
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
                    <v-col cols="12" sm="12" >
                        <FormPostcodeAlert  v-if="isOutsideFranchise" />
                    </v-col>
                </v-row>
                <v-divider class="my-5"></v-divider>

                <div v-if="selectedContact">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-icon small>mdi-account</v-icon>
                            <span class="ml-2"> {{ selectedContact.firstName}} {{ selectedContact.lastName }} </span>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-icon small>mdi-phone</v-icon>
                            <span class="ml-2">{{ selectedContact.contactNumber }}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-icon small>mdi-email</v-icon>
                            <span class="ml-2"> {{ selectedContact.email }}</span>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-icon small>mdi-email</v-icon>
                            <span class="ml-2">{{ selectedContact.email2 }}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-icon small>mdi-home</v-icon>
                            <span class="ml-2">{{ selectedContact.street1 }}</span>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-icon small>mdi-sign-direction</v-icon>
                            <span class="ml-2"> {{ selectedContact.street2 }}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-icon small>mdi-map</v-icon>
                            <span class="ml-2">{{selectedContact.suburb}}, {{selectedContact.state}}, {{selectedContact.postcode}}</span>
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
                </div>
            </v-container>
<!--            <pre>{{ franchiseItems }}</pre>-->
<!--            <pre>{{ contact }}</pre>-->
        </v-form>
    </div>
</template>

<script>

    import {format, parseISO} from 'date-fns';
    import {mapState} from 'vuex';

    import LeadSourceAPI from "../../../api/LeadSourceAPI";
    import PostcodeAPI from "../../../api/PostcodeAPI";
    import FormPostcodeAlert from "./FormPostcodeAlert";

    export default {
        name: "FormLeadInformation",
        components: {FormPostcodeAlert},
        data(){
            return {
                menu: false,
                valid: false,
                franchiseId: '',
                franchisePostcodes: [],
                franchiseChecking: false,
                postcodeStatus: '',
                date: new Date().toISOString().substr(0, 10),
                form: {
                    leadNumber: '',
                    franchiseId: '',
                    franchiseNumber: '',
                    leadSourceId: '',
                    leadSource: '',
                    leadDate: new Date().toISOString().substr(0, 10),

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
            ...mapState('salesContacts', ['selectedContact']),
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
            },
            isOutsideFranchise(){
                return this.postcodeStatus === 'OUTSIDE_FRANCHISE';
            }
        },
        methods: {
            moveNext(){

                if(this.franchiseItems.length > 0 && this.leadSources.length > 0){

                    //Include the Text information in the form:
                    const franchise = this.franchiseItems.find(f => {
                        return f.value === this.form.franchiseId
                    })

                    if (franchise) this.form.franchiseNumber = franchise.text;

                    const leadSource = this.leadSources.find(s => {
                        return s.value === this.form.leadSourceId
                    })
                    if( leadSource ) this.form.leadSource = leadSource.text;
                }

                this.$emit('moveNext', {
                    details: {
                        ...this.form,
                        ...this.selectedContact
                    }
                })
            },
            checkFranchisePostcode(){

                this.franchisePostcodes = [];
                this.postcodeStatus = '';
                this.franchiseChecking = true;

                PostcodeAPI.getFranchisePostcodes(this.franchiseId).then(response => {

                    this.franchiseChecking = false;

                    const postcodes = response.data;

                    const filtered = postcodes.filter(postcode => {
                        this.franchisePostcodes.push(postcode.postcode);

                        return postcode.postcode === this.selectedContact.postcode
                    })


                    if(filtered.length === 0){
                        this.dialog = true;
                        this.postcodeStatus = 'OUTSIDE_FRANCHISE';

                    }else{
                        this.postcodeStatus = 'INSIDE_FRANCHISE';
                    }

                }).catch(error => {
                    this.franchiseChecking = false
                    console.log(error.response)
                })
            }
        },
        created() {
            LeadSourceAPI.getleadSoruces().then(response => {


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
        watch: {
            franchiseId(){
                this.form.franchiseId = this.franchiseId;

                if(this.franchiseChecking) return;

                this.checkFranchisePostcode();

            },
            selectedContact: {

                handler(){
                    console.log('watching selected contact')
                    if(this.franchiseId !== ''){
                        if(this.franchiseChecking) return;

                        this.checkFranchisePostcode();
                    }
                },
                deep: true
            }
        },

    }
</script>

<style scoped>

</style>