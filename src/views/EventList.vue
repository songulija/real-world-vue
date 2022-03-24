<template>
  <div>
    <h1>Events Listing</h1>
    <!-- loop through events array, add EventCard components, pass event as props -->
    <EventCard v-for="event in events" :key="event.id" v-bind:event="event" />
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
export default {
  // defining imported components in 'components'. basically registering
  // components as child(this component child), allows to use it in template
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    }
  },
  // lifecycle hook created. when component is created this will be called
  created() {
    EventService.getEvents()
      .then((response) => {
        console.log(response.data)
        this.events = response.data
      })
      .catch((error) => {
        console.log('There was error' + error.response)
      })
  },
}
</script>
<style scoped></style>
