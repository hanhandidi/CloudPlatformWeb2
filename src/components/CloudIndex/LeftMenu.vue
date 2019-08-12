<template>
    <div class="sidebar">
        <!--menu-->
        <el-menu
                :collapse="isCollapse"
                @select="addTab"
                active-text-color="#ffd04b"
                background-color="#222222"
                class="sidebar-el-menu"
                default-active="0"
                router
                text-color="#cccccc"
                unique-opened
        >

            <!--动态显示菜单-->
            <!-- 一级菜单 -->
            <template v-for="item in menu">
                <el-submenu :index="item.index" :key="item.index" v-if="item.subs && item.subs.length">
                    <template slot="title"><i :class="item.icon"></i><span>{{item.title}}</span></template>

                    <!-- 二级菜单 -->
                    <template v-for="itemChild in item.subs">
                        <el-submenu :index="itemChild.index" :key="itemChild.index"
                                    v-if="itemChild.subs && itemChild.subs.length">
                            <template slot="title"><i :class="itemChild.icon"></i><span>{{itemChild.title}}</span>
                            </template>

                            <!-- 三级菜单 -->
                            <el-menu-item :index="`/home/${itemChild_Child.index}`" :key="itemChild_Child.index"
                                          v-for="itemChild_Child in itemChild.subs">
                                <i :class="itemChild_Child.icon"></i><span slot="title">{{itemChild_Child.title}}</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item :index="`/home/${itemChild.index}`" :key="itemChild.index" v-else>
                            <i :class="itemChild.icon"></i><span slot="title">{{itemChild.title}}</span>
                        </el-menu-item>
                    </template>
                </el-submenu>
                <el-menu-item :index="item.index" :key="item.index" v-else><i :class="item.icon"></i><span slot="title">{{item.title}}</span>
                </el-menu-item>
            </template>
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
    import menu from './menu-config'
    import bus from './bus'

    export default {
        name: "LeftMenu",
        props: {
            isCollapse: Boolean
        },
        data() {
            return {
                menu: menu,
                openedTab: []
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
