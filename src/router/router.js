//配置路由
import Vue from 'vue'
//导入vue-router,js库
import Router from 'vue-router'
//导入需要配置路由的组件
<<<<<<< Updated upstream
import Home from "../components/CloudIndex/Home";
import AccountManage from "../components/AccountManage/AccountManage";
import Auth from "../components/AccountManage/Auth";
import Login from "../components/AccountManage/Login";

=======
import adminMain from '../components/manage/adminMain'
import adminLogin from '../components/manage/adminLogin'
import welcome from '../components/manage/welcome'
import user from '../components/manage/user'
import adduUser from '../components/manage/AddUser'
>>>>>>> Stashed changes
import deviceManage from '../components/DeviceManage/DeviceManage'
import deviceAdd from '../components/DeviceManage/DeviceAdd'
import orderManage from '../components/OrderManage/OrderManagement'
import createPlan from '../components/ProPlanManage/AddProductPlan'
import planManagement from "../components/ProPlanManage/PlanManagement"
import createSchedule from "../components/ProScheduleManage/AddProSchedule"
import scheduleManage from "../components/ProScheduleManage/ProductSchedule"
import deviceUpdate from "../components/DeviceManage/DeviceUpdate"

Vue.use(Router);
//创建路由对象,配置路由
const router = new Router({
<<<<<<< Updated upstream
    routes: [
        {
            path: "",
            component: AccountManage,
            redirect: "/login"

        },
        {
            path: "",
            component: AccountManage,
            children: [
=======
	routes: [
		{
			path:'/',
            redirect: '/admin'
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
                    path:"updateDevice",
                    name:"updateDevice",
                    component:deviceUpdate
                },
>>>>>>> Stashed changes
                {
                    path: "/login",
                    component: Login
                },
                {
                    path: "/auth",
                    component: Auth
                }
            ]
        },
        {
            path: "/home",
            component: Home,
            children: [

                {
                    path: "/addDevice",
                    component: deviceAdd
                },
<<<<<<< Updated upstream
                {
                    path: "/auth",
                    component: Auth
                },
                {
                    path: "/deviceManage",
                    component: deviceManage
                },
                {
                    path: "/orderManage",
                    component: orderManage
                }
            ]
        }
    ]
});
=======
				{
					path:"newPlan",
					component:createPlan
				},
				{
					path:"planManage",
					component:planManagement
				},
				{
					path:"newSchedule",
					component:createSchedule
				},
				{
					path:"scheduleManage",
					component:scheduleManage
				}
			]
		},
		{
			path: '/adminLogin',
			component: adminLogin
		}
	]
})
>>>>>>> Stashed changes
//导出路由对象
export default router
