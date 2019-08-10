<template>
    <div class="sidebar">
        <!--menu-->
        <el-menu
                :collapse="isCollapse"
                active-text-color="#ffd04b"
                background-color="#222222"
                class="sidebar-el-menu"
                default-active="0"
                router
                text-color="#cccccc"
                unique-opened
        >
            <!--伪动态菜单-->
            <el-submenu :index="item.index" :key="index" v-for="(item,index) in items">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item :index="i.index" :key="childIndex" v-for="(i,childIndex) in item.subs" v-if="index!==3">
                    {{i.title}}
                </el-menu-item>
                <el-submenu :index="i.index" :key="childIndex" v-for="(i,childIndex) in item.subs"
                            v-if="index===3">
                    <template slot="title">
                        <span>{{i.title}}</span>
                    </template>
                    <el-menu-item :index="childItem.index" v-for="childItem in i.subs">{{childItem.title}}</el-menu-item>
                </el-submenu>
            </el-submenu>
            <!--静态菜单-->
            <!--<el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-s-operation"></i>
                    <span>设备管理</span>
                </template>
                <el-menu-item index="1-1">添加设备</el-menu-item>
                <el-menu-item index="1-2">设备列表</el-menu-item>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-s-goods"></i>
                    <span>产品管理</span>
                </template>
                <el-menu-item index="2-1">添加产品</el-menu-item>
                <el-menu-item index="2-2">产品列表</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">订单管理</span>
                </template>
                <el-menu-item index="3-1">添加订单</el-menu-item>
                <el-menu-item index="3-2">订单列表</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-s-cooperation"></i>
                    <span>生产管理</span>
                </template>
                <el-submenu index="4-1">
                    <template slot="title">生产计划管理</template>
                    <el-menu-item index="3-1-1">添加生产计划</el-menu-item>
                    <el-menu-item index="3-1-2">生产计划列表</el-menu-item>
                </el-submenu>
                <el-submenu index="3-2">
                    <template slot="title">生产调度管理</template>
                    <el-menu-item index="3-1-1">添加生产调度</el-menu-item>
                    <el-menu-item index="3-1-2">生产调度列表</el-menu-item>
                </el-submenu>
            </el-submenu>-->
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "LeftMenu",
        props: {
            isCollapse: Boolean
        },
        data() {
            return {
                items: [
                    {
                        title: '设备管理',
                        index:'1',
                        icon: 'el-icon-s-operation',
                        subs: [
                            {
                                index: 'deviceManage',
                                title: '设备列表'
                            },
                            {
                                index: 'addDevice',
                                title: '添加设备'
                            },
                        ]
                    },
                    {
                        title: '产品管理',
                        index:'2',
                        icon: 'el-icon-s-goods',
                        subs: [
                            {
                                index: 'productList',
                                title: '产品列表'
                            },
                            {
                                index: 'addProduct',
                                title: '添加产品'
                            },
                        ]
                    },
                    {
                        title: '订单管理',
                        index:'3',
                        icon: 'el-icon-s-order',
                        subs: [
                            {
                                index: 'orderManage',
                                title: '订单列表'
                            },
                        ]
                    },
                    {
                        title: '生产管理',
                        index:'4',
                        icon: 'el-icon-s-cooperation',
                        subs: [
                            {
                                title: '生产计划管理',
                                index:'4-1',
                                subs: [
                                    {
                                        index: 'addProductPlan',
                                        title: '添加生产计划'
                                    },
                                    {
                                        index: 'planList',
                                        title: '生产计划列表'
                                    },
                                ]
                            },
                            {
                                title: '生产调度管理',
                                index:'4-2',
                                subs: [
                                    {
                                        index: 'addProductSchedule',
                                        title: '添加生产调度'
                                    },
                                    {
                                        index: 'ScheduleList',
                                        title: '生产调度列表'
                                    },
                                ]
                            },
                            {
                                title: '生产跟踪管理',
                                index:'4-3',
                                subs: [
                                    {
                                        index: 'addProduceTrace',
                                        title: '添加生产跟踪'
                                    },
                                    {
                                        index: 'TraceList',
                                        title: '生产跟踪列表'
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        },
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 60px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }

    .el-submenu__title:hover {
        /*background-color: rgb(255,153,102) !important;*/
        color: rgb(255, 255, 255) !important;
    }

    .el-menu-item:hover {
        /*background-color: rgb(255,153,102) !important;*/
        color: rgb(255, 255, 255) !important;
    }
</style>
