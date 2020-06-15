<template>
    <v-form v-model="valid" ref="contactForm">
        <v-container>
            <v-row class="mx-2">
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
                <v-col cols="12" sm="6">
                    <v-text-field v-model="form.suburb"
                                  prepend-icon="mdi-home-modern"
                                  label="Suburb"
                                  :rules="[rules.required]"

                    />
                </v-col>
                <!--  End of Street Sections-->
                <!-- State Sections-->
                <v-col cols="12" sm="6">
                    <v-text-field v-model="form.state"
                                  prepend-icon="mdi-map"
                                  label="State"
                                  :rules="[rules.required]"

                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <PostcodeSelect :initial-data="form.postcode"
                                    :edit="edit"
                                    @onValueChanged="onPostcodeSelect"/>
                </v-col>
                <!--  End of State Sections-->
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
        </v-card-actions>
    </v-form>
</template>

<script>

    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    import PostcodeSelect from "./PostcodeSelect";


    export default {
        name: "SalesContactForm",
        components: {PostcodeSelect},
        props: {
            initialData: {type: [Object, null]},
            saving: {type: Boolean},
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
                defaultForm: {
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
                postcodes: []

            }
        },

        methods: {

            onPostcodeSelect(postcode){
                if(postcode){
                    this.$set(this.form, 'postcode', postcode)
                }else {
                    this.$set(this.form, 'postcode', '')
                }
            },
            reset(){
                this.$refs.contactForm.resetValidation();
            }

        },
        computed: {
            canSave(){
                return this.valid && this.form.postcode && this.form.postcode !== ''
            }
        },
        watch: {
            initialData: {
                handler(){
                    if (this.initialData){
                        this.form = Object.assign({}, this.initialData)
                    }else {
                        this.form = Object.assign({}, this.defaultForm)
                        this.reset();
                    }
                },
                deep: true
            }
        },
        mounted() {
            if (this.initialData){
                this.form = Object.assign({}, this.initialData)
            }
        }
    }
</script>

<style scoped>
    .progress-bar-wrapper{
        height: 10px;
    }
</style>