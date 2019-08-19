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
                    <div style="background: #3e3f41;height: 12px;width: 3px;display: inline-block"></div>&nbsp;<span>用户列表</span>
                </div>
                <div class="box_warp">
                    <template>
                        <!-- id 用户名 真实姓名 用户状态 用户手机 用户邮箱 创建人 创建时间 更新人 更新时间 用户角色（角色说明）-->
                        <el-table
                                :data="userList"
                                border
                                size="medium"
                                style="width: 100%">
                            <el-table-column
                                    label="#ID"
                                    width="100">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.id }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="用户名"
                                    width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.userName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="用户状态"
                                    width="100">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.userStatus === 0 ? 'success' : 'danger'" size="small"
                                            disable-transitions>{{scope.row.userStatus === 0 ? '正常' : '无效'}}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="真实姓名"
                                    width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.userRealName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="用户手机"
                                    width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.userPhoneNum }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="用户邮箱"
                                    width="160">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.userEmail }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="创建人"
                                    width="100">
                                <template slot-scope="scope">
                                    <i class="el-icon-user"></i>
                                    <span style="margin-left: 5px">{{ scope.row.createUser.userName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="创建时间"
                                    width="120">
                                <template slot-scope="scope">
                                    <i class="el-icon-date"></i>
                                    <span style="margin-left: 5px">{{ scope.row.createTime.split('T')[0]  }}</span>
                                </template>
                            </el-table-column>
                            <!--                            <el-table-column-->
                            <!--                                    label="修改人"-->
                            <!--                                    width="100">-->
                            <!--                                <template slot-scope="scope">-->
                            <!--                                    <i class="el-icon-user"></i>-->
                            <!--                                    <span>{{ scope.row.updateUserid }}</span>-->
                            <!--                                </template>-->
                            <!--                            </el-table-column>-->
                            <!--                            <el-table-column-->
                            <!--                                    label="修改时间"-->
                            <!--                                    width="120">-->
                            <!--                                <template slot-scope="scope">-->
                            <!--                                    <i class="el-icon-date"></i>-->
                            <!--                                    <span style="margin-left: 5px">{{ scope.row.updateTime.split(' ')[0] }}</span>-->
                            <!--                                </template>-->
                            <!--                            </el-table-column>-->
                            <el-table-column
                                    label="用户角色"
                                    width="100">
                                <template slot-scope="scope">
                                    <el-tooltip class="item" effect="dark" :content=scope.row.userRole.roleDesc
                                                placement="top-start">
                                        <span>{{ scope.row.userRole.roleName }}</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            @click="handleUser(false, scope.$index)">修改
                                    </el-button>
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            @click="deleteUser(scope.$index)">删除
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
                        <el-button @click="handleUser(true, 0)" type="primary" size="small" icon="el-icon-user">
                            添加用户
                        </el-button>
                    </div>
                </div>
            </div>
            <el-drawer
                    :title="drawerTitle"
                    :visible.sync="drawer"
                    direction="rtl">
                <UserEdit :is-add="drawerIsAdd" :user="user" :role-list="roleList"
                          @createResult="handleUserResult"></UserEdit>
            </el-drawer>
        </div>
    </div>
</template>

<script>
    import UserEdit from "./UserEdit";
    import global from "../../router/global";

    export default {
        name: "UserManage",
        components: {UserEdit},
        data() {
            return {
                userAPI: global.IP_PORT_2 + '/user',
                userListAPI: global.IP_PORT_2 + '/user/list',
                userList: [],
                roleListAPI: global.IP_PORT_2 + '/role/list',
                roleList: [],
                drawer: false,
                drawerTitle: '',
                drawerIsAdd: '',
                user: {
                    id: 0,
                    createUserid: 0,
                    updateUserid: 0,
                    userName: '',
                    userRealName: '',
                    userPasswd: '',
                    userJobNum: '',
                    userPhoneNum: '',
                    userEmail: '',
                    userStatus: 0,
                    roleId: 0,
                    factoryId: 0
                }
            }
        },
        mounted() {
            this.getUserList();
            this.getRoleList();
        },
        methods: {
            handleUser(isAdd, index) {
                if (isAdd) {
                    this.drawerTitle = "添加用户";
                    // 置空用户信息
                    this.user = {
                        id: global.userId,
                        createUserid: global.userId,
                        updateUserid: global.userId,
                        userName: '',
                        userRealName: '',
                        userPasswd: '',
                        userJobNum: '',
                        userPhoneNum: '',
                        userEmail: '',
                        userStatus: 0,
                        roleId: this.roleList[0].id,
                        factoryId: global.factoryId
                    };
                } else {
                    this.drawerTitle = "修改用户";
                    // 获得要修改的用户信息
                    this.user = this.userList[index];
                    this.user.updateUserid = global.userId;
                    delete this.user.createUser;
                    delete this.user.updateUser;
                    delete this.user.userRole;

                }
                this.drawer = true;
                this.drawerIsAdd = isAdd;
            },
            handleUserResult(data) {
                this.getUserList();
                this.drawer = data;
            },
            getUserList() {
                // alert("========"+global.factoryId);
                this.$ajax({
                    method: 'get',
                    url: this.userListAPI,
                    params: {
                        factoryId: global.factoryId
                    }
                }).then((response) => {
                    console.log(response.data);
                    this.userList = response.data.data
                }).catch((error) => {
                    this.$message.error('网络出错！');
                    console.log(error)
                })
            },
            deleteUser(index) {
                this.$confirm('是否删除该用户', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax({
                        method: 'delete',
                        url: this.userAPI,
                        params: {
                            id: this.userList[index].id,
                            updateUserid: global.factoryId,
                            factoryId: global.factoryId
                        }
                    }).then((response) => {
                        console.log(response.data);
                        if (response.data.code === 200) {
                            this.userList.splice(index, 1);
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
