//配置路由
import Vue from 'vue'
//导入vue-router,js库
import Router from 'vue-router'
//导入需要配置路由的组件
import deviceManage from '../components/DeviceManage/DeviceManage'
import deviceAdd from '../components/DeviceManage/DeviceAdd'
import orderManage from '../components/OrderManage/OrderManagement'

Vue.use(Router)
//创建路由对象,配置路由
const router = new Router({
	routes: [
		{
			path:"/",

		},
		{
			path:"/addDevice",
			component:deviceAdd
		},
		{
			path:"/deviceManage",
			component:deviceManage
		},
		{
			path:"/orderManage",
			component:orderManage
		},
	]
})
//导出路由对象
export default router
