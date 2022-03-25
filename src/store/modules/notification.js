// adding namespace the module
export const namespaced = true

// exporting state. which has notifications array
export const state = {
  notifications: [],
}

let nextId = 1
// export mutations mutations
export const mutations = {
  // push mutation will take in state(from context) from  and notification
  PUSH(state, notification) {
    // pushing new obj to notifications, using object destructuring\
    // to add what's in notification object and to add another prop id
    state.notifications.push({
      ...notification,
      id: nextId++,
    })
  },
  DELETE(state, notification) {
    //removing notification from notifications state.
    state.notifications = state.notifications.filter(
      (n) => n.id !== notification.id
    )
  },
}

export const actions = {
  // takes in commit from context
  // add action. commit 'PUSH' to mutations, passing object
  add({ commit }, notification) {
    commit('PUSH', notification)
  },
  // takes in commit from context. commit 'DELETE' to mutations
  //  passing obj
  remove({ commit }, notification) {
    commit('DELETE', notification)
  },
}
