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
                        <LeadSourceSelect @valueChanged="leadSourceValueChangedHandler" />
                        <div class="caption pl-5">All will be included if no selection is made</div>
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
import LeadSourceSelect from "@/components/shared/LeadSourceSelect";
import EventBus from "@/helpers/EventBus";
export default {
name: "LeadSourcesSummaryForm",
    components: {LeadSourceSelect, DateSelect},
    data(){
        return{
            isFormValid:false,
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
                source: '',
                outcome: ''
            },
            sortItems: [
              {text: 'Lead Source', value: 'name'},
              {text: 'Outcome', value: 'outcome'},
              {text: 'Number Of Leads', value: 'numberOfLeads'}
            ]
        }
    },
    methods: {
        generateReport(){
            EventBus.$emit('GENERATE_LEAD_SOURCES_REPORT', this.form)
        },
        startDateSelectHandler(date){
            if(date){
                this.$set(this.form, "startDate", date)
            }else {
                this.$set(this.form, "startDate", "")
            }
        },
        endDateSelectHandler(date){
            if(date){
                this.$set(this.form, "endDate", date)
            }else {
                this.$set(this.form, "endDate", "")
            }
        },
        leadSourceValueChangedHandler(leadSourceId){
            if(leadSourceId){
                this.$set(this.form, "source", leadSourceId)
            }else {
                this.$set(this.form, "source", null)
            }
        }
    }
}
</script>

<style scoped>

</style>