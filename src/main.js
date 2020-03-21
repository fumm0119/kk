// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'


Vue.config.productionTip = false

//样式
import './scss/base.scss'

//基础js
import './common/js/init';

//提示语插件
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast, {
  type: 'top',
  duration: 3000,
  wordWrap: true,
});


//多语言配置
import VueI18n from 'vue-i18n';
import messages from './common/js/lang.js'
console.log(window.lang);
Vue.use(VueI18n);
let i18n = new VueI18n({
  locale: window.lang,
  messages: messages
});
window.i18n = i18n;

//UI
import VueWeui from 'weui';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App ,VueWeui},
  template: '<App/>'
})
