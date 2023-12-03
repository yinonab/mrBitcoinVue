import { contactService } from "../../services/contact.service"

export default {
    strict: true,
    state(
    ) {
        return {
            contacts: null,
        }
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(contact => contact._id == contactId)
            state.contacts.splice(idx, 1)
        },
        updateContact(state, { savedContact }) {
            const idx = state.contacts.findIndex(contact => contact._id === savedContact._id)
            state.contacts.splice(idx, 1, savedContact)
        },
        saveContact(state, { savedContact }) {
            state.contacts.push(savedContact)
        },
    },
    actions: {
        async loadContacts(context) {
            try {
                const contacts = await contactService.query();
                context.commit({ type: 'setContacts', contacts })
            } catch (error) {
                console.log(err)
                throw err
            }

        },
        async removeContact(context, { contactId }) {
            try {
                await contactService.remove(contactId)
                context.commit({ type: 'removeContact', contactId })
            } catch (error) {

            }
        },
        async saveContact(context, { contact }) {
            const isUpdate = !!contact._id
            try {
                const savedContact = await contactService.save(contact)
                if (isUpdate) {
                    context.commit({ type: 'updateContact', savedContact })
                } else {
                    context.commit({ type: 'saveContact', savedContact })
                }
            } catch (err) {
                console.log('err:', err)
                throw err
            }
        }

    },
    getters: {
        contacts(state) { return state.contacts }
    },
    modules: {

    },
}
