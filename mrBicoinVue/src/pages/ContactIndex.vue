<template>
    <section class="contact-index">
        <ContactFilter @filter="setFilterBy" />
        <RouterLink to="contact/edit">
            <button>Add a Contact</button>
        </RouterLink>
        <ContactList @remove="removeContact" v-if="contacts" :contacts="filterContacts" />
        <img v-else src="../assets/puff.svg" alt="" class="loader">
    </section>
</template>

<script>
import { eventBus } from "../services/eventBus.service"
import ContactList from "../cmps/ContactList.vue"
import ContactFilter from "../cmps/ContactFilter.vue"
export default {
    data() {
        return {
            // contacts: null,
            filterBy: { txt: '' },
        };
    },
    async created() {
        try {
            this.$store.dispatch({type:'loadContacts'})
        } catch (err) {
            eventBus.emit('user-msg', `Contact  can't removed`)
        }
    },
    methods: {
        async removeContact(contactId) {
            try {

                await this.$store.dispatch({type:'removeContact',contactId})
                eventBus.emit('user-msg', `Contact ${contactId} removed`)
            } catch (error) {
                
                eventBus.emit('user-msg', `Contact couldn't removed`)
            }
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }

    },
    computed: {
        filterContacts() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.contacts.filter(contact => regex.test(contact.name))
        },
        contacts(){
            console.log('hi',this.$store.getters.contacts);
            return this.$store.getters.contacts
        }
    },
    components:
    {
        ContactList,
        ContactFilter,
    }
}
</script>

<style lang="scss">
.contact-index {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0; /* Change the background color */
}

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
    background-color: #2c3e50; /* Darken the button on hover */
  }
}

.loader {
  width: 100px;
  height: 100px;
  margin: 50px auto;
  display: block;
}
</style>
