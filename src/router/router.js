//配置路由
import Vue from 'vue'
//导入vue-router,js库
import Router from 'vue-router'
//导入需要配置路由的组件
import Home from "../components/CloudIndex/Home";
import AccountManage from "../components/AccountManage/AccountManage";
import Auth from "../components/AccountManage/Auth";
import Login from "../components/AccountManage/Login";

import deviceManage from '../components/DeviceManage/DeviceManage'
import deviceAdd from '../components/DeviceManage/DeviceAdd'
import orderManage from '../components/OrderManage/OrderManagement'

Vue.use(Router);
//创建路由对象,配置路由
const router = new Router({
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
//导出路由对象
export default router
