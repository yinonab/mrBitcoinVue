<template>
    <header class="app-header">
        <a href="/"><h2>MrBitcoin</h2></a>
        <nav>
        <RouterLink to="/contact"><img class="icons" src="../assets/imgs/users.png" alt=""></RouterLink> 
        <RouterLink to="/"><img class="icons" src="../assets/imgs/home.png" alt=""></RouterLink> 
        <RouterLink to="/statistics"><img class="icons" src="../assets/imgs/increase.png" alt=""></RouterLink> 
       
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
  height: 6em; /* Adjust the height as needed */
  padding: 0 20px;
  background-color: #34495e; /* Change the background color */
  .icons{
    padding: .1em;
    margin-left: 1em;
    height: 3em;
    width: 3em;
  }

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
@media (max-width: 600px) {
    .app-header{
        .icons{
    padding: .1em;
    margin-left: 1em;
    height: 2em;
    width: 2em;
    }
    
  }
}
</style>
