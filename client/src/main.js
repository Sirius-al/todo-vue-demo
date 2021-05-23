import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import moment from 'moment'


Vue.prototype.moment = moment

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
