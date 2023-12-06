<template>
    <section v-if="contact"   class="contact-edit">
       <h2 class="title">
            {{displayTitle}}
        </h2>
        <form class="title" @submit.prevent="onSaveContact">
            Name: <input v-model="contact.name" type="text" autofocus>
            Email: <input v-model="contact.email" type="text">
            Phone: <input v-model="contact.phone" type="text">
            <div class="action">
                <RouterLink to="/contact"><button>Back</button></RouterLink>
                <button>Save</button>
            </div>
        </form>
    </section>
    <img v-else src="../assets/puff.svg" alt="" class="loader">
</template>

<script>
import { contactService } from '../services/contact.service';
import { eventBus } from '../services/eventBus.service';
export default {
    data() {
        return {
            contact: null,
        }
    },
    methods: {
        async onSaveContact() {
            const isUpdate = !!this.$route.params.contactId
            // await contactService.save(this.contact)
            try {
                await this.$store.dispatch({ type: 'saveContact', contact: this.contact })
                if (isUpdate) {
                    eventBus.emit('user-msg', 'Contact Updated')
                } else {
                    eventBus.emit('user-msg', 'Contact Saved')
                }
            } catch (err) {
                eventBus.emit('user-msg', `Contact couldn't Saved`)

            }


            this.$router.push('/contact')
        }
    },
    async created() {
        try {
            const contactId = this.$route.params.contactId
        if (contactId) {
            this.contact = await contactService.get(contactId)
        } else {
            this.contact = contactService.getEmptyContact()
        }
        } catch (err) {
            console.error(err)
        }
        

    },
    computed:{
        displayTitle(){
            return this.contact._id? `Edit ${this.contact.name}`: 'Add new Contact' 
        }
    }
}
</script>

<style lang="scss">
.title {
    font-size: 1.5em;
    margin-bottom: 20px;
    color: #0b0b0b;
    /* Change text color to match the header */
}

.contact-edit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #34495e;
    /* Use the header's background color */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    widows: 50em;
    margin-left: 10%;
    margin-right: 10%;
    .action{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap:.5em
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 40%;

        input {
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
            width: 60vw;
            box-sizing: border-box;
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

.loader {
    width: 100px;
    height: 100px;
    margin: 50px auto;
    display: block;
}
</style>
