<template>
    <h1>Contact Details</h1>
    <section v-if="contact" class="contact-details">
        <img class="photo" v-bind:src="imgUrl()" alt="user-img">        <h2>{{ contact.email }}</h2>
        <h2>{{ contact.phone }}</h2>
        <h2>{{ contact.balance }}</h2>

        <RouterLink to="/contact">
            <button>Back</button>
        </RouterLink>
    </section>
    <img v-else src="../assets/puff.svg" alt="" class="loader">
</template>

<script>
import { contactService } from '../services/contact.service';
export default {
    data() {
        return {
            contact: null,
        }
    },
    methods:{
        imgUrl() {
            return `https://robohash.org/${this.contact._id}?set=set5`
        }
    },
    async created (){
        const contactId = this.$route.params.contactId
        this.contact = await contactService.get(contactId)
    }

}
</script>

<style lang="scss">
h1 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #fff; /* Change text color to match the header */
}

.contact-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #34495e; /* Use the header's background color */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.5em;
    margin: 10px 0;
    color: #fff; /* Set text color to white */
  }

  button {
    padding: 10px 20px;
    font-size: 1em;
    background-color: #007bff; /* Use the header's button color */
    color: #fff; /* Set text color to white */
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3; /* Darken the button on hover */
    }
  }
}

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
