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
            <v-col cols="12">
              <FranchiseTypeSelect @onValueChanged="franchiseTypeSelected" />
              <div class="caption pl-5">All will be included if no selection is made</div>
            </v-col>
            <v-col cols="12">
              <v-select
                  v-model="form.sortBy"
                  :items="sortItems"
                  label="Sort By"
                  prepend-icon="mdi-sort"
                  clearable
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                  v-model="form.direction"
                  :items="[
                                  {text: 'Ascending', value: 'asc'},
                                  {text: 'Descending', value: 'desc'},
                              ]"
                  label="Direction"
                  prepend-icon="mdi-sort"
                  clearable
              ></v-select>
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
import FranchiseTypeSelect from "@/components/shared/FranchiseTypeSelect";
export default {
name: "OutcomeSummaryForm",
    components: {FranchiseTypeSelect, FranchiseDropDown, DateSelect},
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
                outcome: '',
                franchiseType: ''
            },
            isFormValid: false,
            sortItems: [
              {text: 'Outcome', value: 'outcome'},
              {text: 'Franchise Number', value: 'franchise_number'},
              {text: 'Number Of Leads', value: 'numberOfLeads'},
              {text: 'Design Advisor', value: 'salesStaff'}
            ]
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
        },
        franchiseTypeSelected(franchiseType){
          if(franchiseType){
            this.form.franchiseType = franchiseType
          }else {
            this.form.franchiseType = ""
          }
        },
    }

}
</script>

<style scoped>

</style>