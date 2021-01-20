<template>
  <div>
      <v-card outlined >

        <div class="d-flex flex-column justify-center align-center my-12" v-if="loading">
          <v-progress-circular class="mt-12"
                               :size="70"
                               :width="7"
                               color="primary"
                               indeterminate
          ></v-progress-circular>
          <span class="mt-5 subtitle-1">Loading reports </span>
        </div>

        <div class="d-flex flex-column justify-center align-center my-12" v-if="!loading && reports.length === 0">
          <span class="mt-5 subtitle-1"> Please Generate The Report </span>
        </div>

        <div  v-if="!loading && reports.length > 0">
          <v-app-bar flat>
            <v-toolbar-title> {{title}} </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-app-bar>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">Project Completion Date</th>
                <th class="text-left">Warranty Entered Date</th>
                <th class="text-left">Lead Number</th>
                <th class="text-left">Franchise Number</th>
                <th class="text-left">Design Advisor </th>
                <th class="text-left">Product </th>
                <th class="text-left">Service Rating </th>
                <th class="text-left">Workmanship Rating </th>
                <th class="text-left">Product Rating </th>
                <th class="text-left">Design Advisor Rating </th>
                <th  class="text-left">Customer Comments </th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(report, index) in reports" :key="index">
                    <td>{{ report.date_project_completed }}</td>
                    <td>{{ report.date_warranty_received }}</td>
                    <td>{{ report.lead_number }}</td>
                    <td>{{ report.franchise_number }}</td>
                    <td>{{ report.first_name }} {{ report.last_name}} </td>
                    <td>{{  report.product_name }}</td>
                    <td>{{ report.service_received_rating }}</td>
                    <td>{{ report.workmanship_rating }}</td>
                    <td>{{ report.finished_product_rating }}</td>
                    <td>{{ report.design_consultant_rating }}</td>
                    <td>{{ report.comments }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>


      </v-card>
  </div>
</template>

<script>
import ReportAPI from "../../api/ReportAPI";
import EventBus from "../../helpers/EventBus";

export default {
    name: "CustomerSatisfactionTable",
    data(){
        return {
            loading: false,
            reports: [],
            startDate: '',
            endDate: ''
        }
    },
    methods: {
        generateReport(payload){
            this.loading = true;
            ReportAPI.getCustomerReview(payload).then(response => {
                this.startDate = payload.startDate;
                this.endDate = payload.endDate;
                this.reports = response.data.results
            }).catch(error => {
                console.log(error)

            }).finally(() => {
                this.loading = false
            })
        },
        formatDate(value) {
          const dateArray = value.split(" ");
          const date = dateArray[0].split("-");

          if(date.length < 3) return '';

          return `${date[2]}/${date[1]}/${date[0]}`
        },

    },
    computed: {
      title(){
        return `Customer Review From ${this.formatDate(this.startDate)} To ${this.formatDate(this.endDate)}`
      }
    },
    mounted() {
        EventBus.$on('GENERATE_CUSTOMER_REVIEW_REPORT', payload => this.generateReport(payload))
    }
}
</script>

<style scoped>

</style>