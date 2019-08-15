<template>
    <div style="padding-right: 20px">
        <el-form :model="role" :rules="rules" ref="roleForm" label-width="100px">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="role.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc" style="min-height: 200px">
                <el-input type="textarea" v-model="role.roleDesc"></el-input>
            </el-form-item>
            <el-form-item label="角色状态">
                <el-switch v-model="role.roleStatus" active-value=0 inactive-value=1></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('roleForm')">立即创建</el-button>
                <el-button @click="resetForm('roleForm')">重置</el-button>
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
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    roleDesc: [
                        { required: true, message: '请填写角色描述', trigger: 'blur' }
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
                                    this.$emit("createResult",true);
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
