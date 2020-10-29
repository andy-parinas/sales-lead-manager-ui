<template>
    <v-form v-model="valid">
        <v-container v-if="!loading">
            <v-row class="mx-2">
                <v-col cols="12" sm="6">
                    <v-text-field v-model="form.leadNumber"
                                  prepend-icon="mdi-numeric-0-box-multiple-outline"
                                  label="Lead Number"
                                  :rules="rules.required"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <FranchiseSelect  v-if="currentUser.userType === 'head_office'"
                                      @onValueChanged="onFranchiseSelectChanged" :initial-data="initialSelectData"/>
                    <v-select v-else
                            @change="franchiseChange"
                            v-model="form.franchiseId"
                            :items="franchiseItems"
                            :rules="rules.required"
                            :loading="franchiseChecking"
                            label="Franchise Number"
                            prepend-icon="mdi-store"
                            required
                    ></v-select>


                </v-col>

                <v-col cols="12" sm="6">
                    <v-menu
                            v-model="dateMenu"
                            ref="dateMenu"
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
                                v-model="form.leadDate"
                                @input="dateMenu = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                    <slot name="customer-type"></slot>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-autocomplete
                            @change="leadSourceChange"
                            v-model="form.leadSourceId"
                            :items="leadSources"
                            :rules="rules.required"
                            label="Lead Source"
                            prepend-icon="mdi-web"
                            required
                    ></v-autocomplete>
                </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                    v-model="form.receivedVia"
                    :items="receivedSource"
                    clearable
                    label="Lead Received Via"
                    prepend-icon="mdi-web"
                    required
                ></v-autocomplete>
              </v-col>
                <v-col cols="12" sm="12" >
                    <v-row v-if="franchiseChecking">
                       <v-col cols="12">
                           Checking Postcode
                           <v-progress-linear
                                   color="primary"
                                   indeterminate
                                   rounded
                                   height="6"
                           ></v-progress-linear>
                       </v-col>
                    </v-row>
                    <PostcodeAlert  v-if="isOutsideFranchise && !franchiseChecking" />
                </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>

        </v-container>
        <v-skeleton-loader v-else
                ref="skeleton"
                type="article"
                class="mx-auto"
        ></v-skeleton-loader>
    </v-form>
</template>

<script>
    import PostcodeAlert from "../PostcodeAlert";
    import LeadSourceAPI from "../../../api/LeadSourceAPI";
    import PostcodeAPI from "../../../api/PostcodeAPI";
    import {mapState, mapActions} from "vuex";
    import {format, parseISO} from "date-fns";
    import FranchiseSelect from "./FranchiseSelect";



    export default {
        name: "LeadInformationForm",
        components: {FranchiseSelect, PostcodeAlert},
        props: {
            initialData: {required: true, type: Object},
            contactPostcodeId: {required: true, type: [Number, String]}
        },
        data(){
            return {
                loading: false,
                postcodeStatus: '',
                franchiseChecking: false,
                valid: false,
                dateMenu: false,
                rules: {
                    required: [
                        v => !!v || 'This field is required',
                    ]
                },
                leadSources: [],
                franchiseId: '',
                franchiseHint: '',
                form: {
                    leadNumber: '',
                    franchiseId: '',
                    franchiseNumber: '',
                    leadSourceId: '',
                    leadSource: '',
                    leadDate: '',
                    postcodeStatus: '',
                    receivedVia: ''
                },
                receivedSource: [
                    'Phone',
                    'Web Lead',
                    'Walk In',
                    'Other'
                ]
            }
        },
        computed: {
            ...mapState('auth', ['usersFranchises', 'currentUser']),
            ...mapState('franchises', ['franchises']),
            computedDateFormattedDatefns () {
                return this.form.leadDate ? format(parseISO(this.form.leadDate), 'dd/MM/yyyy') : ''
            },
            franchiseItems(){
                const items = this.usersFranchises.map(franchise => {
                    return {
                        value: franchise.id,
                        text: `${franchise.franchiseNumber} - ${franchise.type}`
                    }
                })

                return items;
            },
            isOutsideFranchise(){
                return this.form.postcodeStatus === 'outside_of_franchise';
            },
            initialSelectData(){
                if(this.initialData && this.initialData.franchiseId && this.initialData.franchiseNumber) {
                    return this.initialData.franchiseId
                }else {
                    return null
                }
            }
        },
        methods: {
            ...mapActions('franchises', ['getFranchises']),
            checkFranchisePostcode(){

                this.franchiseChecking = true;
                PostcodeAPI.checkFranchisePostcode(this.form.franchiseId,
                    this.contactPostcodeId).then(response => {

                    console.log('Check results: ', response)

                    if(response){
                        this.$set(this.form, 'postcodeStatus', 'inside_of_franchise')
                    }else {
                        this.$set(this.form, 'postcodeStatus', 'outside_of_franchise')
                    }

                }).catch(error => {

                    console.log(error);

                }).finally(() => {
                    this.franchiseChecking = false;
                })

            },

            leadSourceChange(){
                if(this.leadSources.length > 0){

                    const leadSource = this.leadSources.find(s => {
                        return s.value === this.form.leadSourceId
                    })
                    if( leadSource ) this.form.leadSource = leadSource.text;
                }
            },
            franchiseChange(){
                this.checkFranchisePostcode();

                if(this.franchiseItems.length > 0){

                    const franchise = this.franchiseItems.find(f => {
                        return f.value === this.form.franchiseId
                    })

                    if (franchise) this.form.franchiseNumber = franchise.text;
                }
            },
            onFranchiseSelectChanged(franchise){
                if(franchise){
                    this.form.franchiseId = franchise.id;
                    this.form.franchiseNumber = franchise.franchiseNumber
                    this.checkFranchisePostcode();
                }else {
                    this.form.franchiseId = '';
                    this.form.franchiseNumber = '';
                }

            }
        },
        watch: {
            form: {
                handler(){
                    this.$emit('updateData', this.form)
                },
                deep: true
            }
        },
        created() {
            this.loading = true;
            LeadSourceAPI.getleadSources().then(response => {

                this.leadSources = response.data.map(s => {
                    return {
                        value: s.id,
                        text: s.name
                    }
                })

            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.loading = false;
            })
        },
        mounted() {
            this.form = Object.assign({}, this.initialData)
        }
    }
</script>

<style scoped>

</style>