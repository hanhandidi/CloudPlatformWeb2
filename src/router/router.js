//配置路由
import Vue from 'vue'
//导入vue-router,js库
import Router from 'vue-router'
//导入需要配置路由的组件
import AccountManage from "../components/AccountManage/AccountManage";
import Auth from "../components/AccountManage/Auth";
import Login from "../components/AccountManage/Login";

import RegisterFactory from "../components/AccountManage/RegisterFactory";
import RegisterAdmin from "../components/AccountManage/RegisterAdmin";
import RegisterFinish from "../components/AccountManage/RegisterFinish";

import Home from "../components/Home";
import Index from "../components/CloudIndex/Index";

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
import TraceList from "../components/ProduceTrace/TraceList"
import ReportList from "../components/ProduceTrace/ReportList"
import Register from "../components/AccountManage/Register";
import OrderDetail from "../components/OrderManage/OrderDetail"
import UserManage from "../components/AuthorityManage/UserManage";
import RoleManage from "../components/AuthorityManage/RoleManage";
import PermitManage from "../components/AuthorityManage/PermitManage";
Vue.use(Router);
//创建路由对象,配置路由
const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/home/roleManage"
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
                    component: Register,
                    redirect: "/register/1",
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
            redirect:'/home/index',
            children: [
                {
                    path:"/home/index",
                    name:'首页',
                    component: Index
                },
                {
                    //添加设备
                    path: "addDevice",
                    name:'添加设备',
                    component: DeviceAdd
                },
                {
                    //设备列表
                    path: "deviceManage",
                    name:'设备列表',
                    component: DeviceManage
                },
                {
                    //更新设备
                    path: "deviceUpdate",
                    name:"updateDevice",
                    component: DeviceUpdate
                },
                {
                    //添加产品
                    path:"addProduct",
                    name:'添加产品',
                    component:AddProduct
                },
                {
                    //产品列表
                    path:'productList',
                    name:'产品列表',
                    component:ProductList
                },
                {
                    //订单管理
                    path: "orderManage",
                    name:'订单列表',
                    component: OrderManage,
                },
                {
                    //订单详情
                    path: "orderDetail",
                    name:"orderDetail",
                    component: OrderDetail
                },

                {
                    //添加生产计划
                    path:"addProductPlan",
                    name:'添加生产计划',
                    component:CreatePlan
                },
                {
                    //计划列表
                    path:"planList",
                    name:'计划列表',
                    component:PlanManagement
                },
                {
                    //添加生产调度
                    path:"addProductSchedule",
                    name:'添加生产调度',
                    component:CreateSchedule
                },
                {
                    //调度列表
                    path:"scheduleList",
                    name:'调度列表',
                    component:ScheduleManage
                },
                {
                    //报工
                    path:"reportList",
                    component:ReportList
                },
                {
                    //跟踪列表
                    path:"traceList",
                    name:'跟踪列表',
                    component:TraceList
                },
                {
                    //用户管理
                    path:"userManage",
                    name:'用户管理',
                    component:UserManage
                },
                {
                    //角色管理
                    path:"roleManage",
                    name:'角色管理',
                    component:RoleManage
                },
                {
                    //权限/菜单管理
                    path:"permitManage",
                    name:'权限管理',
                    component:PermitManage
                }
            ]
        }
    ]
});

//导出路由对象
export default router
