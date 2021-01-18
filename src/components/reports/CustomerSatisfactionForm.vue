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
            <FranchiseDropDown @onValueChanged="franchiseSelected" />
            <div class="caption pl-5">All will be included if no selection is made</div>
          </v-col>
          <v-col cols="12">
            <FranchiseTypeSelect @onValueChanged="franchiseTypeSelected" />
            <div class="caption pl-5">All will be included if no selection is made</div>
          </v-col>
          <v-col cols="12">
            <DesignAdvisorSelect @onValueChanged="designAdvisorSelected" />
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
import DateSelect from "./shared/DateSelect";
import FranchiseDropDown from "../leads/form/FranchiseDropDown";
import FranchiseTypeSelect from "../shared/FranchiseTypeSelect";
import DesignAdvisorSelect from "../leads/form/DesignAdvisorSelect";
import EventBus from "../../helpers/EventBus";


export default {
    name: "CustomerSatisfactionForm",
    components: {DesignAdvisorSelect, FranchiseTypeSelect, FranchiseDropDown, DateSelect},
    data(){
        return {
            isFormValid: false,
            form: {
                startDate: '',
                endDate: '',
                franchiseId: '',
                franchiseType: ''
            },
        }
    },
    methods: {

        generateReport(){
           console.log('Generate Report')
            EventBus.$emit('GENERATE_CUSTOMER_REVIEW_REPORT', this.form)
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
        designAdvisorSelected(designAdvisor){
            if(designAdvisor){
              this.form.designAdvisorId = designAdvisor.id
              this.withDesignAdvisor = true
            }else {
              this.form.designAdvisorId = ''
              this.withDesignAdvisor = false;
              this.form.franchiseId = ''
            }
        },

    }
}
</script>

<style scoped>

</style>