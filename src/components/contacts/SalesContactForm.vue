<template>
    <v-card>
        <v-toolbar color="blue-grey darken-1" dark >
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
        </v-toolbar>
        <div class="progress-bar-wrapper">
            <v-progress-linear indeterminate color="green" v-if="loading"></v-progress-linear>
        </div>
        <v-form v-model="valid" :lazy-validation="lazy" ref="contactForm">
            <v-container>
                <v-row class="mx-2">
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="item.firstName"
                                prepend-icon="mdi-account"
                                label="First Name"
                                      :rules="rules.requireLessThan50"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="item.lastName"
                                prepend-icon="mdi-account-plus"
                                label="Last Name"
                                      :rules="rules.requireLessThan50"
                        />
                    </v-col>
        <!--  Email Sections-->
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="item.email"
                                prepend-icon="mdi-email"
                                label="E-Mail"
                                      :rules="rules.emailRules"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="item.email2"
                                prepend-icon="mdi-email-outline"
                                label="Additonal Email (Optional)"
                                :rules="rules.optionalEmailRules"
                        />
                    </v-col>
        <!--  End of Email Sections-->
        <!--  Address Sections-->
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="item.contactNumber"
                                      type="tel"
                                      prepend-icon="mdi-phone"
                                      label="Contact Number"
                                      :rules="rules.requiredField"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="item.street1"
                                prepend-icon="mdi-home"
                                label="Address"
                                :rules="rules.requiredField"
                        />
                    </v-col>
        <!--  End of Address Sections-->
        <!--  Street Sections-->
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="item.street2"
                                prepend-icon="mdi-sign-direction"
                                label="Street Address (optional)"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="item.suburb"
                                prepend-icon="mdi-home-modern"
                                label="Suburb"
                                :rules="rules.requiredField"
                        />
                    </v-col>
        <!--  End of Street Sections-->
        <!-- State Sections-->
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="item.state"
                                prepend-icon="mdi-map"
                                label="State"
                                :rules="rules.requiredField"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="item.postcode"
                                prepend-icon="mdi-mailbox"
                                label="Postcode"
                                :rules="rules.requiredField"
                        />
                    </v-col>
        <!--  End of State Sections-->
        <!--  Start of Contact status Sections-->
                    <v-col cols="12" sm="6">
                        <v-select
                                v-model="item.customerType"
                                :items="customerType"
                                :rules="[v => !!v || 'Field is required']"
                                label="Contact Type"
                                prepend-icon="mdi-briefcase"
                                required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                                v-model="item.status"
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
                <v-btn
                        text
                        color="primary"
                        @click="$emit('closeForm')"
                >Cancel</v-btn>
                <v-btn
                        :disabled="!valid"
                        text
                        @click="submit"
                >Save</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    export default {
        name: "SalesContactForm",
        props: {
            item: {required: true, type: Object},
            formTitle: {required: true, type: String},
            loading: {required: true, type: Boolean}
        },
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
                            if(v === ''){
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
                status: [{value:'active', text: 'Active'}, {value:'archived', text: 'Archived'}]

            }
        },
        methods: {
            submit(){
                this.$refs.contactForm.validate();
                console.log('Submiting the form', this.$refs.contactForm.value);
                this.$emit('save')
            },
            resetForm(){
                this.$refs.contactForm.resetValidation();
            }
        },
        mounted() {
            console.log('SalesContactForm Mounted')
        }
    }
</script>

<style scoped>
    .progress-bar-wrapper{
        height: 10px;
    }
</style>