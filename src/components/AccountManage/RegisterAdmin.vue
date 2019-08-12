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
        <div style="width: 400px; display: inline-block; float: right">
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

        <el-button type="primary" round class="bt_next">下一步</el-button>
    </div>
</template>

<script>
    export default {
        name: "RegisterAdmin"
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
    .login_panel >>> input {
        border: 1px solid #c3c3c3;
    }

    .login_panel >>> input:hover {
        border: 1px solid #409EFF;
    }

    .login_panel >>> .bt_next {
        color: #ffffff;
        background: #379df6;
        cursor: pointer;
        float: right;
        margin-top: 15px

    }

    .login_panel >>> .bt_next:hover {
        background-color: #2f86f6;
    }
</style>
