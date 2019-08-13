<template>
        <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="80px" style="width: 80%; margin-left:10%; margin-top: 5%;">
            <el-form-item label="产品名称" prop="productName">
                <el-input v-model="ruleForm.productName"></el-input>
            </el-form-item>
            <el-form-item label="产品图片">
                <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="产品状态" prop="proFlag">
                <el-radio-group v-model="ruleForm.flag">
                    <el-radio label="有效" ></el-radio>
                    <el-radio label="无效" ></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
</template>


<script>
    export default {
        data() {

            return {
                ruleForm: {
                    productName: '',
                    flag: 0,
                },
                rules: {
                    productName: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' },
                        { min: 1,  message: '至少一个字符', trigger: 'blur' }
                    ],
                    proFlag:[
                        { required: true, message: '请选择产品状态', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
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