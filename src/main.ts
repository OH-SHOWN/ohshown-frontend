import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api'
import CoolLightBox from 'vue-cool-lightbox'

import './registerServiceWorker'
import VueGtag from 'vue-gtag'
import vuetify from './plugins/vuetify'

import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(CoolLightBox)

Vue.use(VueGtag, {
  config: { id: 'UA-132228705-11' },
  enabled: process.env.NODE_ENV === 'production'
})

new Vue({
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
