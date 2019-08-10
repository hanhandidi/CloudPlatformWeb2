<template>
    <div class="topBar">
        <div @click="Collapse" class="shrinkBut">
            <el-tooltip class="item" content="收缩菜单" effect="light" placement="bottom-end">
                <i class="el-icon-menu"></i>
            </el-tooltip>
        </div>
        <div class="title">
            <h1>东软制造云平台</h1>
        </div>
        <div class="topMenu">
            <!--全屏显示-->
            <div @click="handleFullScreen" class="btn-fullscreen">
                <el-tooltip :content="fullscreen?`取消全屏`:`全屏`" effect="light" placement="bottom">
                    <i class="el-icon-rank"></i>
                </el-tooltip>
            </div>
            <!--下拉菜单-->
            <el-dropdown>
                    <span class="el-dropdown-link">
                    管理员<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-user">基本资料</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-setting">修改密码</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--退出系统-->
            <div class="exit">
                <el-tooltip class="item" content="退出系统" effect="light" placement="bottom-end">
                    <i class="el-icon-switch-button"></i>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopMenu",
        props: {
            Collapse: Function
        },
        data() {
            return {
                fullscreen: false,
            }
        },
        methods: {
            // 全屏事件
            handleFullScreen() {
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        }

    }
</script>

<style scoped>
    .topBar {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        font-size: 22px;
        color: #fff;
    }

    .topBar .title {
        color: #eeeeee;
        font-size: 16px;
        float: left;
        width: 250px;
        line-height: 60px;
    }

    .topBar .shrinkBut {
        float: left;
        padding-left: 3px;
        padding-right: 20px;
        cursor: pointer;
        line-height: 60px;
    }

    .topBar .topMenu {
        display: flex;
        height: 60px;
        align-items: center;
        float: right;
    }

    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }

    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #ffffff;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .exit {
        margin-left: 10px;
        cursor: pointer;
    }

</style>
