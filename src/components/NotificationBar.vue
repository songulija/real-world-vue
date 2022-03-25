// will create NotificationBar for every notification in the State
<template>
  <!-- binding notificationTypeClass to class. so depeding on type of notification
that value will change and i could show different styles(-text-error, -text-success)
these two are global styles -->
  <div class="notification-bar" v-bind:class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      timeout: null,
    }
  },
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    //calling action remove(notification) 5 seconds after component is mounted
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  //adding lifecycle hook beforeDestroy
  //when component is removed from the dom its called
  beforeDestroy() {
    //calling clearTimeout method to clear data
    clearTimeout(this.timeout)
  },
  computed: {
    notificationTypeClass() {
      //using interpolation here. to calculate notificationTypeClass
      //adding '-text-' to notification. (-text-error, -text-success)
      //these two are global styles
      return `-text-${this.notification.type}`
    },
  },
  methods: {
    //use mapActions to map to notification module and specifying actions
    ...mapActions('notification', ['remove']),
  },
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
