import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router/vueRouter.js'
//import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false




Vue.prototype.$taskManager = new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app').$children[0]


//load theme from local storage
var theme = JSON.parse(localStorage.getItem('theme'));
if(theme){
  vuetify.framework.theme.themes.light.primary = theme.primary;
  vuetify.framework.theme.themes.light.primaryAttenuate1 = theme.primaryAttenuate1;
  vuetify.framework.theme.themes.light.primaryAttenuate2 = theme.primaryAttenuate2;
}






