import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

// telling vue to use Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //adding user state to vuex global state
    user: { id: 'abc123', name: 'Lukas Songulija' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false },
    ],
    events: [],
    event: {},
    eventsTotal: 0,
  },
  // if we want to access
  getters: {
    // catLength will take in state => and return categories length
    catLength: (state) => {
      return state.categories.length
    },
    // getting all done todos
    doneTodos: (state) => {
      return state.todos.filter((x) => x.done === true)
    },
    // will take in state and getters. then minusing total todos from
    // getter doneTodos length
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length
    },
    // getEventId is function that takes state and that function returns
    //another function that takes id
    getEventById: (state) => (id) => {
      return state.events.find((x) => x.id === id)
    },
  },
  // vuex can update/mutate the State
  mutations: {
    // mutation ADD_EVENT can take in state & value as payload
    // push provided 'event' obj to array
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    // to change eventsTotal
    SET_EVENTS_TOTAL(state, total) {
      state.eventsTotal = total
    },
    SET_EVENT(state, event) {
      state.event = event
    },
  },
  actions: {
    // createEvent will take in commit from 'context'(contains all
    // properties in vuex store: state commit and getters)
    //using destructuring and commi. I also receive payload(value)
    createEvent({ commit }, event) {
      EventService.postEvent(event).then(() => {
        // if obj was added to json file then commit 'ADD_EVENT'
        commit('ADD_EVENT', event)
      })
      // committing 'ADD_EVENT' mutation. and pass event obj
    },
    // providing payolaod for this action. perPage and page
    // payload in Actions & Mutations can be single var OR object
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          console.log('Total events are:' + response.headers['x-total-count'])
          commit('SET_EVENTS_TOTAL', response.headers['x-total-countx'])
          commit('SET_EVENTS', response.data)
        })
        .catch((error) => {
          console.log('There was error' + error.response)
        })
    },
    // fetchEvent will take in 'commit', 'getter' from context. so i can access getters
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id)
      // if we find this event then commit 'SET_EVENT' to mutations and pass event obj
      if (event) {
        commit('SET_EVENT', event)
      } else {
        // otherwise try to fetch that 'event'
        EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data)
          })
          .catch((error) => {
            console.log('There was error' + error.response)
          })
      }
    },
  },
  modules: {},
})
