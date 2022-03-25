import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// importing lodash methods
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// require context is feature of webpack. 1) directory to search
//2) Search subdirectories (true, false). 3) Regular expression
//searching for files that begin 'Base' and end '.vue' or '.js'
const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

//requireComponent.keys() gets array of each file [{'./BaseIcon.vue'}, {...}].
// so we can iterate through each file
requireComponent.keys().forEach((fileName) => {
  // Get component config. and getting object exported
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component.
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

Vue.config.productionTip = false
// creating new instance,adding route, store(vuex),
// and telling to render our app App component
// and mount it where this id 'app' is
// we're using es6, so router:router & store:store
// so basically all components can access store
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
