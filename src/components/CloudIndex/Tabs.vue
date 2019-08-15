<template>
    <div class="tag">
        <el-row>
            <el-col :span="1">
                <div class="leftBut"><i class="el-icon-house" @click="toIndex"></i></div>
                <div class="leftBut"><i class="el-icon-d-arrow-left"></i></div>
            </el-col>
            <el-col :span="22">
                <div class="mainBox">
                    <el-tabs closable type="card" v-model="activeIndex" @tab-click="tabClick" @tab-remove="tabRemove">
                        <el-tab-pane
                                :key="index"
                                :label="item.title"
                                :name="item.route"
                                v-for="(item, index) in openTab"
                        >
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
            <el-col :span="1">
                <div>
                    <i style="display:block;height: 40px;float: left;font-size: 20px;line-height: 40px;cursor: pointer"
                       class="el-icon-d-arrow-right"></i>
                    <el-dropdown style="display:block;height: 40px;float: left;font-size: 20px;line-height: 40px;cursor: pointer"
                                 hide-on-click @command="handleTags">
                        <i class="el-icon-arrow-down"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command=all>关闭全部</el-dropdown-item>
                            <el-dropdown-item command="others">关闭其他</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        computed: {
            openTab() {
                return this.$store.state.openedTabs;
            },
            activeIndex: {
                get() {
                    return this.$store.state.activeIndex;
                },
                set(val) {
                    this.$store.commit('set_active_index', val);
                }
            }
        },
        mounted() {

        },
        methods: {
            //进入主页
            toIndex() {
                this.$router.push('/home')
            },
            //点击标签触发
            tabClick() {
                //console.log("tab", tab);
                //console.log('active', this.activeIndex);
                this.$router.push({path: this.activeIndex});
            },
            //关闭标签触发
            tabRemove(route) {
                console.log("tabRemove", route);
                //首页不删
                /*if (targetName === '/' || targetName === '/home/index') {
                    console.log('首页不删')
                    return
                }*/
                this.$store.commit('delete_tabs', route);
                if (this.activeIndex === route) {
                    // 设置当前激活的路由
                    if (this.openTab && this.openTab.length >= 1) {
                        //console.log('=============', this.openTab[this.openTab.length - 1].route)
                        this.$store.commit('set_active_index', this.openTab[this.openTab.length - 1].route);
                        this.$router.push({path: this.activeIndex});
                    } else {
                        this.$router.push('/home/index');
                    }
                }
            },
            // 关闭全部标签
            closeAll() {
                this.$store.commit('clear_tabs');
                this.$store.commit('set_active_index', '/home/index');
                this.$router.push('/home/index');
            },
            // 关闭其他标签
            closeOthers() {
                this.$store.commit('clear_tabs');
                this.$store.commit('add_tabs', {route: this.$route.path, title: this.$route.title});
                this.$store.commit('set_active_index', this.$route.path);
                this.$router.push({path: this.activeIndex});
            },
            handleTags(command) {
                command === 'others' ? this.closeOthers() : this.closeAll();
            }
        },

       /* watch: {
            '$route'(to) {
                //判断路由是否已经打开
                //已经打开的 ，将其置为active
                //未打开的，将其放入队列里
                let flag = false;
                for (let item of this.openTab) {
                    if (item.route === to.route) {
                        //console.log('to.path', to.path);
                        this.$store.commit('set_active_index', to.path)
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    console.log('to.path', to.path);
                    if (to.path !== "/home/index") {
                        this.$store.commit('add_tabs', {route: to.path, title: this.title});
                        this.$store.commit('set_active_index', to.path);
                    }
                }
            }
        }*/
    }
</script>
<style scoped>
    .tag {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #F0F0F0;
        -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
        -moz-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
        -o-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
    }

    .tag .mainBox {
        width: 100%;
        height: 40px;
        float: left;
        overflow: hidden;
        /*position: relative;*/
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .leftBut{
        display: inline-block;
        width: 25px;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        cursor: pointer;
    }
    .leftBut:hover{
        background-color: #f6f6f6;
    }

</style>
