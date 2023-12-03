<template>
    <div class="container">
        <!-- Display Bar charts -->
        <Bar v-if="loaded.marketPrice" class="bar" :data="chartData.marketPrice" :options="chartOptions" />
        <!-- <Bar v-if="loaded.avgBlockSize" class="bar" :data="chartData.avgBlockSize" :options="chartOptions" /> -->
        <!-- Display Line chart for avgBlockSize -->
        <Line v-if="loaded.avgBlockSize" class="line" :data="chartData.avgBlockSize" :options="chartOptions" />


        <!-- Display Pie chart -->
        <Pie v-if="loaded.pieChart" :data="chartData.pieChart" :options="chartOptions" />
        <img v-else src="../assets/puff.svg" alt="" class="loader">
    </div>
</template>
  
<script>
import { Bar, Pie, Line } from 'vue-chartjs'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement,PointElement, CategoryScale, LinearScale, ArcElement, LineElement } from 'chart.js'
import { bitcoinService } from '../services/bitcoin.service'

ChartJS.register(Title, Tooltip, Legend, PointElement,BarElement, CategoryScale, LinearScale,LineElement, ArcElement)

export default {
    name: 'Statistics',
    components: { Bar, Pie, Line },
    data() {
        return {
            loaded: {
                marketPrice: false,
                avgBlockSize: false,
                pieChart: false
            },
            chartData: {
                marketPrice: null,
                avgBlockSize: null,
                pieChart: null
            },
            chartOptions: {
                responsive: true
            }
        }
    },
    async mounted() {
        try {
            const marketPriceData = await bitcoinService.getMarketPriceHistory();
            this.chartData.marketPrice = this.processChartData(marketPriceData);
            this.loaded.marketPrice = true;

            const avgBlockSizeData = await bitcoinService.getAvgBlockSize();
            this.chartData.avgBlockSize = this.processLineChartData(avgBlockSizeData); // Process as line chart
            this.loaded.avgBlockSize = true;

            const pieChartData = await bitcoinService.getMarketPriceHistory();
            this.chartData.pieChart = this.processPieChartData(pieChartData);
            this.loaded.pieChart = true;
        } catch (error) {
            console.error(error)
        }
    },
    methods: {
        processChartData(data) {
            const colorMap = {
                'Market Price (USD)': {
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)'
                },
                'Some Other Data': {
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)'
                }
                // Add more data names and their corresponding colors here
            };

            const colorConfig = colorMap[data.name] || {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: 'rgba(0, 0, 0, 1)'
            };

            return {
                labels: data.values.map(entry => new Date(entry.x * 1000).toLocaleDateString()),
                datasets: [
                    {
                        label: data.name,
                        backgroundColor: colorConfig.backgroundColor,
                        borderColor: colorConfig.borderColor,
                        borderWidth: 7,
                        data: data.values.map(entry => entry.y)
                    }
                ]
            };
        },
        //   async fetchPieChartData() {
        //     try {
        //       const response = await fetch('https://api.blockchain.info/charts/market-cap?timespan=5months&format=json&cors=true');
        //       return await response.json();
        //     } catch (error) {
        //       console.error(error);
        //     }
        //   },
        processPieChartData(data) {
            return {
                labels: data.values.map(entry => new Date(entry.x * 1000).toLocaleDateString()),
                datasets: [
                    {
                        label: data.name,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                            // Add more colors if needed for different segments
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                            // Add more colors if needed for different segments
                        ],
                        borderWidth: 5,
                        data: data.values.map(entry => entry.y)
                    }
                ]
            };
        },
        processLineChartData(data) {
            // Process the data similarly to how you processed data for Bar chart
            const colorConfig = {
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)'
            };

            return {
                labels: data.values.map(entry => new Date(entry.x * 1000).toLocaleDateString()),
                datasets: [
                    {
                        label: data.name,
                        backgroundColor: colorConfig.backgroundColor,
                        borderColor: colorConfig.borderColor,
                        borderWidth: 3,
                        data: data.values.map(entry => entry.y)
                    }
                ]
            };
        },

    }
}
</script>
  
<style>
.container {
    display: flex;
    flex-direction: row;
    width: 700px;
    /* Set your desired width here */
    margin: 0 auto;
    /* To center the container horizontally */
}

.bar {
    margin-top: 5em;
}

@media (max-width: 600px) {
    .container {
        width: 350px;
    }
}
</style>
  