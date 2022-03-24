<template>
  <div>
    <h1>Events Listing</h1>
    <!-- link to dynamic route. site/event/:id. sending $route.params 'id' as prop
    for component to access it easier -->
    <router-link v-bind:to="{ name: 'event-show', params: { id: 1 } }"
      >Show event 1</router-link
    >
  </div>
</template>
<script>
export default {}
</script>
<style scoped></style>
