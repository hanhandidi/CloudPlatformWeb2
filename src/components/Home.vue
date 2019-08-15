<template>
    <el-container>
        <el-header>
            <TopMenu/>
        </el-header>
        <el-container style="height:662px" >
            <el-aside :width="$store.state.isCollapse ? '65px' : '250px'">
                <LeftMenu/>
            </el-aside>
            <el-main>
                <Tabs></Tabs>
                <!--缓存路由组件-->
                <div class="con">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import TopMenu from "./CloudIndex/TopMenu";
    import LeftMenu from "./CloudIndex/LeftMenu";
    import Tabs from "./CloudIndex/Tabs";

    export default {
        name: "home",
        components: {TopMenu, LeftMenu, Tabs},
        data() {
            return {}
        },
    }
</script>

<style scoped>
    .el-main, .el-header {
        padding: 0px !important;
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

    .con{
        overflow: auto;
    }
</style>
