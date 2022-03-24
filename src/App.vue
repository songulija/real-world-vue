<template>
  <div id="app">
    <!-- this nav will be in all pages. -->
    <nav>
      <!-- router-link redirects us to pages,
      we can redirect by routes names that i want to redirect to other page
      binding to attribute to this  -->
      <router-link :to="{ name: 'event-list' }">List</router-link> |
      <router-link v-bind:to="{ name: 'event-create' }">Create</router-link> |
      <!-- link to dynamic route. site/user/:username. sending $route.params 'username' as prop
    for component to access it easier -->
      <router-link v-bind:to="{ name: 'user', params: { username: 'Lukas' } }"
        >Lukas page</router-link
      >
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
