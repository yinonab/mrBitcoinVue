import { createStore } from 'vuex'
import contact from './modules/contact'

const storeOptions={
    strict:true,
    state(){

    },
    mutations:{

    },
    actions:{

    },
    getters:{

    },
    modules:{
        contact,

    }
}
const store=createStore(storeOptions)
export default store    
