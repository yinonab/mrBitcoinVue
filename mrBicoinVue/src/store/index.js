import { createStore } from 'vuex'
import contact from './modules/contact'
import { userService } from '../services/user.service'

const storeOptions = {
    strict: true,
    state() {
        return {
            loggedInUser: null
        }
    },
    mutations: {
        setLoggedInUser(state, { loggedInUser }) {
            state.loggedInUser = loggedInUser

        }

    },
    actions: {
        async loadLoggedInUser(context) {
            try {
                const loggedInUser = await userService.getLoggedInUser()
                context.commit({ type: 'setLoggedInUser', loggedInUser })

            } catch (err) {
                console.log('err:', err)
                throw err
            }


        },
    },
    getters: {
        loggedInUser(state) { return state.loggedInUser }
    },
    modules: {
        contact,

    }
}

const store = createStore(storeOptions)
export default store    
