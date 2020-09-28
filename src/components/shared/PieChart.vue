<template>
    <div>
        <canvas id="pie-chart"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js";

export default {
    name: "PieChart",
    props: [
        'minValue',
        'maxValue',
        'chartData'
    ],
    methods: {
        createChart() {
            const ctx = document.getElementById("pie-chart");
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Green", "Blue", "Gray", "Purple", "Yellow", "Red", "Black", "Test", "Test2"],
                    datasets: [{
                        backgroundColor: [
                            "#2ecc71",
                            "#3498db",
                            "#95a5a6",
                            "#9b59b6",
                            "#f1c40f",
                            "#e74c3c",
                            "#34495e"
                        ],
                        data: [12, 19, 3, 17, 28, 24, 7, 5, 8]
                    }]
                },
                options: {
                    tooltips: {
                        enabled: false
                    },
                    plugins: {
                        datalabels: {
                            formatter: (value, ctx) => {
                                let datasets = ctx.chart.data.datasets;
                                let percentage = '0%';
                                if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                                    let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                                    let percentage = Math.round((value / sum) * 100) + '%';
                                    return percentage;
                                } else {
                                    return percentage;
                                }
                            },
                            color: '#fff',
                        }
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
                }
            },
            deep: true
        }
    },
    mounted() {
        this.createChart();
    }
}
</script>

<style scoped>

</style>