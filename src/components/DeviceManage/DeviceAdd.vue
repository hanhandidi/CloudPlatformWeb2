<template>
    <div >
        <div class="position">
            <el-form ref="device" :model="equipment" :rules="deviceRules"  label-width="100px">
                <el-form-item label="设备序号" prop="seq">
                    <el-input style="width: 50%"  v-model="equipment.seq"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" prop="name">
                    <el-input style="width: 50%"  v-model="equipment.name"></el-input>
                </el-form-item>
                <el-form-item label="设备图片">
                    <el-upload class="avatar-uploader" action="http://localhost:8081/upload" :show-file-list="false" :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload">
                        <img v-if="equipment.imgUrl" :src="`http://localhost:8081/${equipment.imgUrl}`" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="可生产产品">
                    <el-button type="primary" icon="el-icon-plus"
                               round @click="addProduct">添加产品</el-button>
                </el-form-item>
                <el-form-item v-for="(item, index) in equipment.products" :key="index">
                    <el-select v-model="item.productID" >
                        <el-option v-for="(domain,index) in products"
                        :label="domain.name" :value="domain.id" :key="index"></el-option>
                    </el-select>
                    产能
                    <el-input style="width:100px"  v-model="item.yield"></el-input>
                    <el-select style="width:80px" v-model="item.unit" >
                        <el-option label="天" value="10"></el-option>
                        <el-option label="月" value="20"></el-option>
                        <el-option label="年" value="30"></el-option>
                        <el-option label="小时" value="40"></el-option>
                    </el-select>&nbsp;&nbsp;
                    <el-button type="danger" icon="el-icon-delete" circle
                               @click.prevent="removeProduct(item)"></el-button>
                </el-form-item>
                <el-form-item label="设备状态">
                    <el-select v-model="equipment.status" >
                        <el-option label="启用" value="10"></el-option>
                        <el-option label="停用" value="20"></el-option>
                        <el-option label="故障" value="30"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="有效标识">
                    <el-radio-group v-model="equipment.flag">
                        <el-radio :label="0">有效</el-radio>
                        <el-radio :label="1">失效</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('device')">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "DeviceAdd",
        data() {
            return {
                equipment: {
                    seq: '',
                    name: '',
                    imgUrl: '',
                    status: '10',
                    flag: 0,
                    products:[],
                },
                products:[
                    {
                        name:"403号钢管",
                        id:1
                    },
                    {
                        name:"无碳7毫米钢板",
                        id:2
                    },
                    {
                        name:"369号钢管",
                        id:3
                    }
                ],
                deviceRules: {
                    seq: [{
                            required: true,
                            message: '请输入设备序号',
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 100,
                            message: '设备序号长度至少2个字符',
                            trigger: 'blur'
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: '请输入设备名称',
                            trigger: 'blur'
                        }
                    ]
                }
            };
        },
        methods: {
            onSubmit(device) {
                this.$refs[device].validate((valid) => {
                    if (valid) {
                        console.log(this.equipment);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleAvatarSuccess(res, file) {
                //this.imageUrl = URL.createObjectURL(file.raw);
                this.imageUrl = res;
                console.log(res);
                console.log("file:" + file);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG&&!isPNG) {
                    this.$message.error('上传设备图片只能是JPG或PNG格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传设备图片大小不能超过 2MB!');
                }
                return (isJPG||isPNG) && isLt2M;
            },
            addProduct(){
                this.equipment.products.push({
                    productID:1,
                    unit:"10",
                    yield:""
                });
            },
            removeProduct(item){
                let index = this.equipment.products.indexOf(item);
                console.log("删除序号："+index);
                if (index !== -1) {
                    this.equipment.products.splice(index, 1);
                }
            },

        }
    }
</script>

<style scoped>
    .position{
        margin-top: 30px;
        margin-left: 30px;
    }
</style>