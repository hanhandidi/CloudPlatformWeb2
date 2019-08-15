<template>
    <div class="article">
        <div class="article_title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="article_content">
            <div class="content_box">
                <div class="box_title">
                    <span>权限列表</span>
                </div>
                <div class="box_warp">
                    <template>
                        <el-tabs tab-position="left" style="height: 100%">
                            <el-tab-pane disabled="true" label="配置管理">配置管理</el-tab-pane>
                            <el-tab-pane label="用户管理"><PermitView></PermitView></el-tab-pane>
                            <el-tab-pane label="配置管理"><PermitView></PermitView></el-tab-pane>
                            <el-tab-pane label="角色管理"><PermitView></PermitView></el-tab-pane>
                            <el-tab-pane label="客户"><PermitView></PermitView></el-tab-pane>
                        </el-tabs>
                    </template>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import PermitView from "./PermitView";
    export default {
        name: "PermitManage",
        components: {PermitView}
    }
</script>

<style scoped>

    .article >>>  .el-tabs--left .el-tabs__item.is-left {
        text-align: left;
        padding-left: 50px;
    }

    .article >>>  .el-tabs__item.is-disabled {
        text-align: left;
        padding-left: 20px!important;
    }


    .article {
        height: 100%;
        width: 100%;
    }

    .article_title {
        padding: 20px;
        background: #fff;
    }

    .article_content {
        padding: 20px;
        background: #ececec;
    }

    .content_box {
        padding: 15px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 10px #dcdcdc;
    }

    .box_title {
        font-weight: 700;
        color: #303133;
        font-size: 14px;
        /*padding-bottom: 15px;*/
        /*border-bottom: 1px solid #e2e2e2;*/
    }

    .box_warp {
        margin-top: 15px;
    }

</style>
