<template>
    <div class="sidebar">
        <!--menu-->
        <el-menu
                :collapse="$store.state.isCollapse"
                active-text-color="#ffd04b"
                background-color="#222222"
                class="sidebar-el-menu"
                :default-active="$route.path"
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
                                          v-for="itemChild_Child in itemChild.subs"  @click="openTab(itemChild_Child.title)">
                                <i :class="itemChild_Child.icon"></i><span slot="title">{{itemChild_Child.title}}</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item :index="`/home/${itemChild.index}`" :key="itemChild.index" v-else @click="openTab(itemChild.title)">
                            <i :class="itemChild.icon"></i><span slot="title">{{itemChild.title}}</span>
                        </el-menu-item>
                    </template>
                </el-submenu>
                <el-menu-item :index="item.index" :key="item.index" v-else><i :class="item.icon"></i><span slot="title">{{item.title}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import menu from './menu-config'

    export default {
        name: "LeftMenu",
        data() {
            return {
                menu: menu,
                title:''
            }
        },
        methods:{
            openTab(title){
                console.log("title",title)
                let flag = false;
                for (let item of this.$store.state.openedTabs) {
                    if(item.title===title){
                        this.$store.commit('set_active_index', this.$route.path);
                        this.$router.push(this.$route.path);
                        flag=true;
                        break;
                    }
                }
                if(!flag){
                    this.$store.commit('add_tabs', {route: this.$route.path, title: title});
                    this.$store.commit('set_active_index', this.$route.path);
                    this.$router.push(this.$route.path);
                }
            }
        },
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: fixed;
        z-index: 20;
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
</style>
