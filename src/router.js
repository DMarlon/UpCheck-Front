import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'

Vue.use(Router)

import { userKey } from '@/constants.ts'

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/auth',
			name: 'auth',
			component: Login,
			meta: { ignoreAuthentication: true }
		},
		{
			path: '/activation/:token([0-9a-f]{40})',
			name: 'activation',
			props: true,
			component: Login,
			meta: { ignoreAuthentication: true }
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
		},
		{
			path: '/teams',
			name: 'teams',
			component: () => import(/* webpackChunkName: "Teams" */ '@/views/team/Teams.vue')
		},
		{
			path: '/home',
			name: 'home',
			component: Home,
		},
		{
			path: '*',
			redirect: 'home'
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.ignoreAuthentication)) {
		next()
	} else {
		const userData = JSON.parse(localStorage.getItem(userKey));
		(userData && userData.token && userData.token != "") ? next() : next({ path: '/auth'})
	}
});

export default router