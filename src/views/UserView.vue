<template>
  <div class="user">
    <!-- printing out username parameter from url. site/user/:username
        route represents state of current route. but i set to pass username
        so send our $route.params as props from App.js. can access it as prop even though
        send it as param -->
    <h1>This is {{ username }}'s page</h1>
  </div>
</template>
<script>
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
  },
}
</script>
<style scoped></style>
