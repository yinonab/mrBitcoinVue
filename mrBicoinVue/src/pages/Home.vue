<template>
  <main class="container">
  <div class="info" v-if="!loading"> <!-- Show content when not loading -->
    <div class="coin">
      <p><b>Hello</b> {{ user ? user.name : '' }}</p> <!-- Display user's name if available -->
     
    </div>
    <div class="coin">
      <img src="../assets/imgs/coins.png" alt="">
      <p> <b>Your Balance</b>  {{ balance }}</p> <!-- Display user's balance -->
    </div>
    <div class="coin">
      <img src="../assets/imgs/bitcoin.png" alt="">
      <p> <b>Your Balance Rate is</b>  {{ rate }}</p> <!-- Display the rate -->
    </div>
  </div>
  <div v-else>
    <p>Loading...</p> <!-- Show loading state -->
  </div>
</main>
</template>

<script>
import { userService } from "../services/user.service";
import { bitcoinService } from '../services/bitcoin.service';

export default {
  data() {
    return {
      balance: 0,
      rate: 0,
      user: null,
      loading: true,
    };
  },
  async created() {
    this.users = await userService.query();
    console.log('users:', this.users)
    await this.getUserCoins();
  },
  methods: {
    async getUserCoins() {
      try {
        this.user = await userService.get('Ochoa');
        this.balance = this.user.balance;
        const rateData = await bitcoinService.getRate(this.balance);
        console.log('rateData:', rateData);
        this.rate = rateData;
        console.log('this.rate:', this.rate);
        this.loading = false;
      } catch (error) {
        console.error('Error fetching user coins or rate:', error);
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss">
p{
  color: black;
}
.info{
  border: 1px solid black;
  padding: 25px;
}
.coin {
  display: flex;
  align-items: center;

  img {
    height: 2em;
    width: 2em;
  }
}

p {
  font-size: 20px;
  margin-left: 10px;
  font-size: 18px;
  color: #333;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  &>* {
    margin-bottom: 20px;
  }
}

/* Styles for app-contact-page and app-statistic-page components (assuming these are custom components) */
app-contact-page,
app-statistic-page {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #444;
  }
}
</style>
