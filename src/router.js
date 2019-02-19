import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/auth/Login.vue'

Vue.use(Router)

import { userKey } from '@/constants.js'

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === "auth") {
    next()
  } else {
    const userData = JSON.parse(localStorage.getItem(userKey));
    (userData && userData.token && userData.token != "") ? next() : next({ path: '/auth'})
  }
});

export default router