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
                            <th class="text-left">Franchise</th>
                            <th class="text-right">Outcome</th>
                            <th class="text-right">Number Of Leads</th>
                            <th class="text-right">Sales Staffs</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(report, index) in reports" :key="index">
                            <td>{{ report.franchise_number }}</td>
                            <td class="text-right">{{ report.outcome | capitalize }}</td>
                            <td class="text-right">{{ report.numberOfLeads }}</td>
                            <td class="text-right">{{ report.salesStaff}}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </div>
        </v-card>
    </div>
</template>

<script>
import EventBus from "@/helpers/EventBus";
import ReportAPI from "@/api/ReportAPI";

export default {
    name: "OutcomeSummaryTable",
    data(){
        return {
            loading: false,
            reports: [],
            startDate: '',
            endDate: ''
        }
    },
    methods: {
        generateReport(formData){
            console.log('Generating Report')
            this.loading = true;
            ReportAPI.getOutcomeSummary(formData).then(response => {
                this.startDate = formData.startDate;
                this.endDate = formData.endDate;
                this.reports = response.data.results
                console.log(this.reports)
            }).catch(error => {
                console.log(error)
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
    computed: {
        title(){
            return `Outcome Summary Report From ${this.formatDate(this.startDate)} To ${this.formatDate(this.endDate)}`
        },
        fileName(){
            return `outcome_summary_${this.formatDate2(this.startDate)}_${this.formatDate2(this.endDate)}`
        }
    },
    mounted() {
        EventBus.$on('GENERATE_OUTCOME_REPORT', payload => this.generateReport(payload))
    }
}
</script>

<style scoped>

</style>