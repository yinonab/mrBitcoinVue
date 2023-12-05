<template>
    <ul class="contact-list">
        <TransitionGroup name="list" tag="ul">
        <li v-for="contact in contacts" :key=contact._id>
            <contactPreview :contact="contact" />
            <section class="active">
                <button @click="onRemoveContact(contact._id)">❌</button>
                <RouterLink :to="`/contact/${contact._id}`">
                    <button>👁</button>
                </RouterLink>
                <RouterLink :to="`/edit/${contact._id}`">
                    <button>📝</button>
                </RouterLink>
                <RouterLink :to="`/contact/transfer/${contact._id}`">
                    <button>💵</button>
                </RouterLink>
            </section>
        </li>
    </TransitionGroup>
    
</ul>
<RouterView />
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
    emits: ['remove'],
    components: {
        ContactPreview,
    }
}
</script>

<style lang="scss">
ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    padding: 0;
    list-style: none;

    li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #f0f0f0;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        button {
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
            min-width: 4em;

            &:hover {
                background-color: #2c3e50;
            }
        }
    }
}

// .contact-list .contact-list li .contact-list li button

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
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
</style>
