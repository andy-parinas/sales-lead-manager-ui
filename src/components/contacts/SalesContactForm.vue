<template>
    <v-card>
        <v-toolbar color="blue-grey darken-1" dark >
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
        </v-toolbar>
        <div class="progress-bar-wrapper">
            <v-progress-linear indeterminate color="green" v-if="loading"></v-progress-linear>
        </div>
        <v-alert text outlined color="deep-orange" icon="mdi-alert" dismissible class="mx-3 my-2" v-model="error">
            {{ errorMessage }}
        </v-alert>
        <v-form v-model="valid" :lazy-validation="lazy" ref="contactForm">
            <v-container>
                <v-row class="mx-2">
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.firstName"
                                prepend-icon="mdi-account"
                                label="First Name"
                                      :rules="rules.requireLessThan50"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.lastName"
                                prepend-icon="mdi-account-plus"
                                label="Last Name"
                                      :rules="rules.requireLessThan50"
                        />
                    </v-col>
        <!--  Email Sections-->
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.email"
                                prepend-icon="mdi-email"
                                label="E-Mail"
                                      :rules="rules.emailRules"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.email2"
                                prepend-icon="mdi-email-outline"
                                label="Additonal Email (Optional)"
                                :rules="rules.optionalEmailRules"
                        />
                    </v-col>
        <!--  End of Email Sections-->
        <!--  Address Sections-->
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.contactNumber"
                                      type="tel"
                                      prepend-icon="mdi-phone"
                                      label="Contact Number"
                                      :rules="rules.requiredField"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.street1"
                                prepend-icon="mdi-home"
                                label="Address"
                                :rules="rules.requiredField"
                        />
                    </v-col>
        <!--  End of Address Sections-->
        <!--  Street Sections-->
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.street2"
                                prepend-icon="mdi-sign-direction"
                                label="Street Address (optional)"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.suburb"
                                prepend-icon="mdi-home-modern"
                                label="Suburb"
                                :rules="rules.requiredField"
                        />
                    </v-col>
        <!--  End of Street Sections-->
        <!-- State Sections-->
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.state"
                                prepend-icon="mdi-map"
                                label="State"
                                :rules="rules.requiredField"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-autocomplete
                                v-model="editedItem.postcode"
                                :items="postcodes"
                                :search-input.sync="search"
                                :loading="postcodeLoading"
                                :rules="rules.requiredField"
                                cache-items
                                no-filter
                                color="black"
                                label="PostcodeAPI"
                                prepend-icon="mdi-mailbox"
                        ></v-autocomplete>
                    </v-col>
        <!--  End of State Sections-->
        <!--  Start of Contact status Sections-->
                    <v-col cols="12" sm="6">
                        <v-select
                                v-model="editedItem.customerType"
                                :items="customerType"
                                :rules="[v => !!v || 'Field is required']"
                                label="Contact Type"
                                prepend-icon="mdi-briefcase"
                                required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                                v-model="editedItem.status"
                                :items="status"
                                :rules="[v => !!v || 'Field is required']"
                                label="Contact Status"
                                prepend-icon="mdi-clipboard-text"
                                required
                        ></v-select>
                    </v-col>
        <!--  Start of Contact status Sections-->
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer />
                <v-btn color="grey darken-1" dark
                        @click="closeForm"
                >Cancel</v-btn>
                <v-btn color="primary" dark :loading="saving" :disabled="!valid"
                        @click="save"
                >Save</v-btn>
            </v-card-actions>
        </v-form>
