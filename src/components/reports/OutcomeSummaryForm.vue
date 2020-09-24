<template>
  <v-card outlined>
    <v-form v-model="isFormValid">
      <v-card-text>
        <v-row class="mx-2">
            <v-col cols="12">
                <DateSelect label="Start Date" :required="true" @onDateSelected="startDateSelectHandler" />
            </v-col>
            <v-col cols="12">
                <DateSelect label="End Date" :required="true" @onDateSelected="endDateSelectHandler" />
            </v-col>
            <v-col cols="12">
                <v-select
                    v-model="form.outcome"
                    :items="outcomes"
                    clearable
                    label="Outcome"
                    prepend-icon="mdi-clipboard-check"></v-select>
            </v-col>
            <v-col cols="12">
                <FranchiseDropDown @onValueChanged="franchiseSelected" />
            </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-5">
        <v-btn small width="100%" color="blue darken-1" class="mb-5 white--text"
               @click="generateReport"
               :disabled="!isFormValid">
          Generate Report
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import DateSelect from "@/components/reports/shared/DateSelect";
import FranchiseDropDown from "@/components/leads/form/FranchiseDropDown";
export default {
name: "OutcomeSummaryForm",
    components: {FranchiseDropDown, DateSelect},
    data(){
        return {
            outcomes: [
                {value: 'pending', text: 'Pending' },
                {value: 'follow-up', text: 'follow Up' },
                {value: 'lost', text: 'Lost'},
                {value: 'success', text: 'Success' },
                {value: 'deferred', text: 'Deferred'},
                {value: 'cancelled', text: 'Cancelled'},
                {value: 'did not proceed', text: 'Did Not Proceed'}
            ],
            form: {
                startDate: '',
                endDate: '',
                franchiseId: '',
                outcome: ''
            },
            isFormValid: false
        }
    },
    methods: {
        generateReport(){

        },
        startDateSelectHandler(){

        },
        endDateSelectHandler(){

        },
        franchiseSelected(){

        }
    }

}
</script>

<style scoped>

</style>