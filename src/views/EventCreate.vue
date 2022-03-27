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
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <!--check if $error($invalid + $dirty). $touch is to make dirty true -->
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required
        </p>
      </template>

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
          :class="{ error: $v.event.title.$error }"
          @blur="$v.event.title.$touch()"
          class="field"
        />
        <!-- i also can pass atributes just by defining them, type="text"
        but these atributes by default inherits parent(<div type="text" placeho...) -->
        <!--check if $error($invalid + $dirty). $touch is to make dirty true -->
        <template v-if="$v.event.title.$error">
          <p v-if="!$v.event.title.required" class="errorMessage">
            Title is required
          </p>
        </template>
      </div>
      <div class="field">
        <BaseInput
          label="Description"
          v-model="event.description"
          type="text"
          placeholder="Add a description"
          :class="{ error: $v.event.description.$error }"
          @blur="$v.event.description.$touch()"
          class="field"
        />
        <template v-if="$v.event.description.$error">
          <p v-if="!$v.event.description.required" class="errorMessage">
            Description is required
          </p>
        </template>
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <BaseInput
          label="Location"
          v-model="event.location"
          type="text"
          placeholder="Add a location"
          :class="{ error: $v.event.location.$error }"
          @blur="$v.event.location.$touch()"
          class="field"
        />
        <template v-if="$v.event.location.$error">
          <p v-if="!$v.event.location.required" class="errorMessage">
            Location is required
          </p>
        </template>
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <!-- binding error class -->
        <datepicker
          placeholder="Select a date"
          v-model="event.date"
          @opened="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>
      <div class="field">
        <BaseSelect
          label="Select a time"
          v-model="event.time"
          :options="times"
          :class="{ error: $v.event.time.$error }"
          @blur="$v.event.time.$touch()"
          class="field"
        />
        <!--check if $error($invalid + $dirty). $touch is to make dirty true -->
        <template v-if="$v.event.time.$error">
          <p v-if="!$v.event.time.required" class="errorMessage">
            Time is required
          </p>
        </template>
      </div>
      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
      <BaseButton
        type="submit"
        :disabled="$v.$anyError"
        buttonClass="-fill-gradient"
        >Submit</BaseButton
      >
      <p class="errorMessage" v-if="$v.$anyError">
        Please fill out the required field(s)
      </p>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'
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
  // validations obj. in which i define validations for all data(states)
  validations: {
    // validate event obj values
    event: {
      // required:required
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
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
      // v.touch makes all fields $dirty true
      this.$v.$touch()
      if (!this.$v.$invalid) {
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
      }
    },
  },
}
</script>
<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
