<template>
    <div class="panel_wrap">
        <img class="success_icon" src="../../assets/img/success.png" alt="">
        <p class="success_title1">恭喜您创建工厂成功！</p>
        <p class="success_title2">管理员的信息如下：</p>
        <div class="success_info" style="width: 360px">
            <div>
                <p>用户ID：</p>
                <p>{{userId}}</p>
            </div>
            <div>
                <p>登录别名：</p>
                <p>{{userName}}</p>
            </div>
        </div>
        <div>
            <p class="success_tip">请使用用户ID和登录别名进行登录！</p>
        </div>
        <router-link to="/login">
            <el-button type="primary" round class="bt_next">完成</el-button>
        </router-link>
    </div>
</template>

<script>
    import global from "../../router/global";

    export default {
        name: "RegisterFinish",
        data() {
            return {
                userId: global.userId,
                userName: global.userName
            };
        },
        beforeCreate() {
            if (global.userId === '' || global.userName === '' || global.factoryId === '') {
                this.$router.push({
                    path: `/register/1`
                })
            }
        }
    }
</script>

<style scoped>
    .panel_wrap {
        width: 100%;
        text-align: center;
    }

    .panel_wrap .success_icon {
        margin: 20px;
        height: 120px;
        width: 120px;
    }

    .panel_wrap .success_title1 {
        font-size: 20px;
    }

    .panel_wrap .success_title2 {
        font-size: 20px;
        margin-top: 10px;
    }

    .panel_wrap .success_info {
        margin-top: 15px;
        margin-bottom: 10px;
        border-top: 1px solid #c3c3c3;
        border-right: 1px solid #c3c3c3;
        background: #d7e8fc;
        display: inline-block;
    }

    .panel_wrap .success_info p {
        border-left: 1px solid #c3c3c3;
        border-bottom: 1px solid #c3c3c3;
        display: inline-block;
        width: 158px;
        padding: 10px;
        font-size: 14px;
    }

    .success_tip {
        width: 360px;
        font-size: 14px;
        text-align: left;
        display: inline-block;
    }


    .panel_wrap >>> .bt_next {
        color: #ffffff;
        background: #379df6;
        cursor: pointer;
        float: right;
        margin-top: 20px;
        margin-right: 25px;

    }

    .panel_wrap >>> .bt_next:hover {
        background-color: #2f86f6;
    }

</style>
