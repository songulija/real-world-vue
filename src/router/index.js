import Vue from 'vue'
import VueRouter from 'vue-router'
import EventCreate from '@/views/EventCreate'
import EventList from '@/views/EventList'
import EventShow from '@/views/EventShow'
import UserView from '@/views/UserView'
import store from '@/store/index'
import NProgress from 'nprogress'

// telling vue to use router
Vue.use(VueRouter)
// adding all routes to array. specifying path, name & component
// its to redirect based on route name. becouse in case we want to change route
// i only need to change that in
// const routes = [

// ]

const router = new VueRouter({
  // enables history mode, which removes '#' from url. and when redirecting
  // without reloading whole page
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      // send params as props
      props: true,
    },
    // dynamic route. passing 'id', props:true is to send $route.params as props.
    // acessing it in that component will be easier,
    // I cam add hooks(beforeEnter) from a route which will run before routing to component
    // calling fetchEvent action, passing id from route params then receive event
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch('event/fetchEvent', routeTo.params.id).then((event) => {
          // once promise from API is resolved go to next lifecycle method
          // for it our action must return promise. passing event as prop to that route to
          routeTo.params.event = event
          next()
        })
      },
    },
    // if we want to change routes from 'about' to 'about-us'.
    // i can just redirect to 'about-us' when it comes to '/about' using 'name' of that route
    // so when user types smart.com/about it will redirect to smart.com/about-us
    // {
    //   path: '/about',
    //   redirect: { name: 'about' },
    // },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate,
    },
    // dynamic route site/user/:username. you can pass username. it's treated
    // but i set props: true. to send our $route.params as props. accesing it in UserView alot easier
    {
      path: '/user/:username',
      name: 'user',
      component: UserView,
      props: true,
    },
  ],
})

router.beforeEach((routeTo, routeFrom, next) => {
  // Start the route progress bar.
  NProgress.start()
  next()
})
router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})
export default router
