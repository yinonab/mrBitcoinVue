<script>
import AppHeader from "./cmps/AppHeader.vue"
import AppFooter from './cmps/AppFooter.vue';
import UserMsg from './cmps/UseMsg.vue'
import Statistics from "./pages/Statistics.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    UserMsg,
    Statistics,
  }
}
</script>


<template>
  <div id="app">
    <Transition>
      <UserMsg />
    </Transition>
    <AppHeader />
    <main>
      <!-- <Statistics /> -->
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>


<style scoped>
main {
  min-height: 87.59vh;
  background-color: #5d6e7f;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
