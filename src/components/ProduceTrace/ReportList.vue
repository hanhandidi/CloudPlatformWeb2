<!--
TODO:创建报工时，调度号不能随意填写，需要从调度表中选取
TODO:然后根据调度号获取设备编号、设备序号、工厂编号
TODO:能编辑的字段只有加工数量和报工状态
-->
<template>
    <div style="margin: 20px;">
        <el-button type="info" style="margin: 10px;">工单信息</el-button>
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

        <div style="width: 100px; margin: 10px;">
            <el-button type="info">报工列表</el-button>
        </div>
        <el-table :data="report" style="width: 100%">
            <el-table-column prop="reportSeq" label="报工序列" ></el-table-column>
            <el-table-column prop="precessNum" label="加工数量"></el-table-column>
            <el-table-column prop="passNum" label="合格数量"></el-table-column>
            <el-table-column prop="startDate" label="开始日期"></el-table-column>
            <el-table-column prop="endDate" label="结束日期"></el-table-column>
            <el-table-column prop="note" label="备注"></el-table-column>
            <el-table-column label="操作" width="150px" >
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle  @click="handelEdit(scope.row)" ></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog  width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
            <el-form :model="reportItem"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="加工开始时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="reportItem.startDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="加工结束时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="reportItem.startDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="加工数量">
                    <el-input-number v-model="reportItem.workingCount" controls-position="right"  :min="0" ></el-input-number>
                </el-form-item>
                <el-form-item label="合格数量">
                    <el-input-number v-model="reportItem.qualifiedCount" controls-position="right"  :min="0" ></el-input-number>
                </el-form-item>
                <el-form-item label="不合格数量">
                    <el-input-number v-model="reportItem.unqualifiedCount" controls-position="right"  :min="0" ></el-input-number>
                </el-form-item>
                <!--还要完成Boolean到string的转换-->
                <el-form-item label="结束报工">
                    <el-switch v-model="reportItem.completeFlag" active-color="#13ce66" ></el-switch>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="reportItem.bak"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                reportItem: {
                    id:'',
                    flag:'',
                    createTime:'',
                    createUserid:'',
                    updateTime:'',
                    updateUserid:'',
                    scheduleId:'',
                    equipmentId:'',
                    equipmentSeq:'',
                    startTime:'',
                    endTime:'',
                    workingCount:'',
                    qualifiedCount:'',
                    unqualifiedCount:'',
                    completeFlag:true,
                    factoryId:'',
                    bak:'',
                },
                scheItem: {
                    scheduleSeq: 'W2019086989',
                    planSeq: 'P2019086989',
                    scheduleStatus: 20,
                    productName: '滤波电容器',
                    planCount: '25986',
                    equipmentSeq: 'DX3602',
                    startDate: '2019-07-30',
                    endDate: '2019-08-20',
                    flag: 0,
                    createTime: '2016-05-02',
                    createUserName: '周全',
                    updateTime: '2016-05-02',
                    updateUserName: '连文凯',
                },
                report: [
                    {
                        reportSeq: 'r0001',
                        precessNum: 0,
                        passNum: 0,
                        startDate: '2019-5-6',
                        endDate: '2019-6-5',
                        nete: '',
                    }, {
                        reportSeq: 'r0001',
                        precessNum: 0,
                        passNum: 0,
                        startDate: '2019-5-6',
                        endDate: '2019-6-5',
                        nete: '',
                    }, {
                        reportSeq: 'r0001',
                        precessNum: 0,
                        passNum: 0,
                        startDate: '2019-5-6',
                        endDate: '2019-6-5',
                        nete: '',
                    }],
                innerVisible: false,
            };
        },
        methods: {
            handelEdit(item) {
                this.reportItem = item;
                this.innerVisible = true;
            },
            onSubmit(){
                console.log(this.reportItem);
                this.innerVisible = false;
            }
        }
    }
</script>

<style scoped>
    .infoDiv{
        margin: 10px;
    }
    li{
        list-style-type: none;
        margin: 10px;
        margin-bottom: 20px;
        float: left;
    }
</style>