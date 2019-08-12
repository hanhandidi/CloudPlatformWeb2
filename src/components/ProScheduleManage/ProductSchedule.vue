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
                    <el-button type="primary" icon="el-icon-search" round @click="onSubmit">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="productSchedule" style="width: 100%">
            <el-table-column label="工单编号" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.scheduleSeq }}</span>
                </template>
            </el-table-column>
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
                        <p>住址: {{ scope.row.productName }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.createUserName }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="计划编号" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.planSeq }}</span>
                </template>
            </el-table-column>
            <el-table-column label="设备序号" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.equipmentSeq }}</span>
                </template>
            </el-table-column>
            <el-table-column label="产品名称" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.productName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="产品数量" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.planCount }}</span>
                </template>
            </el-table-column>
            <el-table-column label="开始日期" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.startDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="结束日期" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.endDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="工单状态" width="180">
                <template slot-scope="scope">
                    <el-tag
                            :type="showType(scope.row.scheduleStatus)"
                            disable-transitions>{{showText(scope.row.scheduleStatus)}}</el-tag>
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
                        <p>住址: {{ scope.row.productName }}</p>
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
        name: "ProductSchedule",
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                productSchedule:[
                    {
                        scheduleSeq:'W2019086989',
                        planSeq:'P2019086989',
                        scheduleStatus:10,
                        productName: '滤波电容器',
                        planCount: '25986',
                        equipmentSeq:'DX3602',
                        startDate: '2019-07-30',
                        endDate:'2019-08-20',
                        flag: 0,
                        createTime: '2016-05-02',
                        createUserName:'周全',
                        updateTime: '2016-05-02',
                        updateUserName:'连文凯',
                    },
                    {
                        scheduleSeq:'W2019086989',
                        planSeq:'P2019086989',
                        scheduleStatus:20,
                        productName: '滤波电容器',
                        planCount: '25986',
                        equipmentSeq:'DX3602',
                        startDate: '2019-07-30',
                        endDate:'2019-08-20',
                        flag: 0,
                        createTime: '2016-05-02',
                        createUserName:'周全',
                        updateTime: '2016-05-02',
                        updateUserName:'连文凯',
                    },
                    {
                        scheduleSeq:'W2019086989',
                        planSeq:'P2019086989',
                        scheduleStatus:30,
                        productName: '滤波电容器',
                        planCount: '25986',
                        equipmentSeq:'DX3602',
                        startDate: '2019-07-30',
                        endDate:'2019-08-20',
                        flag: 1,
                        createTime: '2016-05-02',
                        createUserName:'周全',
                        updateTime: '2016-05-02',
                        updateUserName:'连文凯',
                    },
                    {
                        scheduleSeq:'W2019086989',
                        planSeq:'P2019086989',
                        scheduleStatus:10,
                        productName: '滤波电容器',
                        planCount: '25986',
                        equipmentSeq:'DX3602',
                        startDate: '2019-07-30',
                        endDate:'2019-08-20',
                        flag: 0,
                        createTime: '2016-05-02',
                        createUserName:'周全',
                        updateTime: '2016-05-02',
                        updateUserName:'连文凯',
                    },
                ]
            };
        },
        methods: {
            showType(type){
                if(type===10){
                    return 'info';
                }else if(type===20){
                    return 'warning';
                }else {
                    return 'success';
                }
            },
            showText(text){
                if(text===10){
                    return '未开始';
                }else if(text===20){
                    return '生产中';
                }else {
                    return '已完成';
                }
            },
            onSubmit() {
                console.log('submit!');
            },
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