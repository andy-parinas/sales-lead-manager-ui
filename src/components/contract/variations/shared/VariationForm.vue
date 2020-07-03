<template>
    <v-form v-model="isFormValid" ref="form">
        <v-card-text>
            <v-container>
                <v-row class="mx-2">
                    <v-col cols="12" sm="12">
                        <v-menu
                                v-model="variationDateMenu"
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
                                        label="Variation Date"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="form.variationDate"
                                    @input="variationDateMenu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-text-field v-model="form.description"
                                      prepend-icon="mdi-file-document-edit"
                                      label="Description"
                                      :rules="[rules.requiredField]"
                        />
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-text-field v-model="form.amount"
                                      prepend-icon="mdi-cash"
                                      label="Amount"
                                      :rules="[rules.requiredField, rules.numberField]"
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
                   :disabled="!isFormValid">
                Save
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    import {format, parseISO} from "date-fns";

    export default {
        name: "VariationForm",
        props: {
            saving: {type: Boolean}
        },
        data(){
            return {
                isFormValid: false,
                rules: {
                    requiredField: v => !!v || 'This field is required',
                    numberField: v => /^(\d*\.)?\d+$/.test(v) || 'Field should only be numbers',
                },
                form: {
                    variationDate: '',
                    description: '',
                    amount: '',
                },
                defaultForm: {
                    variationDate: '',
                    description: '',
                    amount: '',
                },
                variationDateMenu: false,
            }
        },
        computed: {
            computedContractDateFormattedDatefns() {
                return this.form.variationDate ? format(parseISO(this.form.variationDate), 'dd/MM/yyyy') : ''
            },
        },
        methods: {
            reset(){
                this.form = Object.assign({}, this.defaultForm)
                this.$refs.form.resetValidation();
            }
        }
    }
</script>

<style scoped>

</style>