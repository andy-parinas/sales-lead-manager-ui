<template>
    <v-card outlined>
        <v-form v-model="valid">
            <v-card-text>
                <v-row class="mx-2">
                    <v-col cols="12">
                        <DateSelect label="Start Date" :required="true" @onDateSelected="startDateSelectHandler" />
                    </v-col>
                    <v-col cols="12">
                        <DateSelect label="End Date" :required="true" @onDateSelected="endDateSelectHandler" />
                    </v-col>
                    <v-col cols="12">
                        <DesignAdvisorSelect @onValueChanged="designAdvisorSelected" />
                        <div class="caption pl-5">All will be included if no selection is made</div>
                    </v-col>
                    <v-col cols="12" v-show="withDesignAdvisor">
                      <SalesStaffFranchiseSelect @onValueChanged="salesStaffFranchiseSelected" />
                      <div class="caption pl-5">All will be included if no selection is made.</div>
                    </v-col>
                    <v-col cols="12" v-show="!withDesignAdvisor">
                        <FranchiseDropDown @onValueChanged="franchiseSelected" />
                      <div class="caption pl-5">All will be included if no selection is made</div>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="px-5">
                <v-btn small width="100%" color="blue darken-1" class="mb-5 white--text"
                       @click="generateReport"
                       :disabled="!valid">
                    Generate Report
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import DateSelect from "@/components/reports/shared/DateSelect";
import DesignAdvisorSelect from "@/components/leads/form/DesignAdvisorSelect";
import FranchiseDropDown from "@/components/leads/form/FranchiseDropDown";
import EventBus from "@/helpers/EventBus";
import SalesStaffFranchiseSelect from "@/components/shared/SalesStaffFranchiseSelect";


export default {
    name: "SalesStaffSummaryForm",
    components: {SalesStaffFranchiseSelect, FranchiseDropDown, DesignAdvisorSelect, DateSelect},
    data(){
        return {
            valid: false,
            startDateMenu: false,
            endDateMenu: false,
            rules: {
                requiredField: v => !!v || 'This field is required',
            },
            form: {
                startDate: '',
                endDate: '',
                franchiseId: '',
                designAdvisorId: '',
            },
            withDesignAdvisor: false
        }
    },
    methods: {
        generateReport(){
            EventBus.$emit('GENERATE_SALES_STAFF_REPORT', this.form)
        },
        franchiseSelected(franchise){
            if(franchise){
                this.form.franchiseId = franchise.id
            }else {
                this.form.franchiseId = ''
            }
        },
        salesStaffFranchiseSelected(franchiseId){
            console.log("SalesStafFranchiseSelected", franchiseId)
            if(franchiseId){
              this.form.franchiseId = franchiseId
            }else {
              this.form.franchiseId = ''
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
        startDateSelectHandler(startDate){
            this.form.startDate = startDate
        },
        endDateSelectHandler(endDate){
            this.form.endDate = endDate
        },
    }
}
</script>

<style scoped>

</style>