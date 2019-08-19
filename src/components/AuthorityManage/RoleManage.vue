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
            <el-row :gutter="20">
                <el-col :span="18">
                    <div class="content_box">
                        <div class="box_title">
                            <div style="background: #3e3f41;height: 12px;width: 3px;display: inline-block"></div>&nbsp;<span>角色列表</span>
                        </div>
                        <div class="box_warp">
                            <template>
                                <!-- id 角色名 状态 描述 创建人 创建时间 更新人 更新时间-->
                                <el-table
                                        :data="roleList"
                                        border
                                        size="medium"
                                        style="width: 100%">
                                    <el-table-column
                                            label="#ID"
                                            width="100">
                                        <template slot-scope="scope">
                                            <span style="margin-left: 10px">{{ scope.row.id }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="角色名"
                                            width="120">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" :content=scope.row.roleDesc
                                                        placement="top-start">
                                                <span style="margin-left: 10px">{{ scope.row.roleName }}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="角色状态"
                                            width="100">
                                        <template slot-scope="scope">
                                            <el-tag :type="scope.row.roleStatus === 0 ? 'success' : 'danger'"
                                                    size="small"
                                                    disable-transitions>{{scope.row.roleStatus === 0 ? '正常' : '无效'}}
                                            </el-tag>
                                        </template>
                                    </el-table-column>
                                    <!--                                    <el-table-column-->
                                    <!--                                            label="创建人"-->
                                    <!--                                            width="100">-->
                                    <!--                                        <template slot-scope="scope">-->
                                    <!--                                            <i class="el-icon-user"></i>-->
                                    <!--                                            <span style="margin-left: 10px">{{ scope.row.createUserid }}</span>-->
                                    <!--                                        </template>-->
                                    <!--                                    </el-table-column>-->
                                    <el-table-column
                                            label="创建时间"
                                            width="200">
                                        <template slot-scope="scope">
                                            <i class="el-icon-time"></i>
                                            <span style="margin-left: 10px">{{ scope.row.createTime.split('T')[0]}}</span>
                                        </template>
                                    </el-table-column>
                                    <!--                                    <el-table-column-->
                                    <!--                                            label="修改人"-->
                                    <!--                                            width="100">-->
                                    <!--                                        <template slot-scope="scope">-->
                                    <!--                                            <i class="el-icon-user"></i>-->
                                    <!--                                            <span style="margin-left: 10px">{{ scope.row.updateUserid }}</span>-->
                                    <!--                                        </template>-->
                                    <!--                                    </el-table-column>-->
                                    <el-table-column
                                            label="修改时间"
                                            width="200">
                                        <template slot-scope="scope">
                                            <i class="el-icon-time"></i>
                                            <span style="margin-left: 10px">{{ scope.row.updateTime.split('T')[0] }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button
                                                    size="mini"
                                                    @click="handleRole(false, scope.$index)">修改
                                            </el-button>
                                            <el-button
                                                    size="mini"
                                                    type="danger"
                                                    @click="deleteRole(scope.$index)">删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                            <el-pagination
                                    style="margin-top: 10px"
                                    :small="true"
                                    :disabled="true"
                                    :current-page="1"
                                    background
                                    layout="prev, pager, next"
                                    :total="100">
                            </el-pagination>
                            <div style="text-align: right;padding-right: 15px">
                                <el-button @click="handleRole(true, 0)" type="primary" size="small" icon="el-icon-user">
                                    添加角色
                                </el-button>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="content_box">
                        <div class="box_title">
                            <span>角色操作记录</span>
                        </div>
                        <div class="box_warp">
                            <!--                            <el-radio-group v-model="reverse">-->
                            <!--                                <el-radio :label="true">倒序</el-radio>-->
                            <!--                                <el-radio :label="false">正序</el-radio>-->
                            <!--                            </el-radio-group>-->
                            <el-timeline :reverse="reverse">
                                <el-timeline-item
                                        v-for="(activity, index) in activities"
                                        color="#409EFF"
                                        :key="index"
                                        :timestamp="activity.timestamp">
                                    {{activity.content}}
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-drawer
                    :title="drawerTitle"
                    :visible.sync="drawer"
                    direction="rtl">
                <RoleEdit :is-add="drawerIsAdd" :role="role" @createResult="handleCreateResult"></RoleEdit>
            </el-drawer>
        </div>
    </div>
</template>

<script>
    import RoleEdit from "./RoleEdit";
    import global from "../../router/global";

    export default {
        name: "UserManage",
        components: {RoleEdit},
        data() {
            return {
                roleAPI: global.IP_PORT_2 + '/role',
                roleListAPI: global.IP_PORT_2 + '/role/list',
                roleList: [],
                reverse: false,
                drawer: false,
                drawerTitle: '',
                drawerIsAdd: '',
                role: {
                    id: '',
                    createUserid: '',
                    updateUserid: '',
                    factoryId: '',
                    roleDesc: '',
                    roleName: '',
                    roleStatus: 0
                },
                activities: [{
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, {
                    content: '创建成功',
                    timestamp: '2018-04-11'
                }]
            }
        },
        mounted() {
            this.getRoleList();
        },
        methods: {
            handleRole(isAdd, index) {
                if (isAdd) {
                    this.drawerTitle = "添加角色";
                    this.role = {
                        id: 0,
                        createUserid: global.userId,
                        updateUserid: global.userId,
                        factoryId: global.factoryId,
                        roleDesc: '',
                        roleName: '',
                        roleStatus: 0
                    };
                } else {
                    this.drawerTitle = "修改角色";
                    this.role = this.roleList[index];
                    this.role.updateUserid = global.userId;
                }
                this.drawer = true;
                this.drawerIsAdd = isAdd;
            },
            handleCreateResult(data) {
                this.drawer = data;
                this.getRoleList();
            },
            getRoleList() {
                this.$ajax({
                    method: 'get',
                    url: this.roleListAPI,
                    params: {factoryId: global.factoryId}
                }).then((response) => {
                    console.log(response.data);
                    this.roleList = response.data.data
                }).catch((error) => {
                    this.$message.error('网络出错！');
                    console.log(error)
                })
            },
            deleteRole(index) {
                this.$confirm('是否删除该角色', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax({
                        method: 'delete',
                        url: this.roleAPI,
                        params: {
                            id: this.roleList[index].id,
                            updateUserid: global.factoryId,
                            factoryId: global.factoryId
                        }
                    }).then((response) => {
                        if (response.data.code === 200) {
                            this.roleList.splice(index, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    }).catch((error) => {
                        this.$message.error('网络出错！');
                        console.log(error)
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }
        }
    }
</script>

<style scoped>
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
