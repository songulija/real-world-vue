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
    <tempalte v-if="hasNextPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next page</router-link
      >
    </tempalte>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store/index'

function getPageEvents(routeTo, next) {
  // getting current page from routeTo url query(page). or default 1
  const currentPage = parseInt(routeTo.query.page) || 1
  // pass page number to fetchEvents action
  store
    .dispatch('event/fetchEvents', {
      page: currentPage,
    })
    .then(() => {
      // once it fetched. send currentPage into the component(this component). passing to routeTo
      routeTo.params.page = currentPage
      next()
    })
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  // defining imported components in 'components'. basically registering
  // components as child(this component child), allows to use it in template
  components: {
    EventCard,
  },
  // called before the route that renders
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  // getting access to state using map state that allows to map
  // state into computed properties so i can access user,categories states.
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage
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
