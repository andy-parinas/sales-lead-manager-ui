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
              <div class="caption pl-5">All will be included if no selection is made</div>
            </v-col>
            <v-col cols="12">
                <FranchiseDropDown @onValueChanged="franchiseSelected" />
              <div class="caption pl-5">All will be included if no selection is made</div>
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
import EventBus from "@/helpers/EventBus";
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
            EventBus.$emit('GENERATE_OUTCOME_REPORT', this.form)
        },
        startDateSelectHandler(startDate){
            this.form.startDate = startDate
        },
        endDateSelectHandler(endDate){
            this.form.endDate = endDate
        },
        franchiseSelected(franchise){
            if(franchise){
                this.form.franchiseId = franchise.id
            }else {
                this.form.franchiseId = ''
            }
        }
    }

}
</script>

<style scoped>

</style>