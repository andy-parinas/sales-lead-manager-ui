<template>
    <v-form v-model="isFormValid" ref="form">
        <v-card-text>
            <v-container>
                <v-row class="mx-2">
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.firstName"
                                      prepend-icon="mdi-account"
                                      label="First Name"
                                      :rules="[rules.requiredField]"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.lastName"
                                      prepend-icon="mdi-account-plus"
                                      label="Last Name"
                                      :rules="[rules.requiredField]"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.email"
                                      prepend-icon="mdi-email"
                                      label="E-Mail"
                                      :rules="[rules.requiredField, rules.emailField]"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.contactNumber"
                                      type="tel"
                                      prepend-icon="mdi-phone"
                                      label="Contact Number"
                                      :rules="[rules.requiredField]"
                        />
                    </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="form.salesPhone"
                                  type="tel"
                                  prepend-icon="mdi-phone"
                                  label="Sales Phone"
                                  :rules="[]"
                    />
                  </v-col>
                    <v-col cols="12" sm="6">
<!--                        <FranchiseSelect-->
<!--                                :initial-data="initialData? initialData.franchiseId : null"-->
<!--                                :required="true"-->
<!--                                @onValueChanged="franchiseChanged"/>-->
                            <FranchiseMultipleSelect @onSelectionChanged="franchiseSelectionHandler" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                                v-model="form.status"
                                :items="statuses"
                                :rules="[rules.requiredField]"
                                label="Contact Type"
                                prepend-icon="mdi-speedometer"
                                required
                        ></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" class="mr-5 mb-5 white--text"
                   @click="$emit('onSave', form)"
                   :loading="saving"
                   :disabled="!canSave">
                Save
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    // import FranchiseSelect from "../../leads/form/FranchiseSelect";
    import FranchiseMultipleSelect from "@/components/shared/FranchiseMultipleSelect";
    export default {
        name: "SalesStaffForm",
        components: {FranchiseMultipleSelect},
        props: {
            initialData: {type: [Object, null]},
            saving: {type: Boolean}
        },
        data(){
            return {
                isFormValid: false,
                loading: false,
                edit: null,
                rules: {
                    requiredField: v => !!v || 'This field is required',
                    emailField: v => /^\w+[+.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4})$/i.test(v) || 'E-mail must be valid',
                },
                form: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    contactNumber: '',
                    salesPhone: '',
                    franchises: '',
                    status: ''
                },
                defaultForm: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    contactNumber: '',
                    salesPhone: '',
                    franchises: '',
                    status: ''
                },
                statuses: [
                    { value: 'blocked', text: 'Blocked'},
                    { value: 'active', text: 'Active'}
                ],
                initialFranchise: null
            }
        },
        methods: {
            reset(){
                this.$refs.form.resetValidation();
            },
            franchiseChanged(franchise){
                if(franchise){
                    this.$set(this.form, 'franchiseId', franchise.id)
                }else {
                    this.$set(this.form, 'franchiseId', '')
                }
            },
          franchiseSelectionHandler(franchises){
              this.form.franchises = franchises
          }
        },
        computed: {
            canSave(){
                return this.isFormValid && this.form.franchises.length > 0 && this.form.franchiseId !== ''
            }
        },
        watch: {
            initialData: {
                handler(){
                    if (this.initialData){
                        this.form = Object.assign({}, this.initialData)
                        this.initialFranchise = {value: this.initialData.franchiseId, text: this.initialData.franchise}
                    }else {
                        this.form = Object.assign({}, this.defaultForm)
                        this.initialFranchise = null
                        this.reset();
                    }
                },
                deep: true
            }
        },
        mounted() {
            if (this.initialData){
                this.form = Object.assign({}, this.initialData)
                this.initialFranchise = {value: this.initialData.franchiseId, text: this.initialData.franchise}
            }
        }
    }
</script>

<style scoped>

</style>