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
                   <v-toolbar-title>Sales Summary Report From {{startDate | formatDate }} To {{ endDate |formatDate }}</v-toolbar-title>
                   <v-spacer></v-spacer>
                   <ReportToPdfDownload />
               </v-app-bar>
               <v-simple-table>
                   <template v-slot:default>
                       <thead>
                       <tr>
                           <th class="text-left">Design Adivisor</th>
                           <th class="text-left">Franchise</th>
                           <th class="text-right"># Sales</th>
                           <th class="text-right"># Leads</th>
                           <th class="text-right">Total Contracts</th>
                           <th class="text-right">Conversion Rate </th>
                           <th class="text-right">Average Sales Price</th>
                       </tr>
                       </thead>
                       <tbody>
                       <tr v-for="(report, index) in reports" :key="index">
                           <td>{{ report.salesStaff }}</td>
                           <td>{{ report.franchiseNumber }}</td>
                           <td class="text-right">{{ report.numberOfSales }}</td>
                           <td class="text-right">{{ report.numberOfLeads }}</td>
                           <td class="text-right">{{ report.totalContracts | decimalFormat }}</td>
                           <td class="text-right">{{ `${ Math.round(report.conversionRate)} %` }}</td>
                           <td class="text-right">{{ report.averageSalesPrice | decimalFormat }}</td>
                       </tr>
                       <tr>
                           <td class="font-weight-bold">Total </td>
                           <td>  </td>
                           <td class="text-right font-weight-bold"> {{ total.totalNumberOfSales | decimalFormat }} </td>
                           <td class="text-right font-weight-bold"> {{ total.totalNumberOfLeads | decimalFormat }} </td>
                           <td class="text-right font-weight-bold"> {{ total.grandTotalContracts | decimalFormat }} </td>
                           <td class="text-right font-weight-bold">  </td>
                           <td class="text-right font-weight-bold">  </td>
                       </tr>
                       <tr>
                           <td class="font-weight-bold">Average </td>
                           <td>  </td>
                           <td class="text-right font-weight-bold"> {{ total.averageNumberOfSales | decimalFormat }} </td>
                           <td class="text-right font-weight-bold"> {{ total.averageNumberOfLeads | decimalFormat }} </td>
                           <td class="text-right font-weight-bold"> {{ total.averageTotalContract | decimalFormat }} </td>
                           <td class="text-right font-weight-bold"> {{ total.averageConversionRate | decimalFormat }} </td>
                           <td class="text-right font-weight-bold"> {{ total.grandAveragePrice |decimalFormat }} </td>
                       </tr>
                       </tbody>
                   </template>
               </v-simple-table>
           </div>
       </v-card>
   </div>
</template>

<script>
    import EventBus from "../../helpers/EventBus";
    import ReportAPI from "../../api/ReportAPI";
    import ReportToPdfDownload from "./shared/ReportToPdfDownload";

    export default {
        name: "SalesSummaryTable",
        components: {ReportToPdfDownload},
        data () {
            return {
                loading: false,
                reports: [],
                total: {
                    totalNumberOfSales: '',
                    totalNumberOfLeads: '',
                    grandTotalContracts: '',
                    averageNumberOfLeads: '',
                    averageNumberOfSales: '',
                    averageTotalContract: '',
                    averageConversionRate: '',
                    grandAveragePrice: ''

                },
                startDate: '',
                endDate: ''
            }
        },
        methods: {
            generateReport({startDate, endDate}){
                this.loading = true;
                ReportAPI.getSalesSummary(startDate, endDate).then(response => {
                    this.startDate = startDate;
                    this.endDate = endDate;
                    this.reports = response.data.results
                    this.total = Object.assign({}, response.data.total)
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.loading = false;
                })
                console.log(startDate, endDate)
            },

        },
        mounted() {
            EventBus.$on('GENERATE_REPORT', payload => this.generateReport(payload))
        }
    }
</script>

<style scoped>

</style>