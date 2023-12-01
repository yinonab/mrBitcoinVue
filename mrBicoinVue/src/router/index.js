import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ContactIndex from '../pages/ContactIndex.vue'
import ContactDetails from '../pages/ContactDetails.vue'
import contactEdit from '../pages/contactEdit.vue'
import statistics from '../pages/statistics.vue'

const routerOptions={
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactIndex
    },
    {
      path: '/contact/:contactId',
      name: 'contactDetails',
      component: ContactDetails
    },
    {
      path: '/contact/edit/:contactId?',
      name: 'contactEdit',
      component: contactEdit
    },
    {
      path: '/statistics',
      name: 'statistics',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: statistics
    }
  ]
}
const router = createRouter(routerOptions)

export default router
