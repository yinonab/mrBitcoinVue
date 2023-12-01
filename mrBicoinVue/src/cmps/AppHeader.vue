<template>
    <header class="app-header">
        <a href="/"><h2>MrBitcoin</h2></a>
        <nav>
        <RouterLink to="/contact">Contact</RouterLink> |
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/statistics">Statistics</RouterLink> |
      </nav>
    </header>
</template>

<script>
    export default {
    }
</script>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px; /* Adjust the height as needed */
  padding: 0 20px;
  background-color: #34495e; /* Change the background color */

  a {
    font-size: 1.2rem;
    text-decoration: none;
    color: #fff; /* Set the color for links */
    transition: color 0.3s ease;

    &:hover {
      color: #ffa500; /* Change the link color on hover */
    }
  }

  .router-link-exact-active {
    font-weight: bold; /* Highlight active link */
  }
}
</style>
