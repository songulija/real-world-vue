<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard />
    <BaseIcon />
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
export default {
  // defining imported components in 'components'. basically registering
  // components as child(this component child), allows to use it in template
  components: {
    EventCard,
  },
}
</script>
<style scoped></style>
