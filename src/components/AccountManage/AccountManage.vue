<template>
    <div id="main-warp" style="transform:perspective(500px) rotatey(0deg);">
        <!--        <el-carousel height="100%" class="login_carousel" direction="vertical" :autoplay="true">-->
        <!--            <el-carousel-item v-for="item in bgURL" :key="item">-->
        <!--                <img class="login_bg" :src=item alt="用户头像"/>-->
        <!--            </el-carousel-item>-->
        <!--        </el-carousel>-->
        <!--        <transition-->
        <!--                name="custom-classes-transition"-->
        <!--                :enter-active-class=transitionIn-->
        <!--                :leave-active-class=transitionOut-->
        <!--        >-->
        <!--            <router-view></router-view>-->
        <!--        </transition>-->
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
        <!--        <div class="login_content">-->
        <!--            <p><span class="left-quote"></span><span>Trunch·创趣</span></p>-->
        <!--            <p><span>创造点滴乐趣</span><span class="right-quote"></span></p>-->
        <!--        </div>-->
        <p class="power_by">© 2019 - 2019 Trunch All Rights Reserved</p>
    </div>
</template>

<script>
    export default {
        name: "AccountManage",
        data() {
            return {
                transitionIn: 'animated fadeInRight',
                transitionOut: 'animated fadeOutLeft',
                bgURL: [require('../../assets/img/bg1.jpg')
                    , require('../../assets/img/bg2.jpg')
                    , require('../../assets/img/bg3.jpg')
                    , require('../../assets/img/bg4.jpg')]
            }
        },
        watch: {
            // '$route'(to, from) {
            //     const toDepth = to.path;
            //     const fromDepth = from.path;
            //     if (fromDepth === '/login' && toDepth === '/auth') {
            //         this.transitionIn = 'animated fadeInRight';
            //         this.transitionOut = 'animated fadeOutLeft';
            //     } else if (fromDepth === '/auth' && toDepth === '/login') {
            //         this.transitionIn = 'animated fadeInLeft';
            //         this.transitionOut = 'animated fadeOutRight';
            //     } else if (fromDepth.indexOf('r') === 1 || toDepth.indexOf('r') === 1) {
            //         this.transitionIn = 'animated zoomInUp';
            //         this.transitionOut = 'animated zoomOutUp';
            //
            //     }
            //     // else if (toDepth.indexOf('r') === 1) {
            //     //     this.transitionIn = 'animated zoomInDown';
            //     //     this.transitionOut = 'animated zoomOutDown';
            //     // }
            //     console.log(toDepth.indexOf('r') + '   ' + fromDepth + '   ' + this.transitionIn);
            // }
        }
    }
</script>

<style scoped>
    /*@import url(https://cdn.jsdelivr.net/npm/animate.css@3.5.1);*/

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */


    /*.slide-fade-enter {*/
    /*}*/

    /*.slide-fade-leave {*/
    /*    width:900px;*/

    /*}*/

    /*.slide-fade-enter-active {*/
    /*}*/

    /*.slide-fade-leave-active {*/
    /*    transition:width 2s;*/
    /*    -moz-transition:width 2s; !* Firefox 4 *!*/
    /*    -webkit-transition:width 2s; !* Safari and Chrome *!*/
    /*    -o-transition:width 2s; !* Opera *!*/
    /*}*/

    /*.slide-fade-enter-to {*/
    /*}*/

    /*.slide-fade-leave-to {*/
    /*    width:1800px!important;*/
    /*}*/


    .slide-fade-enter {
        transform:perspective(1800px) rotateY(-180deg);
    }

    .slide-fade-leave {
        transform:perspective(1800px) rotateY(0);
    }

    .slide-fade-enter-active {
        backface-visibility: hidden;
        transform-style: preserve-3d;
        transition: ease-in-out 1000ms;
    }

    .slide-fade-leave-active {
        backface-visibility: hidden;
        transform-style: preserve-3d;
        transition: ease-in-out 1000ms;
    }

    .slide-fade-enter-to {
        transform:perspective(1800px) rotateY(0deg);
    }

    .slide-fade-leave-to {
        transform:perspective(1800px) rotateY(180deg);
    }


    #main-warp {
        height: 100%;
        background: url(../../assets/img/bg0.jpg) no-repeat 50%;
        background-size: cover;
    }

    /*页面全局*/
    * {
        margin: 0;
        padding: 0;
    }

    body,
    html {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        height: 100%;
    }

    /*登录背景幻灯片*/
    .login_carousel {
        height: 100%;
    }

    .login_carousel .login_bg {
        height: 100%;
        animation: unfocus 500ms forwards;
    }

    .login_carousel .login_bg:hover {
        animation: focus 500ms forwards;
    }

    @keyframes unfocus {
        0% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes focus {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.05);
        }
    }

    /*登录文字*/
    .login_content {
        z-index: 98;
        position: absolute;
        top: 80px;
        font-size: 45px;
        color: #fff;
    }

    .login_content p {
        position: relative;
        padding: 10px 100px;
    }

    .login_content .left-quote {
        background: url(../../assets/img/leftquote.png) top no-repeat;
        display: inline-block;
        position: absolute;
        left: 40px;
        top: 8px;
        height: 32px;
        width: 46px;
        overflow: hidden;
    }

    .login_content .right-quote {
        background: url(../../assets/img/rightquote.png) no-repeat top;
        position: absolute;
        right: 40px;
        top: 20px;
        height: 32px;
        width: 46px;
        overflow: hidden;
    }

    /*版权信息*/
    .power_by {
        position: absolute;
        bottom: 60px;
        right: 60px;
        color: #d3d3d3;
        font-size: 16px;
        line-height: 1.6;
        z-index: 98;
    }
</style>
