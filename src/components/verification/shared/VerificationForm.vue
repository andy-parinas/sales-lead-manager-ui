<template>
    <v-form v-model="isFormValid" ref="form">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-select v-model="form.designCorrect"
                                  prepend-icon="mdi-thumb-up"
                                  label="Design Correct"
                                  :items="[{value: 'yes', text: 'Yes'}, {value: 'no', text: 'No'}]"
                                  :rules="[rules.requiredField]"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Design Check Date"
                                         :initial-date="initialData? initialData.dateDesignCheck : ''"
                                         @onDateSelected="designCheckDateHandler" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select v-model="form.costingCorrect"
                                  prepend-icon="mdi-thumb-up"
                                  label="Costing Correct"
                                  :items="[{value: 'yes', text: 'Yes'}, {value: 'no', text: 'No'}]"
                                  :rules="[rules.requiredField]"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Costing Check Date"
                                         :initial-date="initialData? initialData.dateCostingCheck : ''"
                                         @onDateSelected="designCheckDateHandler" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.estimatedBuildDays"
                                      prepend-icon="mdi-office-building"
                                      label="Estimated Build Days"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.tradesRequired"
                                      prepend-icon="mdi-office-building"
                                      label="Trades Required"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.buildingSupervisor"
                                      prepend-icon="mdi-office-building"
                                      label="Building Supervisor"
                        />
                    </v-col>
                    <v-col cols="12" sm="6"></v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.roofSheetId"
                                      prepend-icon="mdi-office-building"
                                      label="Roof Sheet Product"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.roofColourId"
                                      prepend-icon="mdi-office-building"
                                      label="Roof Sheet Colour"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.linealMetres"
                                      prepend-icon="mdi-office-building"
                                      label="Lineal Metres"
                        />
                    </v-col>
                    <v-col cols="12" sm="6"></v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.franchiseAuthority"
                                      prepend-icon="mdi-office-building"
                                      label="Franchise Authority"
                        />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Authority Date"
                                         :initial-date="initialData? initialData.authorityDate : ''"
                                         @onDateSelected="designCheckDateHandler" />
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
import DateSelectField from "@/components/shared/DateSelectField";
export default {
    name: "VerificationForm",
    components: {DateSelectField},
    props: ['initialData', 'saving'],
    data(){
        return {
            isFormValid: false,
            rules: {
                requiredField: v => !!v || 'This field is required',
            },
            form: {
                designCorrect: '',
                dateDesignCheck: '',
                costingCorrect: '',
                dateCostingCheck: '',
                estimatedBuildDays: '',
                tradesRequired: '',
                buildingSupervisor: '',
                roofSheetId: '',
                roofColourId: '',
                linealMetres: '',
                franchiseAuthority: '',
                authorityDate: ''
            }
        }
    },
    methods: {
        designCheckDateHandler()
        {

        }
    }
}
</script>

<style scoped>

</style>