<template>
    <ul class="contact-list">
        <li v-for="contact in contacts" :key=contact._id>
            <contactPreview :contact="contact" />
            <section class="active">
                <button @click="onRemoveContact(contact._id)">❌</button>
                <RouterLink :to="`/contact/${contact._id}`">
                        <button>👁</button>
                    </RouterLink>
                    <RouterLink :to="`/contact/edit/${contact._id}`">
                        <button>📝</button>
                    </RouterLink>
            </section>
        </li>


    </ul>
</template>

<script>
import ContactPreview from "../cmps/contactPreview.vue"
export default {
    props: {
        contacts: {
            type: Array,
            required: true
        }
    },
    methods: {
        onRemoveContact(contactId) {
            this.$emit('remove', contactId)
        }
    },
    components: {
        ContactPreview,
    }
}
</script>

<style lang="scss">
.contact-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
  padding: 0;
  list-style: none;
}

.contact-list li {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-list li button {
  margin-top: 10px;
  margin-left: 5px;
  padding: 8px 16px;
  font-size: 0.9em;
  background-color: #34495e;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.contact-list li button:hover {
  background-color: #2c3e50;
}

/* Apply transition to moving elements */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Ensure leaving items are taken out of layout flow */
.list-leave-active {
  position: absolute;
}
</style>
