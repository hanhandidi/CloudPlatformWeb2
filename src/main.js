import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
import myGlobal from './router/global'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8081'
//把axios添加到Vue实例属性上，供全局使用
Vue.prototype.$ajax=axios
//挂载到Vue实例上面
Vue.prototype.MYGLOBAL=myGlobal

new Vue({
	router:router,
  render: h => h(App),
}).$mount('#app')
