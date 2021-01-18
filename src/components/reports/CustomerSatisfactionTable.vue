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
                console.log(response)

            }).catch(error => {
                console.log(error)

            }).finally(() => {
                this.loading = false
            })
        }

    },
    mounted() {
        EventBus.$on('GENERATE_CUSTOMER_REVIEW_REPORT', payload => this.generateReport(payload))
    }
}
</script>

<style scoped>

</style>