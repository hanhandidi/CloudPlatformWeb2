<template>
    <div>
<!--        <div class="box_title">-->
<!--            <span>权限列表</span>-->
<!--        </div>-->
        <div>
            <template>
                <!-- id 权限名 权限图标 权限状态 权限路径 父id-->
                <el-table
                        :data="permitList"
                        border
                        with="100%"
                        size="medium">
                    <el-table-column
                            label="#ID"
                            width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="权限名"
                            width="180">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content=scope.row.roleDesc
                                        placement="top-start">
                                <span style="margin-left: 10px">{{ scope.row.permitName }}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="权限图标"
                            width="100">
                        <template slot-scope="scope" style="margin-left: 10px">
                            <i :class="scope.row.permitIcon" style="margin-left: 15px"></i>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="权限状态"
                            width="100">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status === 0 ? 'success' : 'warning'"
                                    disable-transitions>{{scope.row.status === 0 ? '正常' : '无效'}}
                            </el-tag>
                        </template>
                    </el-table-column>
<!--                    <el-table-column-->
<!--                            label="权限路径"-->
<!--                            width="180">-->
<!--                        <template slot-scope="scope">-->
<!--                            <span style="margin-left: 10px">{{ scope.row.permitPath}}</span>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                    <el-table-column
                            label="父权限"
                            width="100">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.parentId === 0 ? 'primary' : 'info'"
                                    disable-transitions>{{scope.row.parentId === 0 ? '父级权限' : scope.row.parentId}}
                            </el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermitView",
        data() {
            return {
                permitAPI: "http://localhost/permit/list",
                permitList: []
            }
        },
        methods: {
            getPermitList() {
                this.$ajax({
                    method: 'post',
                    url: this.permitAPI
                }).then((response) => {
                    this.permitList = response.data.data
                }).catch((error) => {
                    this.$message.error('网络出错！');
                    console.log(error)
                })
            }
        },
        mounted() {
            this.getPermitList();
        }
    }
</script>

<style scoped>

</style>
