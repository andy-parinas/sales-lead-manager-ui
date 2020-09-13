<template>
    <v-form v-model="isFormValid" ref="form">
        <v-card-text>
            <v-container>
                <v-row class="mx-2">
                    <v-col cols="12" sm="6">
                        <v-menu
                                v-model="contractDateMenu"
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
                                        :value="computedContractDateFormattedDatefns"
                                        :rules="[rules.requiredField]"
                                        label="Contract Date"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="form.contractDate"
                                    @input="contractDateMenu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.contractNumber"
                                      prepend-icon="mdi-file-document-edit"
                                      label="Contract Number"
                                      :rules="[rules.requiredField]"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.contractPrice"
                                      prepend-icon="mdi-cash"
                                      label="Contract Price"
                                      :rules="[rules.requiredField, rules.numberField]"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-checkbox
                            v-model="form.taxExempt"
                            label="Is Tax Exempted"
                        ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.depositAmount"
                                      prepend-icon="mdi-cash-register"
                                      label="Deposit Amount"
                                      :rules="[]"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-menu
                                v-model="depositDateMenu"
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
                                        :value="computedDepositDateFormattedDatefns"
                                        :rules="[]"
                                        label="Date Deposit Received"
                                        readonly
                                        :disabled="form.depositAmount === '' "
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="form.dateDepositReceived"
                                    @input="depositDateMenu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                                v-model="form.warrantyRequired"
                                :items="warrantyRequirements"
                                :rules="[rules.requiredField]"
                                label="Warranty Required"
                                prepend-icon="mdi-tools"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-menu
                                v-model="warrantyDateMenu"
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
                                        :value="computedWarrantyDateFormattedDatefns"
                                        label="Date Warranty Sent"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="form.dateWarrantySent"
                                    @input="warrantyDateMenu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" class="mr-5 mb-5 white--text"
                   @click="$emit('onSave', form)"
                   :loading="saving"
                    :disabled="!isFormValid">
                Save
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    import {format, parseISO} from "date-fns";

    export default {
        name: "ContractForm",
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
                    numberField: v => /^(\d*\.)?\d+$/.test(v) || 'Field should only be numbers',
                    optionalNumber: v => {
                        if(v == null || v === ''){
                            return true
                        }else if(/^(\d*\.)?\d+$/.test(v)) {
                            return true
                        }else {
                            return 'Field should only be numbers'
                        }
                    },
                    lessThanPrice: v => {
                        if(v == null || v === ''){
                            return true
                        }else if(parseFloat(v) <= parseFloat(this.form.contractPrice)){
                            return true;
                        }else {
                            return 'Must be less than or equal to Contract Price'
                        }
                    }
                },
                contractDateMenu: false,
                depositDateMenu: false,
                warrantyDateMenu: false,
                form: {
                    contractDate: '',
                    contractNumber: '',
                    depositAmount: '',
                    contractPrice: '',
                    dateDepositReceived: '',
                    warrantyRequired: '',
                    dateWarrantySent: '',
                    taxExempt: false
                },
                defaultForm: {
                    contractDate: '',
                    contractNumber: '',
                    depositAmount: '',
                    contractPrice: '',
                    dateDepositReceived: '',
                    warrantyRequired: '',
                    dateWarrantySent: '',
                    taxExempt: false
                },
                warrantyRequirements: [
                    { value: 'yes', text: 'Yes'},
                    { value: 'no', text: 'No'}
                ],
            }
        },
        computed: {
            computedContractDateFormattedDatefns () {
                return this.form.contractDate ? format(parseISO(this.form.contractDate), 'dd/MM/yyyy') : ''
            },
            computedDepositDateFormattedDatefns () {
                return this.form.dateDepositReceived ? format(parseISO(this.form.dateDepositReceived), 'dd/MM/yyyy') : ''
            },
            computedWarrantyDateFormattedDatefns () {
                return this.form.dateWarrantySent ? format(parseISO(this.form.dateWarrantySent), 'dd/MM/yyyy') : ''
            },
        },
        methods: {
            reset(){
                this.$refs.form.resetValidation();
                this.form = Object.assign({}, this.defaultForm);
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