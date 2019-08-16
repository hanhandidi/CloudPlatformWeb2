<template>
    <div>
        <div class="position">
            <el-form ref="device" :model="equipment" :rules="deviceRules" label-width="80px">
                <el-form-item label="设备序号" prop="equipmentSeq">
                    <el-input style="width: 50%" v-model="equipment.equipmentSeq"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" prop="equipmentName">
                    <el-input style="width: 50%" v-model="equipment.equipmentName"></el-input>
                </el-form-item>
                <el-form-item label="设备图片">
                    <el-upload class="avatar-uploader" action="http://10.10.84.8:8088/upload" :show-file-list="false"
                               :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload">
                        <img v-if="equipment.equipmentImgUrl" :src="`${this.MYGLOBAL.url}/${equipment.equipmentImgUrl}`"
                             class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="设备状态">
                    <el-select v-model="equipment.equipmentStatus">
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
                    <el-button type="primary" @click="onSubmit('device')">提交修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DeviceUpdate",
        data() {
            return {
                equipment: {},
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
        beforeRouteEnter(to, from, next) {
            next(
                (vm) => {
                    vm.getData();
                }
            )
        },
        methods: {
            onSubmit(device) {
                this.$refs[device].validate((valid) => {
                    if (valid) {
                        this.$ajax.put("/equipment/update", this.equipment).then(response => {
                            let code = response.data.code;
                            let message = response.data.message;
                            if (code === 200) {
                                this.$message({
                                    message: message,
                                    type: 'success'
                                });
                            } else {
                                this.$message.error(message);
                            }
                        }).catch(function (error) {
                            this.$message.error('添加失败');
                            console.log("添加失败：" + error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleAvatarSuccess(res, file) {
                this.equipment.equipmentImgUrl = res.data;
                console.log("file:" + file);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isPNG) {
                    this.$message.error('上传设备图片只能是JPG或PNG格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传设备图片大小不能超过 2MB!');
                }
                return (isJPG || isPNG) && isLt2M;
            },
            getData() {
                let device = this.$route.params.device;
                this.equipment = device;
                this.equipment.equipmentStatus = this.equipment.equipmentStatus.toString();
            }

        }
    }
</script>

<style scoped>
    .position {
        margin-top: 30px;
        margin-left: 30px;
    }
</style>