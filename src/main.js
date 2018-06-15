import Vue from 'vue'

// vue-router
import VueRouter from 'vue-router'
import router from '@/router/router'

// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

// Globally registered filters
import '@/shared/filters'

import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// Plugins
Vue.use(VueRouter)
Vue.use(Vuetify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
