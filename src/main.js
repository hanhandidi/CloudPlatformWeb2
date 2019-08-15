import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
import myGlobal from './router/global'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
import Echarts from 'echarts'



Vue.use(ElementUI);
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://10.10.84.8:8088'
//把axios添加到Vue实例属性上，供全局使用
Vue.prototype.$ajax=axios
//挂载到Vue实例上面
Vue.prototype.MYGLOBAL=myGlobal
//引入echarts
Vue.prototype.$echarts = Echarts

new Vue({
	router:router,
    store,//所有组件都多了一个属性：$store
  render: h => h(App),
}).$mount('#app')
