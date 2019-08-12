<template>
    <div class="panel_wrap">
        <div style="width: 400px; display: inline-block">
            <div class="input_box">
                <span class="box_title">工厂名称</span>
                <div class="box_cont">
                    <el-input placeholder="请输入内容">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <span class="box_info">
                          工厂名称不能重复，必须有意义，至少两个字节，字母区分大小写
                        </span>
                </div>
            </div>
            <div class="input_box">
                <span class="box_title">工厂地址</span>
                <div class="box_cont">
                    <el-input placeholder="请输入内容">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <span class="box_info">
                          请输入有效的工厂地址
                        </span>
                </div>
            </div>
            <div class="input_box">
                <span class="box_title">工厂网址</span>
                <div class="box_cont">
                    <el-input placeholder="请输入内容">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <span class="box_info">
                        </span>
                </div>
            </div>
            <div class="input_box">
                <span class="box_title">工厂人数</span>
                <div class="box_cont">
                    <el-input placeholder="请输入内容">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <span class="box_info">
                          请确保工厂人数在有效范围内，人数至少为1
                        </span>
                </div>
            </div>
        </div>
        <div class="input_box" style="float: right">
            <span class="box_title">工厂图片</span>
            <div class="box_cont">
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class="box_info">
                          请上传大小2M以内的JPG图片
                        </span>
            </div>
        </div>

        <el-button type="primary" round class="bt_next">下一步</el-button>
    </div>
</template>

<script>
    export default {
        name: "RegisterFactory",
        data() {
            return {
                imageUrl: ''
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
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


    /*上传图片*/
    .avatar-uploader >>> .el-upload {
        border: 1px dashed #c3c3c3;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader >>> .el-upload:hover {
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
        margin-top: 15px

    }

    .panel_wrap >>> .bt_next:hover {
        background-color: #2f86f6;
    }
</style>
