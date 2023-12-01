<template>
    <div class="container">
      <Bar class="bar" v-if="loaded.marketPrice" :data="chartData.marketPrice" :options="chartOptions" />
      <Bar class="bar" v-if="loaded.avgBlockSize" :data="chartData.avgBlockSize" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import { bitcoinService } from '../services/bitcoin.service' 
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'Statistics',
    components: { Bar },
    data() {
      return {
        loaded: {
          marketPrice: false,
          avgBlockSize: false,
          rate: false
        },
        chartData: {
          marketPrice: null,
          avgBlockSize: null,
          rate: null
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
        this.chartData.avgBlockSize = this.processChartData(avgBlockSizeData);
        this.loaded.avgBlockSize = true;
      } catch (error) {
        console.error(error)
      }
    },
    methods: {
    processChartData(data) {
        console.log('data:', data)
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
                    borderWidth: 1,
                    data: data.values.map(entry => entry.y)
                }
            ]
        };
    }
}

  }
  </script>
  <style>
  .container {
    
    display: flex;
    flex-direction: row;
    width: 700px; /* Set your desired width here */
    margin: 0 auto; /* To center the container horizontally */
  }
  .bar{
    margin-top: 5em;
  }
  @media (max-width: 600px) {
    .container{
        width: 350px; 
    }
}
  </style>
  