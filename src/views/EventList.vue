<template>
  <div>
    <!-- acessing user name. first value 'user' is module name and second is state inside the module -->
    <h1>Events for {{ user.user.name }}</h1>
    <!-- loop through event.events array, first event is refering to module second is state, pass event as props -->
    <EventCard
      v-for="event in event.events"
      :key="event.id"
      v-bind:event="event"
    />
    <!-- to create link that will go into our 'event-list' previous page we need to
    specify query parameter of page(page - 1 for prev page), rel is for google to know i'm paginating
    if page is 1 i dont want to even show previous page. template will not even appear-->
    <template v-if="page !== 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev page</router-link
      >
      |
      <!-- link for next page. link to same 'event-list' route.  -->
    </template>
    <router-link
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >Next page</router-link
    >
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
export default {
  // defining imported components in 'components'. basically registering
  // components as child(this component child), allows to use it in template
  components: {
    EventCard,
  },

  // lifecycle hook created. when component is created this will be called
  created() {
    // dispatching 'fetchEvents' action
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page,
    })
  },
  // getting access to state using map state that allows to map
  // state into computed properties so i can access user,categories states.
  computed: {
    page() {
      // localhost:8000/?page=2 getting page from url or if there is no params
      //asume that we are on 1 page
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState({
      // first event is refering to module name
      event: (state) => state.event,
      user: (state) => state.user,
    }),
  },
}
</script>
<style scoped></style>
