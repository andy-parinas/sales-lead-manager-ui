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
                        <FranchiseSelect
                                :initial-data="initialData? initialData.franchiseId: null"
                                :required="true"
                                @onValueChanged="franchiseChanged"/>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                                v-model="form.status"
                                :items="statuses"
                                :rules="[rules.requiredField]"
                                label="Contact Type"
                                prepend-icon="mdi-flag"
                                required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                                v-model="form.tradeTypeId"
                                :items="tradeTypes"
                                :rules="[rules.requiredField]"
                                :loading="tradeTypesLoading"
                                label="Trade Type"
                                prepend-icon="mdi-flag"
                                required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.company"
                                      prepend-icon="mdi-office-building"
                                      label="Company"
                                      :rules="[]"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.abn"
                                      prepend-icon="mdi-newspaper-variant-outline"
                                      label="ABN"
                                      :rules="[]"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.buildersLicense"
                                      prepend-icon="mdi-newspaper-variant-outline"
                                      label="Builders License"
                                      :rules="[]"
                        />
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
    import FranchiseSelect from "../../leads/form/FranchiseSelect";
    import TradeStaffAPI from "../../../api/TradeStaffApi";


    export default {
        name: "TradeStaffForm",
        components: {FranchiseSelect},
        props: {
            initialData: {type: [Object, null]},
            saving: {type: Boolean}
        },
        data(){
            return {
                isFormValid: false,
                initialFranchise: null,
                rules: {
                    requiredField: v => !!v || 'This field is required',
                    emailField: v => /^\w+[+.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4})$/i.test(v) || 'E-mail must be valid',
                },
                form: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    contactNumber: '',
                    franchiseId: '',
                    status: '',
                    tradeTypeId: '',
                    company: '',
                    abn: '',
                    buildersLicense: ''
                },
                defaultForm: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    contactNumber: '',
                    franchiseId: '',
                    status: '',
                    tradeTypeId: '',
                    company: '',
                    abn: '',
                    buildersLicense: ''
                },
                statuses: [
                    { value: 'blocked', text: 'Blocked'},
                    { value: 'active', text: 'Active'}
                ],
                tradeTypesLoading: false,
                tradeTypes: []
            }
        },
        computed: {
            canSave(){
                return this.isFormValid && this.form.franchiseId && this.form.franchiseId !== ''
            }
        },
        methods: {
            getTradeTypes(){
                this.tradeTypesLoading = true
                TradeStaffAPI.getTradeTypes().then(response => {
                    const types = response.data.map(type => {
                        return {
                            value: type.id,
                            text: type.name
                        }
                    })

                    this.tradeTypes = types;
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.tradeTypesLoading = false
                })
            },
            franchiseChanged(franchise){
                console.log('FranchiseChanged', franchise);
                if(franchise){
                    this.$set(this.form, 'franchiseId', franchise.value)
                }else {
                    this.$set(this.form, 'franchiseId', '')
                }
                console.log('Form', this.form)
            },
            reset(){
                this.form = Object.assign({}, this.defaultForm)
                this.initialFranchise = null
                this.$refs.form.resetValidation();
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
                        this.$refs.form.resetValidation();
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.getTradeTypes();
            if (this.initialData){
                this.form = Object.assign({}, this.initialData)
                this.initialFranchise = {value: this.initialData.franchiseId, text: this.initialData.franchise}
            }
        }
    }
</script>

<style scoped>

</style>