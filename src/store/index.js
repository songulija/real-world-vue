import Vue from 'vue'
import Vuex from 'vuex'
// importing all public items into user namescpace. like user.state, user.actions and so on.
import * as user from '@/store/modules/user'
import * as event from '@/store/modules/event'
import * as notification from '@/store/modules/notification'

// telling vue to use Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  // telling vue to use user module. that has its own state,actions,getters,mutations
  modules: {
    user,
    event,
    notification,
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
})
