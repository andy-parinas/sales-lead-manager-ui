<template>
    <v-form v-model="isFormValid" ref="form">
        <v-card-text>
            <v-container>
                <v-row class="mx-2">
                    <v-col cols="12" sm="12">
                        <DateSelectField label="Due Date"
                                         :initial-date="initialData? initialData.dueDate : ''"
                                         :required="true"
                                         @onDateSelected="dateSelectedHandler" />
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
    import DateSelectField from "../../../shared/DateSelectField";
    export default {
        name: "PaymentScheduleForm",
        props: ['initialData', 'saving'],
        components: {DateSelectField},
        data(){
            return {
                isFormValid: false,
                form: {
                    dueDate: '',
                    description: '',
                    amount: ''
                },
                rules: {
                    requiredField: v => !!v || 'This field is required',
                    numberField: v => /^-?(\d*\.)?\d+$/.test(v) || 'Field should only be numbers',
                },
            }
        },
        methods : {
            dateSelectedHandler(date){
                if(date){
                    this.form.dueDate = date
                }
            },
            reset(){
                this.$refs.form.resetValidation();
                this.form.dueDate = '';
                this.form.description = '';
                this.form.amount = ''
            }
        },
        watch: {
            initialData: {
                handler(){
                    if(this.initialData){
                        this.form = Object.assign({}, this.initialData)
                    }
                }
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