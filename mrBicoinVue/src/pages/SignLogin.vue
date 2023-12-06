<template>
  <main class="signup-page">
    <img class="bit" src="../assets/imgs/bitcoin.png" alt="">
    <h3>Please enter your name</h3>
    <form class="title" @submit.prevent="getUserByName">
      <input type="text" placeholder="Enter your name" v-model="userName">
      <button>Welcome</button>
    </form>
  </main>
</template>

<script>
import { userService } from '../services/user.service'
export default {
  data() {
    return {
      userName: '',
      user: null

    }
  },
  methods: {
    async getUserByName() {
      try {
        this.user = await userService.get(this.userName)
        if (!this.user) {
          this.user = userService.getEmptyUser()
          this.user.name = this.userName
          this.user = await userService.save(this.user)
          console.log('user', this.user)

        }
        userService.saveLoggedInUser(this.user)
        this.$router.push(`/:${this.user._id}`)
      } catch (err) {
        console.log('err:', err)
      }
    },
  }
}
</script>

<style lang="scss">
.signup-page {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #5d6e7f;
  margin-bottom: .8em;

  h3 {
    font-size: 1.5em;
    margin-bottom: 20px;
  }

  .bit {
    height: 4em;
    width: 4em;
  }

  .title {
    display: flex;
    flex-direction: column;
    input[type="text"] {
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 250px;
        font-size: 1em;
  
        &:focus {
          outline: none;
          border-color: dodgerblue; /* Change color on focus */
        }
  
        &::placeholder {
          color: #999;
        }
      }
      button {
        padding: 8px 20px;
        background-color: #2c3e50;;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
  
        &:hover {
            background-color:#bdc4cb;
            color: #2c3e50; 
            border: 1px solid #2c3e50 ;
        }
  
        &:focus {
          outline: none;
        }
      }

  }
}</style>