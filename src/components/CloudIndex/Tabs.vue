<template>
    <div class="tag">
        <i class="el-icon-d-arrow-left leftBut"></i>
        <i class="el-icon-house leftBut" @click="toIndex"></i>
        <div class="mainBox" :style="{width:$store.state.isCollapse?1311+'px':1126+'px'}">
            <el-tabs closable type="card" v-model="activeIndex" @tab-click='tabClick'
                     @tab-remove='tabRemove'>
                <el-tab-pane
                        :key="index"
                        :label="item.name"
                        :name="item.route"
                        v-for="(item, index) in openTab"
                >
                </el-tab-pane>
            </el-tabs>
        </div>
        <i class="el-icon-d-arrow-right rightBut"></i>
        <el-dropdown hide-on-click @command="handleTags">
            <i class="el-icon-arrow-down rightBut pageAllBut"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command=all>关闭全部</el-dropdown-item>
                <el-dropdown-item command="others">关闭其他</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
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
                this.$router.push('/home/index')
            },
            //点击标签触发
            tabClick() {
                //console.log("tab", tab);
                //console.log('active', this.activeIndex);
                this.$router.push({path: this.activeIndex});
            },
            //关闭标签触发
            tabRemove(targetName) {
                console.log("tabRemove", targetName);
                //首页不删
                /*if (targetName === '/' || targetName === '/home/index') {
                    console.log('首页不删')
                    return
                }*/
                this.$store.commit('delete_tabs', targetName);
                if (this.activeIndex === targetName) {
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
                 this.$store.commit('add_tabs', {route: this.$route.path, name: this.$route.name});
                 this.$store.commit('set_active_index', this.$route.path);
                 this.$router.push({path: this.activeIndex});
             },
            handleTags(command) {
                command === 'others' ? this.closeOthers() : this.closeAll();
            }
        },

        /*watch: {
            '$route'(to) {
                //判断路由是否已经打开
                //已经打开的 ，将其置为active
                //未打开的，将其放入队列里
                let flag = false;
                for (let item of this.openTab) {
                    console.log("item.name", item.name)
                    console.log("t0.name", to.name)
                    if (item.name === to.name) {
                        //console.log('to.path', to.path);
                        this.$store.commit('set_active_index', to.path)
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    console.log('to.path', to.path);
                    if (to.path !== "/home/index") {
                        this.$store.commit('add_tabs', {route: to.path, name: to.name});
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
        width: 400px;
        height: 40px;
        float: left;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .tag .leftBut {
        display: block;
        float: left;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        border-right: 1px solid #f6f6f6;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .tag .rightBut {
        display: block;
        float: left;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        border-left: 1px solid #f6f6f6;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .leftBut:hover, .rightBut:hover {
        background-color: #f6f6f6;
    }

    .pageAllBut {
        position: relative;
    }
</style>
