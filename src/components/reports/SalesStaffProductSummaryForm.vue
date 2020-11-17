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
                    <v-col cols="12">
                        <ProductSelect @onValueChanged="onProductSelectHandler" />
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
                       :disabled="!valid">
                    Generate Report
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import {format, parseISO} from "date-fns";
import EventBus from "../../helpers/EventBus";
import DesignAdvisorSelect from "../leads/form/DesignAdvisorSelect";
import FranchiseDropDown from "../leads/form/FranchiseDropDown";
import DateSelect from "./shared/DateSelect";
import ProductSelect from "./shared/ProductSelect";
import SalesStaffFranchiseSelect from "@/components/shared/SalesStaffFranchiseSelect";
import FranchiseTypeSelect from "@/components/shared/FranchiseTypeSelect";



export default {
name: "SalesStaffProductSummaryForm",
    components: {
      FranchiseTypeSelect,
      SalesStaffFranchiseSelect, FranchiseDropDown, ProductSelect, DesignAdvisorSelect, DateSelect},
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
                productId: '',
                franchiseType: ''
            },
            withDesignAdvisor: false,
            sortItems: [
              {text: 'Design Advisor', value: 'salesStaff'},
              {text: 'Franchise Number', value: 'franchiseNumber'},
              {text: 'Product Name', value: 'productName'},
              {text: 'Number Of Sales', value: 'numberOfSales'},
              {text: 'Number Of Leads', value: 'numberOfLeads'},
              {text: 'Total Contracts', value: 'totalContracts'},
              {text: 'Conversion Rates', value: 'conversionRate'},
              {text: 'Average Sales Price', value: 'averageSalesPrice'},
            ]
        }
    },
    computed: {
        startDateFormattedDatefns () {
            return this.form.startDate ? format(parseISO(this.form.startDate), 'dd/MM/yyyy') : ''
        },
        endDateFormattedDatefns () {
            return this.form.endDate ? format(parseISO(this.form.endDate), 'dd/MM/yyyy') : ''
        },
        computedWarrantyDateFormattedDatefns () {
            return this.form.dateWarrantySent ? format(parseISO(this.form.dateWarrantySent), 'dd/MM/yyyy') : ''
        },
    },
    methods: {
        generateReport(){
            EventBus.$emit('GENERATE_REPORT', this.form)
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
        salesStaffFranchiseSelected(franchiseId){
            if(franchiseId){
              this.form.franchiseId = franchiseId
            }else {
              this.form.franchiseId = ''
            }
        },
        designAdvisorSelected(designAdvisor){
            console.log(designAdvisor)
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
        onProductSelectHandler(productId){
            this.form.productId = productId
        },
    }
}
</script>

<style scoped>

</style>