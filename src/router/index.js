import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

// telling vue to use router
Vue.use(VueRouter)
// adding all routes to array. specifying path, name & component
// its to redirect based on route name. becouse in case we want to change route
// i only need to change that in
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  // if we want to change routes from 'about' to 'about-us'.
  // i can just redirect to 'about-us' when it comes to '/about' using 'name' of that route
  // so when user types smart.com/about it will redirect to smart.com/about-us
  {
    path: '/about',
    redirect: { name: 'about' },
  },
  {
    path: '/about-us',
    name: 'about',
    component: AboutView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
