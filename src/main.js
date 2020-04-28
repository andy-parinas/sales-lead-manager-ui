import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import router from './router';
import store from './store';

Vue.config.productionTip = false

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
