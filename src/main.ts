import Vue from 'vue'
import '@/plugins/vuetify.js'
import '@/plugins/axios.js'
import App from '@/App.vue'
import router from '@/router.js'
import store from '@/store.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
