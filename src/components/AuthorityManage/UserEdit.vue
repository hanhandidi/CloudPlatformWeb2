<template>
    <div style="padding-right: 20px">
        <el-form :model="user" :rules="rules" ref="userForm" label-width="100px">
            <el-form-item label="登录名" prop="userName">
                <el-input v-model="user.userName"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="userRealName">
                <el-input v-model="user.userRealName"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="userPasswd">
                <el-input v-model="user.userPasswd"></el-input>
            </el-form-item>
            <el-form-item label="用户工号" prop="userJobNum">
                <el-input v-model="user.userJobNum"></el-input>
            </el-form-item>
            <el-form-item label="用户手机" prop="userPhoneNum">
                <el-input v-model="user.userPhoneNum"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="userEmail">
                <el-input v-model="user.userEmail"></el-input>
            </el-form-item>
            <el-form-item label="用户角色" prop="roleId">
                <el-select v-model="user.roleId" placeholder="请选择用户角色">
                    <el-option :label="role.roleName" :value="role.id" v-for="role in roleList"
                               :key="role.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户状态">
                <el-switch v-model="user.userStatus" :active-value="0" :inactive-value="1"
                           @change="statusChange"></el-switch>
                <span style="font-size: 13px;margin-left: 10px;color: #606266">选中为正常</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="submitForm('userForm')"
                           style="width: 150px;margin-top: 20px">提交
                </el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>


    import global from "../../router/global";

    export default {
        name: 'userEdit',
        props: ['isAdd', 'user', 'roleList'],
        data() {
            return {
                userAPI: global.IP_PORT_2 + '/user',
                rules: {
                    userName: [
                        {required: true, message: '请输入用户登录名', trigger: 'blur'},
                        {min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: ['blur', 'change']}
                    ],
                    userRealName: [
                        {required: true, message: '请输入用户真实姓名', trigger: 'blur'},
                        {min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: ['blur', 'change']}
                    ],
                    userPasswd: [
                        {required: true, message: '请输入用户密码', trigger: 'blur'},
                        {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: ['blur', 'change']}
                    ],
                    userJobNum: [
                        {required: true, message: '工号不能为空', trigger: 'blur'},
                        {min: 6, max: 6, message: '工号必须为6位纯数值', trigger: ['blur', 'change']}
                    ],
                    userPhoneNum: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'},
                        {min: 11, max: 11, message: '请输入正确的手机号', trigger: ['blur', 'change']}
                    ],
                    userEmail: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    roleId: [
                        {required: true, message: '请选择用户角色', trigger: 'change'}
                    ]
                }
            };
        },
        mounted() {

        },
        // updated() {
        //     this.user.roleId = this.roleList[0].id;
        // },
        methods: {
            submitForm(formName) {
                delete this.user.createTime;
                delete this.user.updateTime;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.isAdd) {
                            this.$ajax({
                                method: 'post',
                                url: this.userAPI,
                                data: this.qs.stringify(this.user)
                            }).then((response) => {
                                console.log(response.data.data);
                                if (response.data.code === 201) {
                                    this.$message.error('角色名已存在！');
                                } else if (response.data.code === 200) {
                                    this.$emit("createResult", false);
                                    this.$message.success('创建成功！');
                                } else {
                                    this.$message.error('网络出错啦>.<');
                                }
                            }).catch((error) => {
                                this.$message.error('网络出错！');
                                console.log(error)
                            })
                        } else {
                            this.$ajax({
                                method: 'put',
                                url: this.userAPI,
                                data: this.qs.stringify(this.user)
                            }).then((response) => {
                                console.log("=========修改===========");
                                console.log(response.data.data);
                                if (response.data.code === 201) {
                                    this.$message.error('角色名已存在！');
                                } else if (response.data.code === 200) {
                                    this.$emit("createResult", false);
                                    this.$message.success('修改成功！');
                                } else {
                                    this.$message.error('网络出错啦>.<');
                                }
                            }).catch((error) => {
                                this.$message.error('网络出错！');
                                console.log(error)
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            statusChange() {
                if (this.user.userStatus === 1) {
                    this.$confirm('修改此状态将导致该用户无法登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.user.userStatus = 1;
                    }).catch(() => {
                        this.user.userStatus = 0;
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
