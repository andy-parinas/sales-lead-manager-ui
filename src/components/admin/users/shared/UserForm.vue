<template>
    <v-form v-model="isFormValid" ref="form">
        <v-card-text>
            <v-container>
                <v-row class="mx-2">
                    <v-col cols="12" sm="6">
                        <v-text-field
                                v-model="form.name"
                                prepend-icon="mdi-card-account-details"
                                label="Name"
                                :rules="[rules.requiredField]"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                                v-model="form.username"
                                prepend-icon="mdi-account-circle"
                                label="username"
                                :rules="[rules.requiredField]"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                                v-model="form.email"
                                prepend-icon="mdi-email"
                                label="Email"
                                :rules="[rules.emailRules, rules.requiredField]"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                                v-model="form.userType"
                                :items="userTypes"
                                label="User Type"
                                prepend-icon="mdi-human"
                                :rules="[rules.requiredField]"
                                required
                        ></v-select>

                    </v-col>

                    <v-col cols="12" sm="6" v-if="!edit">
                        <v-text-field
                                v-model="form.password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.requiredField, rules.min]"
                                :type="showPassword ? 'text' : 'password'"
                                label="Password"
                                hint="At least 8 characters"
                                class="input-group--focused"
                                prepend-icon="mdi-lock"
                                @click:append="showPassword = !showPassword"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" v-if="!edit">
                        <v-text-field
                                v-model="form.passwordConfirmation"
                                :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.requiredField, rules.passwordMatch]"
                                :type="showConfirm ? 'text' : 'password'"
                                label="Confirm Password"
                                class="input-group--focused"
                                prepend-icon="mdi-lock"
                                @click:append="showConfirm = !showConfirm"
                        ></v-text-field>
                    </v-col>

                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" class="mr-10 mb-5 white--text"
                   @click="$emit('onSave', form)"
                   :loading="loading"
                    :disabled="!isFormValid && !edit">
                Save
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    export default {
        name: "UserForm",
        props: {
            initialData: {type: Object},
            loading: {type: Boolean},
            edit: {type: Boolean}
        },
        data(){
            return {
                isFormValid: false,
                showPassword: false,
                showConfirm: false,
                form: {
                    name: '',
                    username: '',
                    email: '',
                    userType: '',
                    password: '',
                    passwordConfirmation: ''
                },
                defaultForm: {
                    name: '',
                    username: '',
                    email: '',
                    userType: '',
                    password: '',
                    passwordConfirmation: ''
                },
                userTypes: [
                    {text: 'Head Office', value: 'head_office'},
                    {text: 'Franchise Admin', value: 'franchise_admin'},
                    {text: 'Staff User', value: 'staff_user'},
                ],
                rules: {
                    emailRules: v => /^\w+[+.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4})$/i.test(v) || 'E-mail must be valid',
                    requiredField: v => !!v || 'This field is required',
                    passwordMatch: () => this.passwordMatch(),
                    min: v => v !== null && v.length >= 8 || 'Min 8 characters',
                }
            }
        },
        methods: {
            clearForm(){
                this.$refs.form.resetValidation();
                this.form = Object.assign({}, this.defaultForm);
            },
            passwordMatch(){
                if(this.form.password === this.form.passwordConfirmation) return true;

                return "Password don't match"
            }
        },
        watch: {
            initialData: {
                handler(){
                    if(this.initialData){
                        this.form = Object.assign({}, this.initialData)
                    }
                },
                deep: true
            }
        },
        mounted() {
            if(this.initialData){
                this.form = Object.assign({}, this.initialData)
            }
        }

    }
</script>

<style scoped>

</style>