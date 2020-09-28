<template>
    <BarChart
        :min-value="0"
        :max-value="max"
        :chart-data="chartData"/>
</template>

<script>
// import PieChart from "@/components/shared/PieChart";
import ReportAPI from "@/api/ReportAPI";
import BarChart from "@/components/shared/BarChart";
export default {
name: "ProductChart",
    components: {BarChart},
    data(){
        return {
            chartData: {},
            max: 50
        }
    },
    methods: {
        getProductForTheMonth(){
            const dateNow = new Date();
            const dateNowArray = dateNow.toLocaleDateString().split("/")

            const formData = {
                startDate: `${dateNowArray[2]}-${dateNowArray[1]}-01`,
                endDate: `${dateNowArray[2]}-${dateNowArray[1]}-${dateNowArray[0]}`
            }


            ReportAPI.getProductSalesSummary(formData).then(response => {

                if(response.data.total && response.data.total.totalNumberOfLeads){
                    this.max = response.data.total.totalNumberOfLeads + 10
                }

                const labels = [];
                const xData = [];

                response.data.results.map(d => {
                    labels.push(d.name);
                    xData.push(d.numberOfLeads)
                })

                const chartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: "Number of Leads",
                            data: xData,
                            backgroundColor: "#f38b4a",
                        }
                    ]
                }
                this.chartData = Object.assign({}, chartData)
                console.log('Chart Data', chartData)


            }).catch(error => {
                console.log(error)
            })

        },
    },
    mounted() {
        this.getProductForTheMonth()
    }
}
</script>

<style scoped>

</style>