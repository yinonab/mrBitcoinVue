import axios from 'axios'

const KEY = 'bitcoinData' // Key for storing data in local storage

export const bitcoinService = {
    async getRate(balance) {
        try {
            let data = localStorage.getItem(KEY)
            if (data) {
                data = JSON.parse(data)
                if (data.rate) {
                    return data.rate
                }
            }
    
            const response = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${balance}`)
            localStorage.setItem(KEY, JSON.stringify({ ...data, rate: response.data }))
            console.log('response.data:', response.data)
            return response.data
        } catch (error) {
            console.error('Error fetching exchange rates:', error)
            return null
        }
    },
    

    async getMarketPriceHistory() {
        try {
            let data = localStorage.getItem(KEY)
            if (data) {
                data = JSON.parse(data)
                if (data.marketPriceHistory) {
                    // Extract the first 20 values from the stored data
                    const first20Values = data.marketPriceHistory.values.slice(0, 20)
                    return { ...data.marketPriceHistory, values: first20Values }
                }
            }
    
            const response = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
            console.log('Market Price History Response:', response.data) // Log the response data
    
            // Store only the first 20 values in localStorage
            const first20Values = response.data.values.slice(0, 20)
            localStorage.setItem(KEY, JSON.stringify({ ...data, marketPriceHistory: { ...response.data, values: first20Values } }))
            
            return { ...response.data, values: first20Values }
        } catch (error) {
            console.error('Error fetching market price history:', error)
            return null
    }
    },
    

    async getAvgBlockSize() {
        try {
            let data = localStorage.getItem(KEY)
            if (data) {
                data = JSON.parse(data)
                if (data.avgBlockSize) {
                    const first20Values = data.avgBlockSize.values.slice(0, 20)
                    return { ...data.avgBlockSize, values: first20Values }
                }
            }
            
            const response = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
            const first20Values = response.data.values.slice(0, 20)
            localStorage.setItem(KEY, JSON.stringify({ ...data, avgBlockSize: { ...response.data, values: first20Values } }))
            console.log('response.data:', response.data)
            return { ...response.data, values: first20Values }
        } catch (error) {
            console.error('Error fetching average block size:', error)
            return null
        }
    },
}