<template>
    <div class="panel_wrap">
        <div style="width: 400px; display: inline-block">
            <div class="input_box">
                <span class="box_title">登录别名</span>
                <div class="box_cont">
                    <el-input placeholder="请输入用户名" v-model="user.userName">
                        <i slot="prefix" class="el-input__icon el-icon-star-off"></i>
                    </el-input>
                    <span class="box_info">* 作为登录账号，不能重复，至少两个字节，字母区分大小写</span>
                </div>
            </div>
            <div class="input_box">
                <span class="box_title">真实姓名</span>
                <div class="box_cont">
                    <el-input placeholder="请输入姓名" v-model="user.userRealName">
                        <i slot="prefix" class="el-input__icon el-icon-user"></i>
                    </el-input>
                    <span class="box_info">* 请输入有效的真实姓名</span>
                </div>
            </div>
            <div class="input_box">
                <span class="box_title">登录密码</span>
                <div class="box_cont">
                    <el-input placeholder="请输入密码" v-model="user.userPasswd">
                        <i slot="prefix" class="el-input__icon el-icon-postcard"></i>
                    </el-input>
                    <span class="box_info">* 密码必须包含数字和字母，区分大小写，最短8位</span>
                </div>
            </div>
        </div>
        <div style="width: 400px; display: inline-block; float: right">
            <div class="input_box">
                <span class="box_title">用户邮箱</span>
                <div class="box_cont">
                    <el-input placeholder="请输入邮箱" v-model="user.userEmail">
                        <i slot="prefix" class="el-input__icon el-icon-message"></i>
                    </el-input>
                    <span class="box_info">* 填写有效的，且未被平台注册、未被私人帐号绑定的邮箱</span>
                </div>
            </div>
            <div class="input_box">
                <span class="box_title">用户手机</span>
                <div class="box_cont">
                    <el-input placeholder="请输入手机" v-model="user.userPhoneNum">
                        <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
                    </el-input>
                    <span class="box_info">* 请输入有效的用户手机号</span>
                </div>
            </div>
            <div class="input_box">
                <span class="box_title">用户工号</span>
                <div class="box_cont">
                    <el-input placeholder="请输入工号" v-model="user.userJobNum">
                        <i slot="prefix" class="el-input__icon el-icon-news"></i>
                    </el-input>
                    <span class="box_info">* 用户工号必须为10位以内的纯数字</span>
                </div>
            </div>
        </div>
        <el-button type="primary" round class="bt_next" @click="submitForm">下一步</el-button>
        <!--        <router-link to="/register/1">-->
        <!--            <el-button type="primary" round class="bt_next">上一步</el-button>-->
        <!--        </router-link>-->
    </div>
</template>

<script>
    import global from "../../router/global";

    export default {
        name: "RegisterAdmin",
        data() {
            return {
                userUpdateApi: 'http://localhost/user',
                user: {
                    id: global.userId,
                    createUserid: global.userId,
                    updateUserid: global.userId,
                    userName: '',
                    userRealName: '',
                    userPasswd: '',
                    userJobNum: '',
                    userPhoneNum: '',
                    userEmail: '',
                    userStatus: 0,
                    roleId: 0,
                    factoryId: global.factoryId
                }
            }
        },
        beforeCreate() {
            if (global.userId === '' || global.factoryId === '') {
                this.$router.push({
                    path: `/register/1`
                })
            }
        },
        methods: {
            submitForm() {
                this.$message.closeAll();
                if (this.user.userName.length < 2) {
                    this.$message.error('请按照要求输入用户昵称');
                    return null;
                }
                if (this.user.userRealName.length < 2) {
                    this.$message.error('请按照要求输入用户姓名');
                    return null;
                }
                if (!/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}$/.test(this.user.userPasswd)) {
                    this.$message.error('请按照要求输入用户密码');
                    return null;
                }
                if (!/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(this.user.userEmail)) {
                    this.$message.error('请输入有效的邮箱');
                    return null;
                }
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.user.userPhoneNum)) {
                    this.$message.error('请输入有效的手机');
                    return null;
                }
                if (!/^\d{10}$/.test(this.user.userJobNum)) {
                    this.$message.error('请按照要求输入用户工号');
                    return null;
                }
                // 开始网络交互
                this.$ajax({
                    method: 'put',
                    url: this.userUpdateApi,
                    params: this.user
                }).then((response) => {
                    if (response.data.code === 201) {
                        this.$message.error('用户名称已存在');
                    } else {
                        console.log(response.data);
                        global.userName = response.data.data.userName;
                        this.$router.push({
                            path: `/register/3`
                        })
                    }

                }).catch((error) => {
                    console.log(error)
                });

            }
        }
    }
</script>


<style scoped>

    /*============*/
    .panel_wrap {
        margin-top: 20px;
        height: 420px;
        /*padding: 10px 50px;*/
    }

    /*输入小块*/
    .input_box {
        margin-top: 30px;
    }

    .input_box .box_title {
        vertical-align: top;
        font-size: 14px;
        line-height: 2.5;
        color: #222;
    }

    .input_box .box_cont {
        width: 300px;
        margin-left: 15px;
        display: inline-block;
    }

    .input_box .box_info {
        font-size: 14px;
        color: #999999;
        margin-top: 5px;
    }


    /* 输入框和按钮 */
    .panel_wrap >>> input {
        border: 1px solid #c3c3c3;
    }

    .panel_wrap >>> input:hover {
        border: 1px solid #409EFF;
    }

    .panel_wrap >>> .bt_next {
        color: #ffffff;
        background: #379df6;
        cursor: pointer;
        float: right;
        margin-top: 50px;
        margin-right: 25px;

    }

    .panel_wrap >>> .bt_next:hover {
        background-color: #2f86f6;
    }
</style>
