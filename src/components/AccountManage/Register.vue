<template>
    <!--  账号输入登录-->
    <div class="login_box" style="border-top: 3px solid #0080ff">
        <router-link to="/login">
            <div class="login_close"></div>
        </router-link>
        <div class="login_panel">
            <el-steps :active=activeStep finish-status="success" simple style="margin-top: 20px;background: #d7e8fc">
                <el-step title="编辑工厂信息" icon="el-icon-s-open"></el-step>
                <el-step title="输入管理账户" icon="el-icon-s-custom"></el-step>
                <el-step title="确认完成" icon="el-icon-s-flag"></el-step>
            </el-steps>
            <transition
            >
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                activeStep: 0
            }
        },
        watch: {
            '$route'(to, from) {
                const toDepth = to.path;
                const fromDepth = from.path;
                if (toDepth === '/register/2') {
                    this.activeStep = 1;
                } else if (toDepth === '/register/3') {
                    this.activeStep = 3;
                } else {
                    this.activeStep = 0;
                }
                console.log(toDepth + '   ' + fromDepth + '   ' + this.transitionIn);
            }
        }
    }
</script>

<style scoped>
    @import url(https://cdn.jsdelivr.net/npm/animate.css@3.5.1);

    /*登录框*/
    .login_box {
        z-index: 99;
        position: absolute;
        width: 900px;
        height: 540px;
        top: 50%;
        left: 50%;
        margin-left: -450px;
        margin-top: -270px;
        border-radius: 6px;
        background-color: #fff;
        box-shadow: 0 2px 10px #999;
    }

    .login_close {
        position: absolute;
        top: 7px;
        right: 7px;
        width: 28px;
        height: 28px;
        background: url(../../assets/img/register_close.png) no-repeat right top;
        background-size: 100% 100%;
        border-top-right-radius: 5px;
        cursor: pointer;
        z-index: 99;
    }

    .login_panel {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 840px;
        height: 520px;
        /*padding: 30px;*/
        transform: translate(-50%, -50%);
        border-radius: 6px;
        overflow: hidden;
    }

</style>
