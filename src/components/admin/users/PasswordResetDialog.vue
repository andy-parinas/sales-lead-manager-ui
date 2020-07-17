<template>
    <v-card>
        <DialogHeader title="Password Reset">
            <template v-slot:action>
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </DialogHeader>
        <v-form v-model="isFormValid" ref="form">
            <v-card-text>
                <v-container>
                    <v-row class="mx-2">
                        <v-col cols="12" sm="6">
                            <v-text-field
                                    v-model="form.password"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.requiredField, rules.min]"
                                    :type="showPassword ? 'text' : 'password'"
                                    label="New Password"
                                    hint="At least 8 characters"
                                    class="input-group--focused"
                                    prepend-icon="mdi-lock"
                                    @click:append="showPassword = !showPassword"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field
                                    v-model="form.passwordConfirmation"
                                    :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.requiredField, rules.passwordMatch]"
                                    :type="showConfirm ? 'text' : 'password'"
                                    label="Confirm New Password"
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
                <v-btn @click="reset"
                    color="blue darken-1" class="mr-10 mb-5 white--text"
                    :loading="loading"
                    :disabled="!isFormValid">
                        Reset
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import UsersAPI from "../../../api/UsersAPI";
    import DialogHeader from "../../core/DialogHeader";
    import ErrorHandlerMixins from "../../../mixins/ErrorHandler";
    export default {
        name: "PasswordResetDialog",
        components: {DialogHeader},
        data(){
            return {
                loading: false,
                isFormValid: false,
                showPassword: false,
                showConfirm: false,
                form: {
                    password: '',
                    passwordConfirmation: ''
                },
                defaultForm: {
                    password: '',
                    passwordConfirmation: ''
                },
                rules: {
                    requiredField: v => !!v || 'This field is required',
                    passwordMatch: () => this.passwordMatch(),
                    min: v => v !== null && v.length >= 8 || 'Min 8 characters',
                }
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('users', ['selectedUser'])
        },
        methods: {
            ...mapActions(['setSuccessMessage']),
            clearForm(){
                this.$refs.form.resetValidation();
                this.form = Object.assign({}, this.defaultForm);
            },
            passwordMatch(){
                if(this.form.password === this.form.passwordConfirmation) return true;

                return "Password don't match"
            },
            closeDialog(){
                setTimeout(() => {
                    this.clearForm()
                },100)
                this.$emit('close')
            },
            reset(){
                this.loading = true;
                const data = {
                    ...this.form,
                    id: this.selectedUser.id
                }
                UsersAPI.updatePassword(data).then(() => {
                    this.setSuccessMessage('Password Successfully Updated')
                    this.closeDialog();
                }).catch(error => {
                    this.handleError(error);
                }).finally(() => {
                    this.loading = false;
                })
            }
        },
    }
</script>

<style scoped>

</style>