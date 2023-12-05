<template>
    <section class="trans-container">
        <h2 class="trans-title">Your Transactions:</h2>
        <ul class="trans-list">
            <li class="trans" v-for="transaction in transactions" :key="transaction.AtTime">
                <p><b>From:</b> {{ transaction.from }}</p>
                <p><b>To:</b> {{ transaction.to }}</p>
                <p><b>Coins:</b> {{ transaction.amount }}</p>
                <p class="date"><b>Date:</b> {{ formatDate(transaction.AtTime) }}</p>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        transactions: {
            type: Array,
            required: true,
        }
    },
    computed: {
        // slicedTransactions() {
        //     return this.sliceList();
        // }
    },
    created() {
        console.log('this.transactions', this.transactions);
    },
    methods: {
        formatDate(value) {
            const options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            const time = new Date(value);
            if (isNaN(time)) return value; // If it's an invalid date, return original value
            const formattedDateTime = time.toLocaleString('en-US', options);
            return formattedDateTime;
        },
        sliceList() {
            // return this.transactions.slice(0, 3);
        }
    }
}
</script>

<style lang="scss">
.trans-container {
    border-top: 1px solid black;
    margin-top: 5px;

    .trans-list {
        margin: 0;

        .trans {
            display: flex;
            align-items: flex-start;
            width: 50vw;

            .trans-title {
                margin: 0;
            }

            .date {
                // font-size: 1rem
            }
        }
    }


}
</style>