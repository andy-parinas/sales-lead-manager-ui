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
                    <ProductSalesSummaryPdfDownload :title="title"
                                             :header="header"
                                             :content="reports"
                                             :total="total"
                                             :file-name="fileName"/>
                </v-app-bar>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">Product</th>
                            <th class="text-right"># Sales</th>
                            <th class="text-right"># Leads</th>
                            <th class="text-right">Total Contracts</th>
                            <th class="text-right">Conversion Rate </th>
                            <th class="text-right">Average Sales Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(report, index) in reports" :key="index">
                            <td>{{ report.name }}</td>
                            <td class="text-right">{{ report.numberOfSales }}</td>
                            <td class="text-right">{{ report.numberOfLeads }}</td>
                            <td class="text-right">{{ report.totalContracts | decimalFormat }}</td>
                            <td class="text-right">{{ `${ Math.round(report.conversionRate)} %` }}</td>
                            <td class="text-right">{{ report.averageSalesPrice | decimalFormat }}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Total </td>
                            <td class="text-right font-weight-bold"> {{ total.totalNumberOfSales | decimalFormat }} </td>
                            <td class="text-right font-weight-bold"> {{ total.totalNumberOfLeads | decimalFormat }} </td>
                            <td class="text-right font-weight-bold"> {{ total.grandTotalContracts | decimalFormat }} </td>
                            <td class="text-right font-weight-bold">  </td>
                            <td class="text-right font-weight-bold">  </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Average </td>
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
    import ErrorHandlerMixins from "../../mixins/ErrorHandler";
    import ProductSalesSummaryPdfDownload from "./shared/ProductSalesSummaryPdfDownload";

    export default {
        name: "ProductSalesSummaryTable",
        components: {ProductSalesSummaryPdfDownload},
        props: [],
        data(){
            return {
                loading: false,
                reports: [],
                header: [
                    {title: 'Product',  name: 'name', type: 'string' },
                    {title: '# Sales',  name: 'numberOfSales', type: 'integer' },
                    {title: '# Leads',  name: 'numberOfLeads', type: 'integer' },
                    {title: 'Total Contracts',  name: 'totalContracts', type: 'currency' },
                    {title: 'Conversion Rate',  name: 'conversionRate', type: 'percentage' },
                    {title: 'Avg. Sales Price',  name: 'averageSalesPrice', type: 'currency' }
                ],
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
        mixins: [ErrorHandlerMixins],
        computed: {
            title(){
                return `Product Sales Summary Report From ${this.formatDate(this.startDate)} To ${this.formatDate(this.endDate)}`
            },
            fileName(){
                return `sales_summary_${this.formatDate2(this.startDate)}_${this.formatDate2(this.endDate)}`
            }
        },
        methods: {
            generateReport(formData){
                this.loading = true;
                ReportAPI.getProductSalesSummary(formData).then(response => {
                    console.log(response)
                    this.startDate = formData.startDate;
                    this.endDate = formData.endDate;
                    this.reports = response.data.results
                    this.total = Object.assign({}, response.data.total)
                }).catch(error => {
                    this.handleError(error)
                }).finally(() => {
                    this.loading = false;
                })
            },
            formatDate(value) {
                const dateArray = value.split(" ");
                const date = dateArray[0].split("-");

                if(date.length < 3) return '';

                return `${date[2]}/${date[1]}/${date[0]}`
            },
            formatDate2(value) {
                const dateArray = value.split(" ");
                const date = dateArray[0].split("-");

                if(date.length < 3) return '';

                return `${date[2]}-${date[1]}-${date[0]}`
            }

        },
        mounted() {
            EventBus.$on('GENERATE_PRODUCT_SALES_REPORT', payload => this.generateReport(payload))
        }
    }
</script>

<style scoped>

</style>