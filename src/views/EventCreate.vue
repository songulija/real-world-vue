<template>
  <div>
    <h1>Create Event {{ user.name }}</h1>
    <form @submit.prevent="createEvent">
      <!--Parent listens to $emit'ed event (v-on:input)
        code translates  to :value="event.category" @input="(value) => {event.category = value}
        v-model will listen for @input event(by default). when it happens
        it will take value(passed payload) and set event.category to that(passed value).
        also if event.title has initial value we will be sending it in as prop called 'value' to BaseInput  -->
      <BaseSelect
        label="Select a category"
        v-model="event.category"
        :options="categories"
        class="field"
      />
      <!-- :options is becouse i want to bind options that are passed as props to
      categories array -->
      <h3>Name & describe your event</h3>
      <div class="field">
        <!-- The parent can then listen to $emit'ed event using v-on:input
        this code translates to :value="event.title" @input="(value) => {event.title = value}
        --- under hood v-model="event.title" by default v-model will listen for @input event. when it happens
        it will take value(passed payload) and set event.title to that(passed value).
        also if event.title has initial value we will be sending it in as prop called 'value' to BaseInput  -->
        <BaseInput
          label="Title"
          v-model="event.title"
          type="text"
          placeholder="Title"
          class="field"
        />
        <!-- i also can pass atributes just by defining them, type="text"
        but these atributes by default inherits parent(<div type="text" placeho...) -->
      </div>
      <div class="field">
        <BaseInput
          label="Description"
          v-model="event.description"
          type="text"
          placeholder="Add a description"
          class="field"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <BaseInput
          label="Location"
          v-model="event.location"
          type="text"
          placeholder="Add a location"
          class="field"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <!--Parent listens to $emit'ed event (v-on:input)
        code translates  to :value="event.time" @input="(value) => {event.time = value}
        v-model will listen for @input event(by default). when it happens
        it will take value(passed payload) and set event.time to that(passed value).
        also if event.title has initial value we will be sending it in as prop called 'value' to BaseInput  -->
        <BaseSelect
          label="Select a time"
          v-model="event.time"
          :options="times"
          class="field"
        />
      </div>
      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
export default {
  components: {
    Datepicker,
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      // setting categories equal to global state categories
      times: times,
      categories: this.$store.state.categories,
      // that method will return brand new event obj, this method
      // is also for clearing info
      event: this.createFreshEventObject(),
    }
  },
  // map state allows to map state into computed properties
  // so i can access user,categories states. or acess with just 'categories'
  //or computed: mapState(['user','categories'])
  computed: {
    // i can use mapGetters to map
    ...mapState({
      user: (state) => state.user,
      categories: 'categories',
    }),
  },
  methods: {
    createFreshEventObject() {
      // first value reference user module and second is accessing user state
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      }
    },
    createEvent() {
      NProgress.start() //starting progress bar
      // dispatching 'createEvent' action, passing event(state) obj
      // waiting for the response to return in dispatcher. using then
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          // redirect to 'event' that just created. using router push
          // to specified route name & providing id to params
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id },
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          //now we wont push to new route or clear form.
          NProgress.done()
        })
    },
  },
}
</script>
<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
