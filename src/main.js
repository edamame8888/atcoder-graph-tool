import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import HighchartsVue from 'highcharts-vue'
import store from '@/store/index.js'

Vue.config.productionTip = false

Vue.use(HighchartsVue)

new Vue({
  vuetify,
  store, //ストアをアプリケーションに登録
  render: h => h(App)
}).$mount('#app')
