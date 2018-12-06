import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import router from './router.js'

/***** COMPONENTS ******/
import Navbar from './components/Navbar'
import VueMarkdown from 'vue-markdown'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.component('navbar', Navbar)
Vue.component('vue-markdown', VueMarkdown)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
