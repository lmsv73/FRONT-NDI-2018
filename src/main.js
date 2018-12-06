import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import router from './router.js'

/***** COMPONENTS ******/
import Navbar from './components/Navbar'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.component('navbar', Navbar)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
