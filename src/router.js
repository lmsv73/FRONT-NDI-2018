import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Stock from './components/Stock'
import Missions from './components/Missions'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
      { path: '/', component: Home },
      { path: '/stock', component: Stock },
      { path: '/missions', component: Missions }
    ]
})

export default router