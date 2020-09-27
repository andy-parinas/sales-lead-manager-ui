<template>
    <div>
        <canvas id="bar-chart"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js";

export default {
    name: "BarChart",
    props: [
        'minValue',
        'maxValue',
        'chartData'
    ],
    methods: {
        createChart() {
            const ctx = document.getElementById("bar-chart");
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: this.chartData,
                options: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 80,
                            fontColor: 'black'
                        }
                    },
                    scales: {
                        animation: false,
                        yAxes: [{
                            display: true,
                            ticks: {
                                suggestedMin: this.minValue,
                                suggestedMax: this.maxValue
                            }
                        }]
                    }
                },
            });
        }
    },
    watch: {
        chartData: {
            handler(){
                if(Object.keys(this.chartData).length > 0){
                    this.createChart();
                    console.log('ChartData', this.chartData)
                }
            },
            deep: true
        }
    }
}
</script>

<style scoped>

</style>