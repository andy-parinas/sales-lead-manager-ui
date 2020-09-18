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
                                         :required="true"
                                         @onDateSelected="designCheckDateHandler" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select v-model="form.costingCorrect"
                                  prepend-icon="mdi-thumb-up"
                                  label="Costing Correct"
                                  :items="[{value: 'yes', text: 'Yes'}, {value: 'no', text: 'No'}]"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Costing Check Date"
                                         :initial-date="initialData? initialData.dateCostingCheck : ''"
                                         @onDateSelected="costingCheckDateHandler" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.estimatedBuildDays"
                                      prepend-icon="mdi-calendar-blank-multiple"
                                      label="Estimated Build Days"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.tradesRequired"
                                      prepend-icon="mdi-tools"
                                      label="Trades Required"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.buildingSupervisor"
                                      prepend-icon="mdi-account-hard-hat"
                                      label="Building Supervisor"
                        />
                    </v-col>
                    <v-col cols="12" sm="6"></v-col>
                    <v-col cols="12" sm="6">
                        <RoofSheetSelect
                            :initial-roof-sheet="form.roofSheetId"
                            @onValueChanged="roofSheetSelectHandler" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <RoofColourSelect
                            :is-required="form.roofSheetId !== ''"
                            :initial-roof-colour="form.roofColourId"
                            @onValueChanged="roofColourSelectHandler" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.linealMetres"
                                      prepend-icon="mdi-tape-measure"
                                      label="Lineal Metres"
                        />
                    </v-col>
                    <v-col cols="12" sm="6"></v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="form.franchiseAuthority"
                                      prepend-icon="mdi-store"
                                      label="Franchise Authority"
                        />
                    </v-col>
                    <v-col cols="12" sm=6>
                        <DateSelectField label="Authority Date"
                                         :initial-date="initialData? initialData.authorityDate : ''"
                                         @onDateSelected="authorityDateHandler" />
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
import RoofColourSelect from "@/components/shared/RoofColourSelect";
import RoofSheetSelect from "@/components/shared/RoofSheetSelect";
export default {
    name: "VerificationForm",
    components: {RoofSheetSelect, RoofColourSelect, DateSelectField},
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
        designCheckDateHandler(date)
        {
            if(date){
                this.$set(this.form, 'dateDesignCheck', date)
            }else {
                this.$set(this.form, 'dateDesignCheck', '')
            }
        },
        costingCheckDateHandler(date){
            if(date){
                this.$set(this.form, 'dateCostingCheck', date)
            }else {
                this.$set(this.form, 'dateCostingCheck', '')
            }
        },
        authorityDateHandler(date){
            if(date){
                this.$set(this.form, 'authorityDate', date)
            }else {
                this.$set(this.form, 'authorityDate', '')
            }
        },
        roofSheetSelectHandler(roofSheet){
            if(roofSheet){
                this.$set(this.form, 'roofSheetId', roofSheet.id)
            }else {
                this.$set(this.form, 'roofSheetId', '')
            }
        },
        roofColourSelectHandler(roofColour){
            if(roofColour){
                this.$set(this.form, 'roofColourId', roofColour.id)
            }else {
                this.$set(this.form, 'roofColourId', '')
            }
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
        if (this.initialData){
            this.form = Object.assign({}, this.initialData)
        }
    }
}
</script>

<style scoped>

</style>