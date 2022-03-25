import EventService from '@/services/EventService'

// all mutations,getters and actions will be namescpaced under event
// so for example dispatch action would be like 'event/fetchEvent'
export const namespaced = true

export const state = {
  events: [],
  event: {},
  eventsTotal: 0,
}
// vuex can update/mutate the State. exporting mutations
export const mutations = {
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
}
export const actions = {
  // createEvent will take in commit,rootState,dispatch from context
  //i can import dispatch, and rootState(access whole state, modules)
  createEvent({ commit, rootState, dispatch }, event) {
    // access global state. refering to user module, state
    console.log('User creating event is:' + rootState.user.user.name)
    EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created',
        }
        //dispatch 'add' notification action.  dispatcher to
        //go to root state, find notification module
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating you event: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        // throw error to catch in component
        throw error
      })
  },
  // providing payolaod for this action. perPage and page
  // payload in Actions & Mutations can be single var OR object
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        console.log('Total events are:' + response.headers['x-total-count'])
        commit('SET_EVENTS_TOTAL', response.headers['x-total-countx'])
        commit('SET_EVENTS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events:' + error.message,
        }
        // dispatching notification action add & passing obj
        //{root: true} allows dispatcher to go to root state, find notification module
        // and run add action
        dispatch('notification/add', notification, { root: true })
      })
  },
  // fetchEvent will take in 'commit', 'getter' from context. so i can access getters
  fetchEvent({ commit, dispatch, getters }, id) {
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
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + error.message,
          }
          // dispatching notification action add & passing obj
          //{root: true} allows dispatcher to go to root state, find notification module
          // and run add action
          dispatch('notification/add', notification, { root: true })
        })
    }
  },
}

// if we want to access. exporting getters
export const getters = {
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
}
