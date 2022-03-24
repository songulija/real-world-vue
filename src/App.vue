<template>
  <div id="app">
    <!-- this nav will be in all pages. -->
    <nav>
      <!-- router-link redirects us to pages,
      we can redirect by routes names that i want to redirect to other page  -->
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'about' }">About</router-link>
    </nav>
    <!-- router-view is placeholder which renders matched component(that is clicked)
     when user clicks 'about' link, it will load AboutView component in
     router view place-->
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
