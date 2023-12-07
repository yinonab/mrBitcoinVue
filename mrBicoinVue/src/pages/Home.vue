<template>
	<main class="main-home">
		<div class="home-page" v-if="!loading">
			<section class="bit-gif">
				<img src="../assets/imgs/giphy.gif" alt="">
			</section>
			<section class="info">
				<img v-bind:src="imgUrl()" alt="" class="user-img">
				<div class="coin">
					<p><strong>Hello</strong> {{ user ? user.name : 'guest' }} 😊</p>
				</div>
				<div class="coin">
					<img class="btc-img" src="../assets/imgs/coins.png" alt="">
					<p> <strong>Balance</strong> ${{ balance }}</p>
				</div>
				<div class="coin">
					<img class="btc-img" src="../assets/imgs/bitcoin.png" alt="">
					<p> <strong>Balance Rate</strong> {{ rate }} <small>BTC</small></p>
				</div>
				<div v-if="user.transactions && user.transactions.length > 0">
					<transactions-list :transactions="slicedTransactions"></transactions-list>
				</div>
			</section>
		</div>
		<div v-else>
			<img src="../assets/puff.svg" alt="" class="loader">
		</div>
	</main>
</template>

<script>
import { userService } from "../services/user.service";
import { bitcoinService } from '../services/bitcoin.service';

import TransactionsList from '../cmps/TransactionsList.vue'
export default {
  data() {
    return {
      balance: 0,
      rate: 0,
      user: null,
      loading: true,
      transactions: []
    };
  },
  async created() {
    this.users = await userService.query();
    console.log('users:', this.users)
    this.user = await userService.getLoggedInUser();
    if (!this.user) {
      this.$router.push(`/signUp`)
    }
    await this.getUserCoins();
    this.getTransactions()
    this.sliceList()

  },
  methods: {
    async getUserCoins() {
      try {
        console.log('user:', this.user)
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
    },
    imgUrl() {
      return `https://robohash.org/${this.user._id}?set=set5`
    },
    getTransactions() {
      if (this.user && this.user.transactions) {
        this.transactions = this.user.transactions;
      }
    },
    sliceList() {
      return this.transactions.slice(0, 3);
    }
  },
  computed: {
    slicedTransactions() {
      return this.sliceList();
    }
  },
  components: {
    TransactionsList,
  }
};
</script>
<style lang="scss">
.home-page {
	display: flex;
	align-items: center;

	.bit-gif {
		width: 50%;
		padding: 2em;
	}
}

.main-home {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	// margin-top: 20px;

	&>* {
		margin-bottom: 20px;
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		// border: 1px solid black;
		padding: 25px;
		width: 50%;

		.user-img {
			width: 15em;
			// height: 100px;
		}

		p {
			font-size: 20px;
			margin-left: 10px;
			font-size: 18px;
			color: #333;
		}

		.coin {
			display: flex;
			align-items: center;


			.btc-img {
				height: 2em;
				width: 2em;
			}
		}
	}
}

@media (max-width: 600px) {
	.home-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-direction: column-reverse;

		.info{
			width: 100%;
			padding: 0;
		}
	}
}
</style>

<!-- <style lang="scss">
// .ht {
//   color: black;
// }





.Hcontainer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  // margin-top: 20px;
  background-color: #5d6e7f;
  // padding-right: 1em;
  margin-bottom: 1em;
 

  .photo-user {
    width: 15em;
    height: 15em;
  }

  .info {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;

    border: 1px solid black;
    padding: 25px;
    margin-top: 1em;
    width: 100vw;
    height: 85vh;

    .coin {
      display: flex;
      align-items: center;



      .btc {
        font-size: 0.8rem;
        font-weight: 900;
      }

      img {
        height: 2em;
        width: 2em;
      }

      .ht {
        font-size: 20px;
        margin-left: 10px;
        font-size: 18px;
        color: #333;
      }
    }


  }

  &>* {
    margin-bottom: 20px;
  }


}

@media (max-width: 600px) {
  .Hcontainer {
    .info {
      display: flex;
      flex-direction: column-reverse;
    }
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
.loader{
  display: flex;
  justify-content: center;
  width: 3em;
}
</style> -->
