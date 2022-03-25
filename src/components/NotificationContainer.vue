<template>
  <div class="notification-container">
    <!-- looping through all notifications. passing props(notification) -->
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      v-bind:notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from '@/components/NotificationBar.vue'
import { mapState } from 'vuex'
export default {
  // registering child components
  components: {
    NotificationBar,
  },
  //using mapState to map to our notification module, then state
  computed: {
    ...mapState({
      notifications: (state) => state.notification.notifications,
    }),
  },
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
}
</style>
