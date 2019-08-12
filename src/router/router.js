//配置路由
import Vue from 'vue'
//导入vue-router,js库
import Router from 'vue-router'
//导入需要配置路由的组件
import Home from "../components/Home";
import AccountManage from "../components/AccountManage/AccountManage";
import Auth from "../components/AccountManage/Auth";
import Login from "../components/AccountManage/Login";
import RegisterFactory from "../components/AccountManage/RegisterFactory";
import RegisterAdmin from "../components/AccountManage/RegisterAdmin";
import RegisterFinish from "../components/AccountManage/RegisterFinish";

import DeviceAdd from '../components/DeviceManage/DeviceAdd'
import DeviceManage from '../components/DeviceManage/DeviceManage'
import DeviceUpdate from "../components/DeviceManage/DeviceUpdate"
import AddProduct from "../components/ProductManage/AddProduct"
import ProductList from "../components/ProductManage/ProductList"
import OrderManage from '../components/OrderManage/OrderManagement'
import CreatePlan from '../components/ProPlanManage/AddProductPlan'
import PlanManagement from "../components/ProPlanManage/PlanManagement"
import CreateSchedule from "../components/ProScheduleManage/AddProSchedule"
import ScheduleManage from "../components/ProScheduleManage/ProductSchedule"
import AddProductTrace from "../components/ProduceTrace/AddProductTrace"
import TraceList from "../components/ProduceTrace/TraceList"
Vue.use(Router);
//创建路由对象,配置路由
const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/",
            component: AccountManage,
            children: [
                {
                    path: "/login",
                    component: Login
                },
                {
                    path: "/auth",
                    component: Auth
                },
                {
                    path: "/register",
                    component: AccountManage,
                    children: [
                        {
                            path: "1",
                            component: RegisterFactory
                        },
                        {
                            path: "2",
                            component: RegisterAdmin
                        },
                        {
                            path: "3",
                            component: RegisterFinish
                        }
                    ]
                },
            ]
        },
        {
            path: "/home",
            component: Home,
            children: [
                {
                    //添加设备
                    path: "addDevice",
                    component: DeviceAdd
                },
                {
                    //设备列表
                    path: "deviceManage",
                    component: DeviceManage
                },
                {
                    //更新设备
                    path: "deviceUpdate",
                    component: DeviceUpdate
                },
                {
                    //添加产品
                    path:"addProduct",
                    component:AddProduct
                },
                {
                    //产品列表
                    path:'productList',
                    component:ProductList
                },
                {
                    //订单管理
                    path: "orderManage",
                    component: OrderManage
                },
                {
                    //添加生产计划
                    path:"addProductPlan",
                    component:CreatePlan
                },
                {
                    //计划列表
                    path:"planList",
                    component:PlanManagement
                },
                {
                    //添加生产调度
                    path:"addProductSchedule",
                    component:CreateSchedule
                },
                {
                    //调度列表
                    path:"scheduleList",
                    component:ScheduleManage
                },
                {
                    //添加跟踪
                    path:"addProduceTrace",
                    component:AddProductTrace
                },
                {
                    //跟踪列表
                    path:"traceList",
                    component:TraceList
                }
            ]
        }
    ]
});

//导出路由对象
export default router
