<template>
        <el-form ref="porInfo" :rules="rules" :model="porInfo" label-width="80px" style="width: 80%; margin-left:10%; margin-top: 5%;">
            <el-form-item label="产品名称" prop="productName">
                <el-input v-model="porInfo.productName"></el-input>
            </el-form-item>
            <el-form-item label="产品图片">
                <el-upload class="avatar-uploader" action="http://10.10.84.8:8088/upload" :show-file-list="false" :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                    <img v-if="porInfo.productImgUrl"
                         :src="`${this.MYGLOBAL.url}/${porInfo.productImgUrl}`" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="产品状态" >
                <el-radio-group v-model="porInfo.flag">
                    <el-radio :label="1" >有效</el-radio>
                    <el-radio :label="0" >无效</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('porInfo')">立即创建</el-button>
                <el-button @click="resetForm('porInfo')">重置</el-button>
            </el-form-item>
        </el-form>
</template>
<script>
    export default {
        data() {
            return {
                porInfo: {
                    productName: '',
                    flag: 1,
                    productImgUrl:'',
                    factoryId:1,
                    createUserId:1,
                },
                rules: {
                    productName: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' },
                        { min: 1,  message: '至少一个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.porInfo);
                        this.$ajax.post("/product/add",this.porInfo).then(response=>{
                            let code = response.data.code;
                            console.log("添加结果："+code);
                            this.$message({
                                message: '设备录入成功',
                                type: 'success'
                            });
                        }).catch(function (error) {
                            console.log("添加失败："+error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file) {
                this.porInfo.productImgUrl = res.data;
                console.log("file:"+file);
                console.log("res.data"+res.data+"this.porInfo.productImgUrl"+this.porInfo.productImgUrl)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>