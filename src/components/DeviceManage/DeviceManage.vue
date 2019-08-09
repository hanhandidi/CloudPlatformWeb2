<template>
    <div>
        <div class="position">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="关键字">
                    <el-input v-model="formInline.user" ></el-input>
                </el-form-item>
                <el-form-item label="有效标志">
                    <el-select style="width: 120px" v-model="formInline.region" placeholder="选择标志">
                        <el-option label="有效" value="shanghai"></el-option>
                        <el-option label="失效" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="equipments" style="width: 100%">
            <el-table-column label="创建时间" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建人" width="130">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.createUserName }}</p>
                        <p>住址: {{ scope.row.name }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.createUserName }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="设备序号" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.seq }}</span>
                </template>
            </el-table-column>
            <el-table-column label="设备名称" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="设备图片" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.imgUrl }}</span>
                </template>
            </el-table-column>
            <el-table-column label="设备状态" width="180">
                <template slot-scope="scope">
                    <el-tag
                            :type="showType(scope.row.status)"
                            disable-transitions>{{showText(scope.row.status)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="有效标识" width="180">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.flag === 0 ? 'success' : 'info'"
                            disable-transitions>{{scope.row.flag === 0 ? '有效' : '无效'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="上次修改时间" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="修改人" width="130">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.updateUserName }}</p>
                        <p>住址: {{ scope.row.name }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.updateUserName }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "DeviceManage",
        data() {
            return {
                equipments: [{
                    seq: 'DX3602',
                    name: '喷水式平织机',
                    imgUrl: '暂无图片',
                    status: '10',
                    flag: 1,
                    createTime: '2016-05-02',
                    createUserName:'周全',
                    updateTime: '2016-05-02',
                    updateUserName:'连文凯',
                }, {
                    seq: 'DX3785',
                    name: '双冷源新风除湿机',
                    imgUrl: '暂无图片',
                    status: '20',
                    flag: 0,
                    createTime: '2016-05-02',
                    createUserName:'周全',
                    updateTime: '2016-05-02',
                    updateUserName:'连文凯',
                }, {
                    seq: 'SG5613',
                    name: '金属切削机床',
                    imgUrl: '暂无图片',
                    status: '10',
                    flag: 1,
                    createTime: '2016-05-02',
                    createUserName:'周全',
                    updateTime: '2016-05-02',
                    updateUserName:'连文凯',
                }, {
                    seq: 'FH0236',
                    name: '自动化仪表',
                    imgUrl: '暂无图片',
                    status: '30',
                    flag: 0,
                    createTime: '2016-05-02',
                    createUserName:'周全',
                    updateTime: '2016-05-02',
                    updateUserName:'连文凯',
                }],
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            onSubmit() {
                console.log('submit!');
            },
            showType(type){
                if(type==='10'){
                    return 'success';
                }else if(type==='20'){
                    return 'info';
                }else {
                    return 'danger';
                }
            },
            showText(text){
                if(text==='10'){
                    return '启用';
                }else if(text==='20'){
                    return '停用';
                }else {
                    return '故障';
                }
            }
        }


    }
</script>

<style scoped>
    .position{
        margin-top: 30px;
        margin-left: 18%;
        margin-bottom: 20px;

    }
</style>