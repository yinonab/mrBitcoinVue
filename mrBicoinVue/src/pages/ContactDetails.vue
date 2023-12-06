<template>
    <section v-if="contact" class="contact-details">
        <h1 class="title">{{ contact.name }} Details</h1>
        <main class="main-details">
            <img class="photo" v-bind:src="imgUrl()" alt="user-img">
            <h2> <b> Name: </b>{{ contact.name }}</h2>
            <h2><b>Phone: </b></h2><h2>{{ contact.phone }}</h2>
            <h2><b>Balance: </b>{{ contact.balance }}</h2>
            <h2> <b> Email: </b></h2>
            <h2 class="email">{{ contact.email }}</h2>

            <RouterLink to="/contact">
                <button>Back</button>
            </RouterLink>
        </main>
        <div v-if="user.transactions && user.transactions.length > 0">
            <transactions-list :transactions="filteredTransactions"></transactions-list>
        </div>
    </section>
    <img v-else src="../assets/puff.svg" alt="" class="loader">
</template>

<script>
import { contactService } from '../services/contact.service';
import { userService } from '../services/user.service';
import TransactionsList from '../cmps/TransactionsList.vue'

export default {
    data() {
        return {
            contact: null,
            user: null,
            transactions: []
        }
    },
    methods: {
        imgUrl() {
            return `https://robohash.org/${this.contact._id}?set=set5`
        },
        async getUser() {
            try {
                return this.user = await userService.getLoggedInUser()

            } catch (err) {
                console.log(err)
            }
        },
        getTransactions() {
            if (this.user && this.user.transactions) {
                this.transactions = this.user.transactions;
            }
        },
        getMyTransactions() {
            return this.filteredTransactions
        }
    },
    computed: {
        filteredTransactions() {
            return this.transactions.filter(transaction => transaction.to === this.contact.name);
        }
    },
    async created() {
        try {
            await this.getUser()
            const contactId = this.$route.params.contactId
            this.contact = await contactService.get(contactId)
            this.getTransactions()
            this.getMyTransactions()
            console.log('this.transactions', this.transactions)
        } catch (err) {
            console.log(err)
        }

    },
    components: {
        TransactionsList,
    }

}
</script>

<style lang="scss">
.title {
    font-size: 2em;
    margin-bottom: 20px;
    color: #0b0b0b;
    /* Change text color to match the header */
}

.contact-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #5d6e7f;
    /* Use the header's background color */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    widows: 50em;
    margin-bottom: .8em;
    // margin-left: 10%;
    // margin-right: 10%;

    .main-details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-bottom: 15px;



        h2 {
            font-size: 1.5em;
            margin: 10px 0;
            color: #fff;
            /* Set text color to white */
        }

        button {
            background-color: #6b93bb;
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
                background-color: #d7e0e8;
                color:#0b0b0b
            }
        }
    }
}

// @media (max-width: 600px) {
//     .main-details {
//         .email {
//             font-size: 1.2em ;
//         }
//     }

// }


.loader {
    width: 100px;
    height: 100px;
    margin: 50px auto;
    display: block;
}

.photo {
    width: 100px;
    height: 100px;
}
</style>

