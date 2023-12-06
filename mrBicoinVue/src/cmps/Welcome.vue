<template>
  <div class="container">

    <h1 class="wel">Welcome to BitWallet</h1>
    <img class="wel-img" src="../assets/imgs/giphy.gif" alt="">
    <p>Manage your cryptocurrencies with ease!</p>
    <router-link :to="`/${getUserId}`"><button>Get Started</button></router-link>


    <footer>
      <p>&copy; 2023 BitWallet. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import { userService } from '../services/user.service';
export default {
  data() {
    return {
      user: null
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      return this.user = await userService.getLoggedInUser()
    }
  },
  computed: {
    getUserId() {
      if (!this.user) {
        this.$router.push(`/`)
      } else {
        return this.user ? this.user._id :''
      }
    },

  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #5d6e7f;
  button {
  padding: 10px 20px;
  margin-top: 10px; /* Space between buttons */
  font-size: 1em;
  background-color: #34495e; /* Use the header's background color */
  color: #fff; /* Set text color to white */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #94b9de;
    color: black; /* Darken the button on hover */
  }
}

  .wel-img {
    width: 4em;
    height: 4em;
    margin: 0;
  }
}
</style>