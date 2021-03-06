<template>
    <v-form v-model="valid" ref="contactForm">
        <v-container>
            <v-row class="mx-2">
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.title"
                              prepend-icon="mdi-subtitles-outline"
                              label="Title"
                              :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" sm="6"></v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="form.firstName"
                                  prepend-icon="mdi-account"
                                  label="First Name"
                                  :rules="[rules.required]"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="form.lastName"
                                  prepend-icon="mdi-account-plus"
                                  label="Last Name"
                                  :rules="[rules.required]"
                    />
                </v-col>
                <!--  Email Sections-->
                <v-col cols="12" sm="6">
                    <v-text-field v-model="form.email"
                                  prepend-icon="mdi-email"
                                  label="E-Mail"
                                  :rules="[rules.email]"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="form.email2"
                                  prepend-icon="mdi-email-outline"
                                  label="Additonal Email (Optional)"
                                  :rules="[rules.optionalEmail]"
                    />
                </v-col>
                <!--  End of Email Sections-->
                <!--  Address Sections-->
                <v-col cols="12" sm="6">
                    <v-text-field v-model="form.contactNumber"
                                  type="tel"
                                  prepend-icon="mdi-phone"
                                  label="Contact Number"
                                  :rules="[rules.required]"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="form.street1"
                                  prepend-icon="mdi-home"
                                  label="Address"
                                  :rules="[rules.required]"

                    />
                </v-col>
                <!--  End of Address Sections-->
                <!--  Street Sections-->
                <v-col cols="12" sm="6">
                    <v-text-field v-model="form.street2"
                                  prepend-icon="mdi-sign-direction"
                                  label="Street Address (optional)"

                    />
                </v-col>
            </v-row>
            <v-row class="mx-2">
                <v-col cols="12" sm="12">
                    <PostcodeSelect @onValueChanged="onPostcodeSelect"
                                     ref="postcodeSelect" />
                </v-col>
            </v-row>
            <v-row class="mx-2">
                <!--  Start of Contact status Sections-->
                <v-col cols="12" sm="6">
                    <v-select
                            v-model="form.customerType"
                            :items="customerType"
                            label="Contact Type"
                            prepend-icon="mdi-briefcase"
                            :rules="[rules.required]"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                            v-model="form.status"
                            :items="status"
                            label="Contact Status"
                            prepend-icon="mdi-clipboard-text"
                            :rules="[rules.required]"
                    ></v-select>
                </v-col>
                <!--  Start of Contact status Sections-->
            </v-row>
        </v-container>
        <v-card-actions class="mx-5">
            <v-spacer />
            <v-btn color="primary" class="text--white" :loading="saving" :disabled="!canSave"
                   @click="$emit('onSave', form)"
            >Save</v-btn>
          <v-btn v-if="!edit" color="success" class="text--white" :loading="creating" :disabled="!canSave"
                 @click="$emit('onSaveAndCreateLead', form)"
          >Save and Create Lead</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>

    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import PostcodeSelect from "./PostcodeSelect";
    import {mapState} from 'vuex';

    export default {
        name: "SalesContactForm",
        components: {PostcodeSelect},
        props: {
            initialData: {type: [Object, null]},
            saving: {type: Boolean},
            creating: {type: Boolean},
            edit: {type: Boolean}
        },
        mixins: [ErrorHandlerMixins],
        data(){
            return {
                valid: false,
                lazy: false,
                rules: {
                    required: v => !!v || 'This field is required',
                    email: v => /^\w+[+.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4})$/i.test(v) || 'E-mail must be valid',
                    optionalEmail: v => {
                        if(v == null || v === ''){
                            return true
                        }else if(/^\w+[+.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4})$/i.test(v)) {
                            return true
                        }else {
                            return 'E-mail must be valid'
                        }
                    },
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
                form: {
                    id: '',
                    title: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    email2: '',
                    contactNumber: '',
                    street1: '',
                    street2: '',
                    suburb: '',
                    state: '',
                    postcodeId: '',
                },
                defaultForm: {
                    id: '',
                    title: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    email2: '',
                    contactNumber: '',
                    street1: '',
                    street2: '',
                    suburb: '',
                    state: '',
                    postcodeId: '',
                },
                postcodes: []

            }
        },

        methods: {

            onPostcodeSelect(postcodeId){
                if(postcodeId){
                    this.$set(this.form, 'postcodeId', postcodeId)
                }else {
                    this.$set(this.form, 'postcodeId', '')
                }
            },

            reset(){
                this.form = Object.assign({}, this.defaultForm)
                this.$refs.postcodeSelect.reset()
                this.$refs.contactForm.resetValidation();
            }

        },
        computed: {
            ...mapState('salesContacts', ['selectedContact']),
            canSave(){
                return this.valid && this.form.postcodeId && this.form.postcodeId !== ''
            },
            initialPostcodeId(){
                if(this.initialData && this.initialData.postcodeId){
                    return this.initialData.postcodeId
                }else {
                    return null
                }
            }
        },
        watch: {
            selectedContact: {
                handler(){
                    if (this.selectedContact){
                        this.form = Object.assign({}, this.selectedContact)
                    }else {
                        this.form = Object.assign({}, this.defaultForm)
                        this.reset();
                    }
                },
                deep: true
            }
        },
        mounted() {
            if (this.selectedContact){
                this.form = Object.assign({}, this.selectedContact)
            }
        }
    }
</script>

<style scoped>
    .progress-bar-wrapper{
        height: 10px;
    }
</style>