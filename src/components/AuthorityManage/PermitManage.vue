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
                        <el-tabs tab-position="left" style="height: 100%" v-model="roleId">
                            <el-tab-pane disabled label="配置管理">配置管理</el-tab-pane>
                            <el-tab-pane :name="role.id.toString()" :label="role.roleName" v-for="role in roleList"
                                         :key="role.id">
                                <permit-view :role-id="role.id"></permit-view>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import PermitView from "./PermitEdit";
    import global from "../../router/global";

    export default {
        name: "PermitManage",
        components: {PermitView},
        data() {
            return {
                roleListAPI: 'http://localhost/role/list',
                roleList: [],
                roleId: '' //String
            }
        },
        mounted() {
            this.getRoleList();
        },
        methods: {
            getRoleList() {
                this.$ajax({
                    method: 'get',
                    url: this.roleListAPI,
                    params: {factoryId: global.factoryId}
                }).then((response) => {
                    console.log(response.data);
                    this.roleList = response.data.data;
                    this.roleId = this.roleList[0].id.toString();
                }).catch((error) => {
                    this.$message.error('网络出错！');
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>

    .article >>> .el-tabs--left .el-tabs__item.is-left {
        text-align: left;
        padding-left: 50px;
        padding-right: 50px;
    }

    .article >>> .el-tabs__item.is-disabled {
        text-align: left;
        padding-left: 20px !important;
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
