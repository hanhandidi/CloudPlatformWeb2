<template>
    <div >
        <div class="position">
            <el-form ref="device" :model="equipment" :rules="deviceRules"  label-width="100px">
                <el-form-item label="设备序号" prop="equipmentSeq">
                    <el-input style="width: 50%"  v-model="equipment.equipmentSeq"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" prop="equipmentName">
                    <el-input style="width: 50%"  v-model="equipment.equipmentName"></el-input>
                </el-form-item>
                <el-form-item label="设备图片">
                    <el-upload class="avatar-uploader" action="http://10.10.84.8:8088/upload" :show-file-list="false" :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload">
                        <img v-if="equipment.equipmentImgUrl"
                             :src="`${this.MYGLOBAL.url}/${equipment.equipmentImgUrl}`" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="可生产产品">
                    <el-button type="primary" icon="el-icon-plus"
                               round @click="addProduct">添加产品</el-button>
                </el-form-item>
                <el-form-item v-for="(item, index) in equipment.equipmentProductVOS" :key="index">
                    <el-select v-model="item.productId" placeholder="请选择产品">
                        <el-option v-for="(domain,index) in products"
                        :label="domain.productName" :value="domain.id" :key="index"></el-option>
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
                    <el-select v-model="equipment.equipmentStatus" >
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
                    <el-button @click="resetForm">取消</el-button>
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
                    equipmentSeq: '',
                    equipmentName: '',
                    equipmentImgUrl: '',
                    equipmentStatus: "10",
                    flag: 0,
                    equipmentProductVOS:[],
                    factoryId:1,
                    createUserid:2,
                    updateUserid:2
                },
                products:[{}],
                deviceRules: {
                    equipmentSeq: [{
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
                    equipmentName: [
                        {
                            required: true,
                            message: '请输入设备名称',
                            trigger: 'blur'
                        }
                    ]
                }
            };
        },
        created(){
            this.$ajax.post("/product/list",{
                factoryId:1
            }).then(response=>{
                this.products = response.data.data;
                console.log(response.data.code+"---"+this.products+this.MYGLOBAL.url);
            }).catch(function (error) {
                console.log(error);
            });
        },
        methods: {
            onSubmit(device) {
                this.$refs[device].validate((valid) => {
                    if (valid) {
                        this.$ajax.post("/equipment/addVO",this.equipment).then(response=>{
                            let code = response.data.code;
                            console.log("添加结果："+code);
                            this.$message({
                                message: '设备录入成功',
                                type: 'success'
                            });
                            this.resetForm();
                        }).catch(function (error) {
                            this.$message.error('添加失败');
                            console.log("添加失败："+error);
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleAvatarSuccess(res, file) {
                //this.imageUrl = URL.createObjectURL(file.raw);
                this.equipment.equipmentImgUrl = res.data;
                console.log("file:"+file);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG&&!isPNG) {
                    this.$message.error('上传设备图片只能是JPG或PNG格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传设备图片大小不能超过 2MB!');
                }
                return (isJPG||isPNG) && isLt2M;
            },
            addProduct(){
                this.equipment.equipmentProductVOS.push({
                    productId:"",
                    unit:"10",
                    yield:0
                });
            },
            removeProduct(item){
                let index = this.equipment.equipmentProductVOS.indexOf(item);
                if (index !== -1) {
                    this.equipment.equipmentProductVOS.splice(index, 1);
                }
            },
            resetForm() {
                this.equipment.equipmentSeq="";
                this.equipment.equipmentImgUrl="";
                this.equipment.equipmentName="";
                this.equipment.flag=0;
                this.equipment.equipmentStatus="10";
                this.equipment.equipmentProductVOS=[];
            }
        }
    }
</script>

<style scoped>
    .position{
        margin-top: 30px;
        margin-left: 30px;
    }
</style>