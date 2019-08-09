//配置路由
import Vue from 'vue'
//导入vue-router,js库
import Router from 'vue-router'
//导入需要配置路由的组件
import adminMain from '../components/manage/adminMain'
import adminLogin from '../components/manage/adminLogin'
import welcome from '../components/manage/welcome'
import user from '../components/manage/user'
import userMain from '../components/userMain'
import adduUser from '../components/manage/AddUser'
import deviceManage from '../components/DeviceManage/DeviceManage'
import deviceAdd from '../components/DeviceManage/DeviceAdd'
import orderManage from '../components/OrderManage/OrderManagement'

Vue.use(Router)
//创建路由对象,配置路由
const router = new Router({
	routes: [
		{
			path:'/',
			component: userMain
		},
		{
			path: '/admin',
			component: adminMain,
			children: [
				{
					path: "/",
					component: welcome
				},
				{
					path: "user",
					component: user
				},
				{
					path:"adduser",
					component:adduUser
				},
				{
					path:"addDevice",
					component:deviceAdd
				},
                {
                    path:"deviceManege",
                    component:deviceManage
                },
                {
                    path:"orderManege",
                    component:orderManage
                },
			]
		},
		{
			path: '/adminLogin',
			component: adminLogin
		}
	]
})
//导出路由对象
export default router
