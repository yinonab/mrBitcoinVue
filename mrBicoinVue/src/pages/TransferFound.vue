<template>
    <main>
        <section class="transfer">

<form class="coins-form" @submit.prevent="transferCoins">
    <!-- <h1><b>To:</b> {{contact.name}}</h1> -->
    <h1><b>Your current balance is</b> {{user?.balance}}</h1>
    <label for="transfer">Transfer amount</label>
    <input type="number" placeholder="Enter coins to transfer" v-model="coins">
    <button>Transfer coins</button>
</form>
</section>
    </main>
</template>

<script>
import { contactService } from '../services/contact.service';
import { userService } from '../services/user.service';

export default {
    data() {
        return {
            user: null,
            contact: null,
            contactId: '',
            coins: ''

        }


    },
    async created() {
        await this.getUser()
        console.log('this.user', this.user)
        this.getContactId()
        console.log('this.contactId', this.contactId)
        await this.getContact()
        console.log('this.contact', this.contact)
    },
    methods: {
        async getUser() {
            return this.user = await userService.getLoggedInUser()
        },
        getContactId() {
            return this.contactId = this.$route.params.id
        },
        async getContact() {
            return this.contact = await contactService.get(this.contactId)
        },
        async transferCoins() {
            if (this.user.balance >= this.coins && this.coins > 0) {
                try {
                    console.log('this.coins', this.coins)
                    this.user.balance -= this.coins
                    this.contact.balance += this.coins
                    const transaction = {
                        from: this.user.name,
                        to: this.contact.name,
                        amount: this.coins,
                        AtTime: new Date()
                    }
                    this.user.transactions.push(transaction)
                    await userService.save(this.user)
                    userService.saveLoggedInUser(this.user)
                    await contactService.save(this.contact)
                    this.coins = ''
                    this.$router.push(`/contact/${this.contact._id}`)

                } catch (err) {
                    console.log('err', err)
                }
            }
        }
    }
}
</script>

<style lang="scss">
.transfer {
    height: 400px;
    width: 400px;
    position: fixed;
    inset: 0;
    top: -10%;
    margin: auto;
    background-color: rgb(250, 252, 250);
    border: #34495e 3px solid;
    box-shadow: -3px 1px 28px #00000061;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    
    h2{
        margin-bottom: 10px;
    }

    form {
        display: flex;
        flex-direction: column;
        
        label {
            margin-top: 1em;
        }
input{
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            background-color: #34495e;
            color: white; 
            border: none; 
            padding: 10px 20px; 
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 10px 0;
            border-radius: 5px; 
            &:hover {
                background-color:#52677c;
            }
        }
    }
}
</style>