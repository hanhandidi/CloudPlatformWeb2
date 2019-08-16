<template>
    <div class="main_con">
        <div class="con_title">
            <p class="title1">{{role.roleName}}</p>
            <span class="title2">{{role.roleDesc}}</span>
            <span class="show_btn" @click="showPermitList = true">全部权限</span>
            <el-dialog
                    title="权限列表"
                    width="48%"
                    :visible.sync="showPermitList">
                <permit-view></permit-view>
            </el-dialog>
        </div>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="content_box">
                    <div class="box_title">
                        <div style="background: #3e3f41;height: 12px;width: 3px;display: inline-block;margin-right: 15px"></div>
                        <span>权限操作</span>

                        <el-button type="primary" size="small" style="float: right" @click="handleSubmit">保存</el-button>
                    </div>
                    <div class="box_warp">
                        <el-tree
                                style="margin-top: 20px"
                                :data="permitMenuList"
                                show-checkbox
                                default-expand-all
                                node-key="id"
                                ref="tree"
                                highlight-current
                                :props="defaultProps">
                        </el-tree>
                    </div>
                </div>

            </el-col>
            <el-col :span="16">
                <div class="content_box">
                    <div class="box_title">
                        <div style="background: #3e3f41;height: 12px;width: 3px;display: inline-block;margin-right: 15px"></div>
                        <span>权限操作</span>
                    </div>
                    <div class="box_warp">
                        <template>
                            <!-- id 修改人  修改时间权 限名 权限ID  -->
                            <el-table
                                    :data="rolePermitList"
                                    border
                                    with="100%"
                                    size="medium">
                                <el-table-column
                                        label="#ID"
                                        width="80">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="修改人"
                                        width="80">
                                    <template slot-scope="scope">
                                        <i class="el-icon-user"></i>
                                        <span>{{ scope.row.updateUserid }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="修改时间"
                                        width="180">
                                    <template slot-scope="scope">
                                        <i class="el-icon-date"></i>
                                        <span style="margin-left: 5px">{{ scope.row.updateTime}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="权限名"
                                        width="120">
                                    <template slot-scope="scope">
                                        <el-tooltip class="item" effect="dark" :content=scope.row.roleDesc
                                                    placement="top-start">
                                            <span style="margin-left: 10px">{{ scope.row.permit.permitName }}</span>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="权限级别"
                                        width="80">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.permit.parentId === 0 ? 'primary' : 'success'"
                                                disable-transitions>{{scope.row.permit.parentId === 0 ? '父' : '子'}}
                                        </el-tag>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import PermitView from "./PermitView";
    import global from "../../router/global";

    export default {
        name: "PermitEdit",
        props: ['roleId'],
        components: {PermitView},
        data() {
            return {
                showPermitList: false,
                roleAPI: 'http://localhost/role',
                role: {},
                permitMenuListAPI: 'http://localhost/permit/menu/list',
                permitMenuList: [],
                rolePermitListAPI: 'http://localhost/role/permit/list',
                rolePermitList: [],
                rolePermitIdListAPI: 'http://localhost/role/permit/id/list',
                rolePermitIdList: [],
                defaultProps: {
                    children: 'permitSubs',
                    label: 'permitName'
                },
                rolePermitsAPI: 'http://localhost/role/permits'
            };
        },
        mounted() {
            console.log("===========" + this.roleId + "=========");
            this.getRole();
            this.getPermitMenuList();
            this.getRolePermitList();
            this.getRolePermitIdList();
        },
        methods: {
            getRole() {
                this.$ajax({
                    method: 'get',
                    url: this.roleAPI,
                    params: {
                        id: this.roleId,
                        factoryId: global.factoryId
                    }
                }).then((response) => {
                    // console.log(response.data);
                    this.role = response.data.data;
                }).catch((error) => {
                    this.$message.error('网络出错！');
                    console.log(error)
                })
            },
            getPermitMenuList() {
                this.$ajax({
                    method: 'get',
                    url: this.permitMenuListAPI
                }).then((response) => {
                    // console.log(response.data);
                    this.permitMenuList = response.data.data;
                }).catch((error) => {
                    this.$message.error('网络出错！');
                    console.log(error)
                })
            },
            getRolePermitList() {
                this.$ajax({
                    method: 'get',
                    url: this.rolePermitListAPI,
                    params: {
                        roleId: this.roleId,
                        factoryId: global.factoryId
                    }
                }).then((response) => {
                    // console.log(response.data);
                    this.rolePermitList = response.data.data;
                }).catch((error) => {
                    this.$message.error('网络出错！');
                    console.log(error)
                })
            },
            getRolePermitIdList() {
                this.$ajax({
                    method: 'get',
                    url: this.rolePermitIdListAPI,
                    params: {
                        roleId: this.roleId,
                        factoryId: global.factoryId
                    }
                }).then((response) => {
                    // console.log(response.data);
                    this.rolePermitIdList = response.data.data;
                    this.$refs.tree.setCheckedKeys(this.rolePermitIdList);
                }).catch((error) => {
                    this.$message.error('网络出错！');
                    console.log(error)
                })
            },
            handleSubmit() {
                console.log(this.$refs.tree.getCheckedKeys());
                // console.log(this.$refs.tree.getCheckedNodes());
                this.$ajax({
                    method: 'post',
                    url: this.rolePermitsAPI,
                    data: {
                        updateUserid: global.userId,
                        factoryId: global.factoryId,
                        roleId: this.roleId,
                        permitIds: this.$refs.tree.getCheckedKeys()
                    }
                }).then((response) => {
                    console.log(response.data);
                    if (response.data.code === 200) {
                        this.$message.success('权限修改保存成功！');
                        this.getRolePermitList();
                    } else {
                        this.$message.error('网络开小差了>.<');
                    }
                }).catch((error) => {
                    this.$message.error('网络出错！');
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    .main_con {
        padding: 50px;
    }

    .con_title {
        padding: 20px;
        background: #eef8ff;
        border: 1px solid #409EFF;
        border-radius: 3px;
        /*box-shadow: 0 2px 10px #bdbdbd;*/
    }

    .con_title .title1 {
        font-size: 18px;
        color: #4c4e52;
        margin-bottom: 5px;
    }

    .con_title .title2 {
        font-size: 12px;
        color: #606266;
    }

    .show_btn {
        cursor: pointer;
        font-size: 14px;
        margin-left: 30px;
        color: #409EFF;
        float: right;
        font-weight: 700;
    }


    .content_box {
        margin-top: 15px;
        margin-bottom: 15px;
        padding: 30px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 10px #bdbdbd;
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

    .box_warp >>> .el-tree-node, .is-focusable {
        margin-top: 10px;
    }

    .box_warp >>> .el-tree-node__content {
        /*font-weight: 700;*/
    }

    .box_warp >>> .el-tree-node__label {
        margin-left: 15px;
    }

    .box_warp >>> .el-checkbox {
        margin-left: 15px;
    }

    .box_warp >>> .el-tree-node__expand-icon {
        color: #3e3f41;
    }

    .box_warp >>> .el-tree-node__expand-icon.is-leaf {
        color: transparent;
    }

    .box_warp >>> .el-checkbox__inner {
        border: 1px solid #606266;
    }
</style>
