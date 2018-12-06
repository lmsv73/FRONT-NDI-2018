import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import VueGeolocation from 'vue-browser-geolocation'

import router from './router.js'

/***** COMPONENTS ******/
import Navbar from './components/Navbar'
import VueMarkdown from 'vue-markdown'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueGeolocation)

Vue.component('navbar', Navbar)
Vue.component('vue-markdown', VueMarkdown)

Vue.prototype.prod = "http://51.75.94.42";

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
