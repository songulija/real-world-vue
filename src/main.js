import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// creating new instance,adding route, store(vuex),
// and telling to render our app App component
// and mount it where this id 'app' is
// we're using es6, so router:router & store:store
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
