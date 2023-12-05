import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ContactIndex from '../pages/ContactIndex.vue'
import ContactDetails from '../pages/ContactDetails.vue'
import contactEdit from '../pages/contactEdit.vue'
import statistics from '../pages/statistics.vue'
import SignLogin from '../pages/SignLogin.vue'
import TransferFound from '../pages/TransferFound.vue'
import Welcome from '../cmps/welcome.vue'

const routerOptions={
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/:id?',
      name: 'home',
      component: Home
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignLogin
    },
    
    {
      path: '/contact/:contactId',
      name: 'contactDetails',
      component: ContactDetails
    },
    {
      path: '/edit/:contactId?',
      name: 'contactEdit',
      component: contactEdit
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactIndex,
      children: [
        {
          path: '/contact/transfer/:id',
          name: 'transferFound',
          component: TransferFound,
        },

      ]
    },
    {
      path: '/statistics',
      name: 'statistics',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: statistics
    },
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
  ]
}
const router = createRouter(routerOptions)

export default router
