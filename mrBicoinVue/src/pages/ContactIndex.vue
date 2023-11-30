<template>
    <section class="contact-index">
        <h1>Contacts</h1>
        <pre>{{ contacts }}
        </pre>
    </section>
</template>

<script>
import { contactService } from "../services/contact.service"
export default {
    data() {
        return {
            contacts: null,

        }

    },
    async created() {
        this.contacts = await contactService.query(contactService.query())
    }
}
</script>

<style lang="scss"></style>