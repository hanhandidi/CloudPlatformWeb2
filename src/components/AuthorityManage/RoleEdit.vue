<template>
    <div style="padding-right: 20px">
        <el-form :model="role" :rules="rules" ref="roleForm" label-width="100px">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="role.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
                <el-input type="textarea" v-model="role.roleDesc" :autosize="{ minRows: 6, maxRows: 8}"></el-input>
            </el-form-item>
            <el-form-item label="角色状态">
                <el-switch v-model="role.roleStatus" :active-value=0 :inactive-value=1
                           @change="statusChange">
                </el-switch>
                <span style="font-size: 13px;margin-left: 10px;color: #606266">选中为正常</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="submitForm('roleForm')"
                           style="width: 150px;margin-top: 20px">提交
                </el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>

    export default {
        name: 'RoleEdit',
        props: ['isAdd', 'role'],
        data() {
            return {
                roleAPI: 'http://localhost/role',
                rules: {
                    roleName: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                        {min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: ['blur', 'change']}
                    ],
                    roleDesc: [
                        {required: true, message: '请填写角色描述', trigger: 'blur'},
                        {min: 10, message: '请输入至少10个字符用于描述该角色哦', trigger: ['blur', 'change']}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.isAdd) {
                            this.$ajax({
                                method: 'post',
                                url: this.roleAPI,
                                data: this.qs.stringify(this.role)
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
                                url: this.roleAPI,
                                data: this.qs.stringify(this.role)
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
                if (this.role.roleStatus === 1) {
                    this.$confirm('修改此状态将导致该用户无法登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.role.roleStatus = 1;
                    }).catch(() => {
                        this.role.roleStatus = 0;
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