<!--        <pre>{{editedItem}}</pre>-->
<!--        <pre>{{item}}</pre>-->
    </v-card>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";
    export default {
        name: "SalesContactForm",
        props: {
            item: {required: true, type: Object},
            formTitle: {required: true, type: String},
            loading: {required: true, type: Boolean}
        },
        mixins: [ErrorHandlerMixins],
        data(){
            return {
                valid: false,
                lazy: false,
                rules: {
                    requireLessThan50: [
                        v => !!v || 'This field is required',
                        v => (v && v.length <= 50) || 'First Name must be less than 50 characters',
                    ],
                    emailRules: [
                        v => !!v || 'Email is required',
                        v => /^\w+[+.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4})$/i.test(v) || 'E-mail must be valid',
                    ],
                    optionalEmailRules: [
                        // v => /^\w+[+.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4})$/i.test(v) || 'E-mail must be valid',
                        v => {
                            if(v == null || v === ''){
                                return true
                            }else if(/^\w+[+.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4})$/i.test(v)) {
                                return true
                            }else {
                                return 'E-mail must be valid'
                            }
                        }
                    ],
                    requiredField: [
                        v => !!v || 'This field is required',
                    ],
                },
                customerType: [{value:'residential', text: 'Residential'}, {value:'commercial', text: 'Commercial'}],
                status: [{value:'active', text: 'Active'}, {value:'archived', text: 'Archived'}],
                postcodeAutocomplete: {
                    loading: false,
                    items: []
                },
                search: '',
                postcodeLoading: false,
                error: false,
                errorMessage: '',
                saving: false,
                editedItem: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    email2: '',
                    contactNumber: '',
                    street1: '',
                    street2: '',
                    suburb: '',
                    state: '',
                    postcode: '',
                },
                emptyItem: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    email2: '',
                    contactNumber: '',
                    street1: '',
                    street2: '',
                    suburb: '',
                    state: '',
                    postcode: '',
                }

            }
        },
        computed: {
          ...mapState('postcodes', {
              postcodes: state => state.postcodes
          })
        },
        methods: {
            ...mapActions('postcodes', ['pushPostCode', 'findPostcodes']),
            ...mapActions('salesContacts', ['updateSalesContact', 'createSalesContact']),
            ...mapActions(['setSuccessMessage']),
            submit(){
                this.$refs.contactForm.validate();
                this.$emit('save')
            },
            resetForm(){
                this.$refs.contactForm.resetValidation();
            },
            assignPostcode(postcode){
                if(postcode.trim() !== ''){
                    this.pushPostCode(postcode);
                }
            },
            showErrorMessage(message){
                this.errorMessage = message;
                this.error = true;
            },
            save(){
                this.saving = true;
                if(this.editedItem.id !== ''){
                    this.updateSalesContact(this.editedItem).then(() => {
                        this.setSuccessMessage("Contact Successfully Saved")
                        this.closeForm();
                    }).catch(error => {
                        this.handleError(error)
                    }).finally(() => {
                        this.saving = false;
                    })

                }else {

                    this.createSalesContact(this.editedItem).then(() => {
                        this.setSuccessMessage("Contact Successfully Saved")
                        this.closeForm();
                    }).catch(error => {
                        this.handleError(error)
                    }).finally(() => {
                        this.saving = false;
                    })
                }
            },
            closeForm(){
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.emptyItem)
                }, 100)
                this.$emit('closeForm')
            },
            copyPropsToState(item){
                console.log('Copying State to props', item);
                this.editedItem = Object.assign({}, item)
            }
        },
        watch: {
            search(val){
                // if(this.postcodes.length > 0) return;

                if(this.postcodeLoading) return;

                if(val && val.trim() !== ''){
                    this.postcodeLoading = true
                    this.findPostcodes(val).then(() => {
                        this.postcodeLoading = false;
                    }).catch(error => {
                        this.postcodeLoading = false;
                        this.handleError(error)
                    })
                }
            },
        },
        mounted() {
            if(this.item.postcode.trim() !== ''){
                this.pushPostCode(this.item.postcode);
            }
            console.log('mounted contact form')
            this.copyPropsToState(this.item)

        }
    }
</script>

<style scoped>
    .progress-bar-wrapper{
        height: 10px;
    }
</style>