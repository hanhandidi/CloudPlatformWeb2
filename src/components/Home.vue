<template>
    <el-container>
        <el-header>
            <TopMenu :Collapse="Collapse"/>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '65px' : '250px'">
                <LeftMenu :isCollapse="isCollapse"/>
            </el-aside>
            <el-main>
                <!--        <Tags></Tags>-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import TopMenu from "./CloudIndex/TopMenu";
    import LeftMenu from "./CloudIndex/LeftMenu";

    export default {
        name: "home",
        components: {TopMenu, LeftMenu},
        data() {
            return {
                isCollapse: false,  //是否收起侧边栏
            }
        },
        computed: {},
        methods: {
            Collapse() {
                let isCollapse = this.isCollapse

                this.isCollapse = !isCollapse
            }
        }
    }
</script>

<style>
    .el-main,.el-header{
        padding: 0px!important;
    }
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
        line-height: 178px !important;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
