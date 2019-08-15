<!--
TODO:员工可对设备当前的生产情况进行报工，更新生产进度状况
TODO:报工：可对已启动的工单进行报工操作。报工操作需要录入加工数量、合格数量，加工起始时间。
TODO:完成报工：在当前工单生产完成时可完成最后一次报工，勾选完成报工，可将当前工单置成已完成状态。
-->
<template>
    <div style="margin: 20px;">
        <div class="position">
            <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
                <el-form-item label="工单编号">
                    <el-input v-model="queryInfo.equipmentSeq" ></el-input>
                </el-form-item>
                <el-form-item label="工单状态">
                    <el-select style="width: 120px" v-model="queryInfo.scheduleStatus" placeholder="选择工单状态">
                        <el-option value="未开始" :label="queryInfo.scheduleStatus">未开始</el-option>
                        <el-option value="生产中" :label="queryInfo.scheduleStatus">生产中</el-option>
                        <el-option value="已结束" :label="queryInfo.scheduleStatus">已结束</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" round @click="onQurey">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="productSchedule" style="width: 100%">
            <el-table-column label="工单编号" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.scheduleSeq }}</span>
                </template>
            </el-table-column>
            <el-table-column label="计划编号" width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.planSeq }}</span>
                </template>
            </el-table-column>
            <el-table-column label="工单状态" width="180">
                <template slot-scope="scope">
                    <el-tag
                            :type="showType(scope.row.scheduleStatus)"
                            disable-transitions>{{showText(scope.row.scheduleStatus)}}</el-tag>
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
            <el-table-column label="创建时间" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="加工数量" width="180">
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
                    <el-button type="primary" v-if="scope.row.scheduleStatus!='30'" size="mini" @click="handleCreateReport( scope.row)">
                        报工
                    </el-button>
                    <el-button v-if="scope.row.scheduleStatus=='30'" size="mini"  @click="showTraceDetial( scope.row)">
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="外层 Dialog1" :visible.sync="outerVisible" >
            <el-button type="info">工单信息</el-button>
            <ul>
                <li>
                    <div class="infoDiv"><el-tag >工单编号</el-tag><el-tag type="info">{{scheItem.scheduleSeq}}</el-tag></div>
                    <div class="infoDiv"><el-tag >产品名称</el-tag><el-tag type="info">{{scheItem.productName}}</el-tag></div>
                </li>
                <li>
                    <div class="infoDiv"><el-tag >计划编号</el-tag><el-tag type="info">{{scheItem.planSeq}}</el-tag></div>
                    <div class="infoDiv"><el-tag >开始日期</el-tag><el-tag type="info">{{scheItem.startDate}}</el-tag></div>
                </li>
                <li>
                    <div class="infoDiv"><el-tag >计划编号</el-tag><el-tag type="info">{{scheItem.planSeq}}</el-tag></div>
                    <div class="infoDiv"><el-tag >结束日期</el-tag><el-tag type="info">{{scheItem.endDate}}</el-tag></div>
                </li>
            </ul>
            <div >
                <el-button type="info">报工列表</el-button>
            </div>
            <el-table :data="report" style="width: 100%">
                <el-table-column prop="reportSeq" label="报工序列" ></el-table-column>
                <el-table-column prop="precessNum" label="加工数量"></el-table-column>
                <el-table-column prop="passNum" label="合格数量"></el-table-column>
                <el-table-column prop="startDate" label="开始日期"></el-table-column>
                <el-table-column prop="endDate" label="结束日期"></el-table-column>
                <el-table-column prop="note" label="备注"></el-table-column>

            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ProductSchedule",
        data() {
            return {
                report:[
                    {
                        reportSeq:'r0001',
                        precessNum:0,
                        passNum:0,
                        startDate:'2019-5-6',
                        endDate:'2019-6-5',
                        nete:'',
                    },{
                        reportSeq:'r0001',
                        precessNum:0,
                        passNum:0,
                        startDate:'2019-5-6',
                        endDate:'2019-6-5',
                        nete:'',
                    },{
                        reportSeq:'r0001',
                        precessNum:0,
                        passNum:0,
                        startDate:'2019-5-6',
                        endDate:'2019-6-5',
                        nete:'',
                    }],
                outerVisible: false,
                scheItem:{},
                queryInfo: {
                    equipmentSeq: '',
                    scheduleStatus:10,
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
                        flag: 1,
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
            showTraceDetial(item){
                this.scheItem = item;
                console.log(this.scheItem);
                this.outerVisible = true;
            },
            handleCreateReport( item){
                this.scheItem = item;
                console.log(this.scheItem);
                this.outerVisible = true;
            },
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
            onQurey() {
                console.log('submit!'+this.queryInfo.scheduleStatus+this.queryInfo.equipmentSeq);
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
    .infoDiv{
        margin: 10px;
    }
    li{
        list-style-type: none;
        margin: 10px;
        float: left;
    }
</style>
<style scoped>

</style>
